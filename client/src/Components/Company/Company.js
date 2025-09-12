import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineLeft, AiOutlineRight, AiFillStar } from "react-icons/ai";
import { FiPhone, FiMapPin, FiExternalLink, FiNavigation, FiStar, FiHeart, FiEdit3 } from "react-icons/fi";
import { BsStar, BsStarHalf, BsStarFill } from "react-icons/bs";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { UserContext } from "../UserContext";
import Spinner from "../Helper/Spinner";
import { Link } from "react-router-dom";
import Maps from "./Maps";
import NotificationBox from "../Helper/NotificationBox";
import CopyButton from "./CoppyButton";
import { serviceTypes } from "../serviceTypes";
import { thingsToDo } from "../ThingsToDo";

const ROOT_API = "/.netlify/functions/api";

const Company = () => {
  const { companyId } = useParams();
  const [company, setCompany] = useState(null);
  const [open, setOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { currentUser } = useContext(UserContext);
  const [notification, setNotification] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const [recentReviews, setRecentReviews] = useState([]);
  const [dateError, setDateError] = useState(false);
  const [formValid, setFormValid] = useState(true);

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Show toast after redirect from creation
  useEffect(() => {
    if (location.state && location.state.toast) {
      setNotification(location.state.toast);
      setTimeout(() => setNotification(null), 3000);
    }
  }, [location.state]);

  const fetchCompanyById = async () => {
    try {
      const response = await fetch(`${ROOT_API}/company/${companyId}`);
      if (!response.ok) throw new Error("Failed to fetch company");
      const data = await response.json();
      setCompany(data.data);
    } catch (error) {
      console.error("Error fetching company:", error);
    }
  };

  let selectedServicetype = "";
  if (company && company.serviceType) {
    const serviceTypeLower = company.serviceType.toLowerCase();
    if (serviceTypes && serviceTypes[serviceTypeLower]) {
      selectedServicetype = serviceTypes[serviceTypeLower].name;
    } else if (thingsToDo && thingsToDo[serviceTypeLower]?.name) {
      selectedServicetype = thingsToDo[serviceTypeLower].name;
    } else {
      // Fallback: humanize raw serviceType
      const humanize = (raw) => {
        let s = String(raw || "").replace(/[_-]+/g, " ").trim();
        s = s.replace(/walk\s*in\s*clinics?/i, "Walk in Clinic");
        s = s.replace(/walkin\s*clinics?/i, "Walk in Clinic");
        s = s.replace(/([a-z])([A-Z])/g, "$1 $2");
        s = s.replace(/\s+/g, " ").trim();
        const lowerSmall = new Set(["and", "or", "the", "in", "of", "for", "to", "a", "an"]);
        const words = s.split(" ").map((w, i) => {
          const lw = w.toLowerCase();
          if (i !== 0 && lowerSmall.has(lw)) return lw;
          return lw.charAt(0).toUpperCase() + lw.slice(1);
        });
        return words.join(" ");
      };
      selectedServicetype = humanize(company.serviceType);
    }
  }

  useEffect(() => {
    if (company && Array.isArray(company.reviews)) {
      const sortedReviews = [...company.reviews].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setRecentReviews(sortedReviews.slice(0, 9));
    }
  }, [company]);

  useEffect(() => {
    fetchCompanyById();
  }, [companyId, showConfirmation]);

  const handleAddReviewClick = () => {
    if (currentUser) {
      setOpen(true);
    } else {
      setNotification("Please log in to leave a review");
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleNext = () => {
    if (startIndex < recentReviews.length - 3) {
      setStartIndex(startIndex + 3);
    }
  };

  const handlePrevious = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 3);
    }
  };

  const visibleReviews = recentReviews.slice(startIndex, startIndex + 3);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewDate = e.target.date.value;

    if (!validateDate(reviewDate)) {
      setDateError(true);
      setFormValid(false);
      return;
    }

    const reviewData = {
      userId: currentUser._id,
      userName: currentUser.nickname,
      company: company.name,
      date: reviewDate,
      title: e.target.title.value,
      text: e.target.text.value,
      grade: parseInt(e.target.grade.value, 10),
      comments: [],
    };

    try {
      const response = await fetch(`${ROOT_API}/company/review/${companyId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });

      if (response.ok) {
        const updatedCompany = await response.json();
        setCompany(updatedCompany);
        setOpen(false);
        setShowConfirmation(true);
      } else {
        console.error("Error submitting review");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const handleAddFavoriteClick = async () => {
    if (currentUser) {
      try {
        const response = await fetch(
          `${ROOT_API}/user/favorite/${currentUser._id}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: currentUser._id,
              companyId: companyId,
              companyName: company.name,
              serviceType: company.serviceType,
            }),
          }
        );

        if (response.ok) {
          setNotification("Company added to favorites");
        } else if (response.status === 409) {
          setNotification("The company is already in your favorites");
        }
      } catch (error) {
        console.error("Error adding favorite:", error);
      }
    } else {
      setNotification("Please log in to add a company to favorites");
    }
    setTimeout(() => setNotification(null), 3000);
  };

  if (!company) {
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    );
  }

  const averageGrade =
    company.reviews && company.reviews.length
      ? (
          company.reviews.reduce((sum, review) => sum + review.grade, 0) /
          company.reviews.length
        ).toFixed(1)
      : 0;

  const validateDate = (date) => {
    const currentDate = new Date();
    const inputDate = new Date(date);
    currentDate.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 0);

    return inputDate < currentDate;
  };

  const handleDateChange = (event) => {
    const isValidDate = validateDate(event.target.value);
    setDateError(!isValidDate);
    setFormValid(isValidDate);
  };

  const renderStars = (rating) => {
    if (rating === 0) {
      return "-";
    }

    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<BsStarFill key={i} />);
    }

    if (hasHalfStar) {
      stars.push(<BsStarHalf key={"half"} />);
    }

    while (stars.length < 5) {
      stars.push(<BsStar key={stars.length} />);
    }

    return stars;
  };

  const getPhoneLink = (phone) => {
    if (!phone) return null;
    const cleanPhone = phone.replace(/[^\d+]/g, '');
    return `tel:${cleanPhone}`;
  };

  const getDirectionsLink = (address) => {
    if (!address) return null;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  };

  const getWebsiteLink = (website) => {
    if (!website) return null;
    return website.startsWith('http') ? website : `https://${website}`;
  };

  if (showConfirmation) {
    return (
      <NotificationBox
        title="Review Submitted"
        message="Thank you for submitting your review!"
        buttonText="Continue"
        onButtonClick={() => setShowConfirmation(false)}
      />
    );
  }

  return (
    <ModernWrapper>
      <CompanyHeader>
        <CompanyHeaderContent>
          <CompanyTitle>{company.name}</CompanyTitle>
          <ServiceTypeBadge>{selectedServicetype || "–"}</ServiceTypeBadge>
          {company?.source && (
            <SourceBadge title={company.source === 'google' ? 'Imported via Google Maps API' : 'Added by user'}>
              {company.source === 'google' ? 'Google Maps' : 'Custom'}
            </SourceBadge>
          )}
        </CompanyHeaderContent>
        <ActionButtons>
          <ActionButton onClick={handleAddReviewClick}>
            <FiEdit3 size={16} />
            Add Review
          </ActionButton>
          <ActionButton onClick={handleAddFavoriteClick}>
            <FiHeart size={16} />
            Add to Favorites
          </ActionButton>
        </ActionButtons>
      </CompanyHeader>

      <CompanyContent>
        <CompanyImageSection>
          <CompanyImage src={company.image} alt={company.name} />
          <RatingCard>
            <RatingTitle>Customer Rating</RatingTitle>
            <RatingDisplay>
              <StarContainer>{renderStars(parseFloat(averageGrade))}</StarContainer>
              <RatingValue>{averageGrade > 0 ? averageGrade : 'No rating'}</RatingValue>
              <ReviewCount>
                {company.reviews?.length || 0} {company.reviews?.length === 1 ? 'review' : 'reviews'}
              </ReviewCount>
            </RatingDisplay>
          </RatingCard>
        </CompanyImageSection>

        <CompanyDetails>
          <ContactCard>
            <ContactHeader>
              <FiMapPin size={20} />
              <ContactTitle>Contact Information</ContactTitle>
            </ContactHeader>
            <ContactItem>
              <FiMapPin size={16} />
              <ContactInfo>{company.address}</ContactInfo>
              <CopyButton textToCopy={company.address} />
            </ContactItem>
            {company.phoneNumber && (
              <ContactItem>
                <FiPhone size={16} />
                <ContactInfo>{company.phoneNumber}</ContactInfo>
                <CopyButton textToCopy={company.phoneNumber} />
              </ContactItem>
            )}
            {company.website && (
              <ContactItem>
                <FiExternalLink size={16} />
                <ContactInfo>{company.website}</ContactInfo>
                <CopyButton textToCopy={company.website} />
              </ContactItem>
            )}
          </ContactCard>

          <QuickActions>
            {company.phoneNumber && (
              <QuickActionButton 
                as="a" 
                href={getPhoneLink(company.phoneNumber)}
                primary
              >
                <FiPhone size={18} />
                Call Now
              </QuickActionButton>
            )}
            <QuickActionButton 
              as="a" 
              href={getDirectionsLink(company.address)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiNavigation size={18} />
              Get Directions
            </QuickActionButton>
            {company.website && (
              <QuickActionButton 
                as="a" 
                href={getWebsiteLink(company.website)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiExternalLink size={18} />
                Visit Website
              </QuickActionButton>
            )}
          </QuickActions>

          <MapContainer>
            <Maps address={company.address} />
          </MapContainer>
        </CompanyDetails>
      </CompanyContent>
      <ReviewsSection>
        <ReviewsHeader>
          <ReviewsTitle>Customer Reviews</ReviewsTitle>
          {recentReviews.length > 3 && (
            <ReviewsNavigation>
              <NavButton
                disabled={startIndex === 0}
                onClick={handlePrevious}
              >
                <AiOutlineLeft />
              </NavButton>
              <NavButton
                disabled={startIndex >= recentReviews.length - 3}
                onClick={handleNext}
              >
                <AiOutlineRight />
              </NavButton>
            </ReviewsNavigation>
          )}
        </ReviewsHeader>
        
        {recentReviews.length > 0 ? (
          <ReviewsGrid>
            {visibleReviews.map((review) => (
              <ReviewCard key={review._id}>
                <ReviewCardLink to={`/review/${review._id}`}>
                  <ReviewCardHeader>
                    <ReviewRating>
                      <BsStarFill />
                      {review.grade}
                    </ReviewRating>
                    <ReviewDateBadge>{formatDate(review.date)}</ReviewDateBadge>
                  </ReviewCardHeader>
                  <ReviewCardTitle>{review.title}</ReviewCardTitle>
                  <ReviewCardAuthor>By {review.userName}</ReviewCardAuthor>
                </ReviewCardLink>
              </ReviewCard>
            ))}
          </ReviewsGrid>
        ) : (
          <EmptyReviews>
            <FiStar size={48} />
            <EmptyReviewsText>No reviews yet</EmptyReviewsText>
            <EmptyReviewsSubtext>Be the first to leave a review for this business</EmptyReviewsSubtext>
          </EmptyReviews>
        )}
      </ReviewsSection>
      <StyledDialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Review</DialogTitle>
        <form onSubmit={handleSubmit}>
          <StyledDialogContent>
            <FormWrapper>
              <FieldWrapper>
                <FieldTitle>Date</FieldTitle>
                <StyledTextField
                  name="date"
                  type="date"
                  fullWidth
                  required
                  error={dateError}
                  onChange={handleDateChange}
                />
                {!formValid && dateError && (
                  <Warning>The review date cannot be a future date.</Warning>
                )}
              </FieldWrapper>
              <FieldWrapper>
                <FieldTitle>Title</FieldTitle>
                <StyledTextField name="title" type="text" fullWidth required />
              </FieldWrapper>
              <FieldWrapper>
                <FieldTitle>Text</FieldTitle>
                <StyledTextArea
                  name="text"
                  fullWidth
                  multiline
                  rows={8}
                  required
                />
              </FieldWrapper>
              <FieldWrapper>
                <FieldTitle>Grade</FieldTitle>
                <StyledTextField
                  name="grade"
                  type="number"
                  min="1"
                  max="5"
                  fullWidth
                  required
                />
              </FieldWrapper>
            </FormWrapper>
          </StyledDialogContent>
          <DialogActions>
            <CancelButton
              type="button"
              onClick={() => {
                setOpen(false);
                setFormValid(true);
              }}
            >
              Cancel
            </CancelButton>
            <SubmitButton
              type="submit"
              variant="contained"
              color="primary"
              disabled={!formValid}
            >
              Submit
            </SubmitButton>
          </DialogActions>
        </form>
      </StyledDialog>
      {notification && (
        <Notification message={notification}>
          <NotificationText>{notification}</NotificationText>
          <CloseButton onClick={() => setNotification(null)}>
            <CloseIcon>X</CloseIcon>
          </CloseButton>
        </Notification>
      )}
    </Wrapper>
  );
};

const Warning = styled.p`
  color: red;
`;

// Modern Styled Components
const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const ModernWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  font-family: system-ui, -apple-system, sans-serif;
  background: var(--app-bg);
  color: var(--text);
`;

const CompanyHeader = styled.div`
  background: var(--surface);
  border: 1px solid var(--surface-border);
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const CompanyHeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const CompanyTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: var(--text);
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ServiceTypeBadge = styled.div`
  background: linear-gradient(90deg, var(--primary-start), var(--primary-end));
  color: var(--pill-text);
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.375rem 0.75rem;
  border-radius: 8px;
  width: fit-content;
`;

const SourceBadge = styled.div`
  background: var(--surface-border);
  color: var(--text-muted);
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  width: fit-content;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.75rem;
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: stretch;
  }
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(90deg, var(--primary-start), var(--primary-end));
  color: var(--pill-text);
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  }
  
  @media (max-width: 768px) {
    flex: 1;
    justify-content: center;
  }
`;

const CompanyContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const CompanyImageSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CompanyImage = styled.img`
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

const RatingCard = styled.div`
  background: var(--surface);
  border: 1px solid var(--surface-border);
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const RatingTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: var(--text);
  margin: 0 0 0.75rem 0;
`;

const RatingDisplay = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StarContainer = styled.div`
  display: flex;
  color: #fbbf24;
  gap: 2px;
`;

const RatingValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text);
`;

const ReviewCount = styled.div`
  font-size: 0.875rem;
  color: var(--text-muted);
`;

const CompanyDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ContactCard = styled.div`
  background: var(--surface);
  border: 1px solid var(--surface-border);
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const ContactHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  color: var(--text);
`;

const ContactTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  color: var(--text-muted);

  &:last-child {
    margin-bottom: 0;
  }
`;

const ContactInfo = styled.span`
  flex: 1;
  font-size: 0.875rem;
`;

const QuickActions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.75rem;
`;

const QuickActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: ${({ primary }) => 
    primary 
      ? 'linear-gradient(90deg, var(--primary-start), var(--primary-end))'
      : 'var(--surface)'
  };
  color: ${({ primary }) => primary ? 'var(--pill-text)' : 'var(--text)'};
  border: 1px solid var(--surface-border);
  border-radius: 8px;
  padding: 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    ${({ primary }) => 
      !primary && 'background: var(--primary-start); color: var(--pill-text); border-color: var(--primary-start);'
    }
  }
`;

const MapContainer = styled.div`
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

// Reviews Section
const ReviewsSection = styled.div`
  margin-top: 2rem;
`;

const ReviewsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ReviewsTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text);
  margin: 0;
`;

const ReviewsNavigation = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const NavButton = styled.button`
  background: var(--surface);
  border: 1px solid var(--surface-border);
  border-radius: 8px;
  padding: 0.5rem;
  cursor: pointer;
  color: var(--text);
  transition: all 0.2s ease;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};

  &:hover {
    background: var(--primary-start);
    color: var(--pill-text);
    border-color: var(--primary-start);
  }
`;

const ReviewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
`;

const ReviewCard = styled.div`
  background: var(--surface);
  border: 1px solid var(--surface-border);
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0,0,0,0.15);
  }
`;

const ReviewCardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
`;

const ReviewCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
`;

const ReviewRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #fbbf24;
  font-weight: 600;
`;

const ReviewDateBadge = styled.div`
  background: var(--surface-border);
  color: var(--text-muted);
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
`;

const ReviewCardTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: var(--text);
  margin: 0 0 0.5rem 0;
  line-height: 1.3;
`;

const ReviewCardAuthor = styled.p`
  font-size: 0.875rem;
  color: var(--text-muted);
  margin: 0;
`;

const EmptyReviews = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: var(--text-muted);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const EmptyReviewsText = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
`;

const EmptyReviewsSubtext = styled.p`
  font-size: 0.875rem;
  margin: 0;
`;

// Dialog Components
const StyledDialog = styled(Dialog)`
  margin: auto;
  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;

const DialogTitle = styled.h1`
  margin: 20px;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 80vw;
  margin: 10px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: calc(100% - 20px);
  }
`;

const StyledDialogContent = styled(DialogContent)`
  max-width: 100%;
  display: flex;
  justify-content: center;
  overflow-x: hidden;
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-right: 20px;
`;

const FieldTitle = styled.label`
  font-size: 16px;
  font-weight: bold;
`;

const StyledTextField = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid var(--surface-border);
  border-radius: 12px;
  outline: none;
  font-size: 16px;
  background: var(--surface);
  color: var(--text);
  &:focus { border-color: var(--primary-start); }
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid var(--surface-border);
  border-radius: 12px;
  outline: none;
  font-size: 16px;
  background: var(--surface);
  color: var(--text);
  resize: vertical;
  &:focus { border-color: var(--primary-start); }
`;

const CancelButton = styled.button`
  background: linear-gradient(90deg, #ef4444, #f97316);
  color: var(--pill-text);
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 20px;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(90deg, var(--primary-start), var(--primary-end));
  color: var(--pill-text);
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 20px;
  margin-right: 20px;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease;

  &:hover {
    transform: ${({ disabled }) => disabled ? 'none' : 'translateY(-2px)'};
    box-shadow: ${({ disabled }) => disabled ? 'none' : '0 8px 20px rgba(0,0,0,0.15)'};
  }
`;

const Notification = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 24px;
  padding: 12px 14px;
  background: var(--surface);
  border: 1px solid var(--surface-border);
  width: 320px;
  border-radius: 12px;
  color: var(--text);
  box-shadow: 0 10px 24px rgba(0,0,0,0.25);
`;

const NotificationText = styled.p`
  font-size: 0.95rem;
  margin: 0;
  color: var(--text);
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: var(--text);
  font-size: 1rem;
  outline: none;
  transition: transform 0.15s ease;

  &:hover { transform: translateY(-2px); }
`;

const CloseIcon = styled.span`
  font-weight: 800;
  font-size: 1rem;
  color: var(--text);
`;

export default Company;
// styled helpers injected above export if not already defined
const ServiceTypeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const SourcePill = styled.span`
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  color: var(--pill-text);
  background: linear-gradient(90deg, var(--primary-start), var(--primary-end));
`;
