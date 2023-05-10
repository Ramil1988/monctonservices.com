import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { AiOutlineLeft, AiOutlineRight, AiFillStar } from "react-icons/ai";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { UserContext } from "../UserContext";
import Spinner from "../Helper/Spinner";
import { Link } from "react-router-dom";
import Maps from "./Maps";
import NotificationBox from "../Helper/NotificationBox";
import CopyButton from "./CoppyButton";

const ROOT_API = "https://monctonservices-com.onrender.com";

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

  const fetchCompanyById = async () => {
    try {
      const response = await fetch(`${ROOT_API}/company/${companyId}`);
      const data = await response.json();
      setCompany(data.data);
    } catch (error) {
      console.error("Error fetching company:", error);
    }
  };

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
    <Wrapper>
      <Header>
        <Title>{company.name}</Title>
        <ButtonContainer>
          <StyledButton onClick={handleAddReviewClick}>Add Review</StyledButton>
          <StyledButton onClick={handleAddFavoriteClick}>
            Add to Favorites
          </StyledButton>
        </ButtonContainer>
      </Header>
      <Content>
        <Image src={company.image} />
        <InfoBox>
          <InfoTitle>Service type</InfoTitle>
          <Address>{company.serviceType}</Address>
          <InfoTitle>Address</InfoTitle>
          <StyledWrapper>
            <Address>{company.address}</Address>
            <CopyButton textToCopy={company.address} />
          </StyledWrapper>
          <Maps address={company.address}></Maps>
          <InfoTitle>Phone Number</InfoTitle>
          <StyledWrapper>
            {" "}
            <PhoneNumber>{company.phoneNumber}</PhoneNumber>
            <CopyButton textToCopy={company.phoneNumber} />
          </StyledWrapper>
          {company.website && (
            <>
              <InfoTitle>Website</InfoTitle>
              <StyledWrapper>
                <PhoneNumber>{company.website}</PhoneNumber>
                <CopyButton textToCopy={company.website} />
              </StyledWrapper>
            </>
          )}
          <InfoTitle>Average Rating</InfoTitle>
          <AverageRating>
            {" "}
            <AverageGrade>
              <AiFillStar />
              {averageGrade}
            </AverageGrade>
          </AverageRating>
        </InfoBox>
      </Content>
      <BigText>Reviews left by customers</BigText>
      <ReviewsWrapper>
        {recentReviews.length > 0 ? (
          <>
            <ReviewNavigation
              disabled={startIndex === 0}
              onClick={handlePrevious}
            >
              <AiOutlineLeft />
            </ReviewNavigation>
            <ReviewsContainer>
              {visibleReviews.map((review) => (
                <Review key={review._id}>
                  <StyledLink to={`/review/${review._id}`}>
                    <ReviewTitle>{review.title}</ReviewTitle>
                    <ReviewAuthor>By {review.userName}</ReviewAuthor>
                    <ReviewDate>On {formatDate(review.date)}</ReviewDate>
                    <ReviewGrade>
                      <AiFillStar />
                      {review.grade}
                    </ReviewGrade>
                  </StyledLink>
                </Review>
              ))}
            </ReviewsContainer>
            <ReviewNavigation
              disabled={startIndex >= recentReviews.length - 3}
              onClick={handleNext}
            >
              <AiOutlineRight />
            </ReviewNavigation>
          </>
        ) : (
          <NoReviewsMessage>
            Nobody has left reviews about this company yet
          </NoReviewsMessage>
        )}
      </ReviewsWrapper>
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
            <CancelButton type="button" onClick={() => setOpen(false)}>
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

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 50px 120px 50px;

  @media (max-width: 768px) {
    margin: 20px 20px 120px 20px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 5px;
  background: linear-gradient(135deg, #003262, #005492);
  padding: 10px;
  border-radius: 5px 5px 0 0;

  @media (max-width: 767px) {
    font-size: 24px;
    width: 100%;
  }
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: #ffffff;

  @media (max-width: 767px) {
    font-size: 20px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 767px) {
    gap: 5px;
  }
`;

const StyledButton = styled.button`
  background-color: #ffc107;
  border: none;
  border-radius: 4px;
  color: #003262;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  padding: 8px 12px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ffb600;
  }

  @media (max-width: 767px) {
    font-size: 12px;
    padding: 6px 10px;
  }
`;

const Content = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  margin-top: 20px;
  gap: 20px;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Image = styled.img`
  max-width: 500px;
  max-height: 300px;
  width: auto;
  height: auto;
  border-radius: 5px;

  &:hover {
    transform: scale(1.15);
  }

  @media (max-width: 767px) {
    width: 100%;
    height: auto;

    &:hover {
      transform: none;
    }
  }
`;

const InfoBox = styled.div`
  background-color: #f8f9fa;
  width: 100%;
  border-radius: 5px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
`;

const InfoTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #003262;
`;

const Address = styled.p`
  font-size: 18px;
  font-weight: 500;
  margin: 5px 0px 20px;
`;

const PhoneNumber = styled.p`
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;

  @media (max-width: 767px) {
    max-width: 100%;
  }
`;

const AverageRating = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: #28a745;
`;

const AverageGrade = styled.span`
  display: flex;
  align-items: center;
  font-size: 20px;
  color: #333;
  margin-right: 5px;

  svg {
    color: gold;
    margin-right: 2px;
  }
`;

const BigText = styled.h2`
  margin: 40px;
  color: black;
  font-family: Aeroport, -apple-system, "system-ui", "Segoe UI", Roboto,
    Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  overflow: hidden;
  white-space: nowrap;
`;

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
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  font-size: 16px;

  &:focus {
    border-color: #007bff;
  }
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  font-size: 16px;
  resize: vertical;

  &:focus {
    border-color: #007bff;
  }
`;

const NoReviewsMessage = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin: 0;
`;

const ReviewsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 50px;
`;

const ReviewsContainer = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
  }
`;

const Review = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 30px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  width: calc(33.33% - 20px);

  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 250px;
    margin-bottom: 20px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  &:hover {
    cursor: pointer;
  }
`;

const ReviewTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ReviewAuthor = styled.p`
  font-size: 16px;
  margin-bottom: 5px;
`;

const ReviewDate = styled.div`
  font-size: 14px;
  text-align: right;
  color: #777;
  margin-top: 10px;
`;

const ReviewGrade = styled.div`
  display: flex;
  align-items: center;
  font-size: 30px;
  margin: 15px;

  svg {
    color: gold;
    margin-right: 2px;
  }
`;

const ReviewNavigation = styled.button`
  background-color: transparent;
  margin: 20px;
  border: none;
  font-size: 24px;
  cursor: pointer;
  transition: color 0.2s ease-in-out;
  color: ${(props) => (props.disabled ? "#ccc" : "inherit")};
  pointer-events: ${(props) => (props.disabled ? "none" : "inherit")};

  &:hover {
    color: ${(props) => (props.disabled ? "#ccc" : "#666")};
  }
`;

const CancelButton = styled(StyledButton)`
  margin-bottom: 20px;
  background-color: #dc3545;
  color: #fff;

  &:hover {
    background-color: #c82333;
  }
`;

const SubmitButton = styled(StyledButton)`
  margin-bottom: 20px;
  background-color: ${({ disabled }) => (disabled ? "gray" : "#28a745")};
  color: #fff;
  margin-right: 20px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  &:hover {
    background-color: ${({ disabled }) => (disabled ? "gray" : "#218838")};
  }
`;

const Notification = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  margin: auto;
  padding: 20px;
  background-color: ${({ message }) =>
    message === "The company is already in your favorites" ||
    message === "Please log in to add a company to favorites" ||
    message === "Please log in to leave a review"
      ? "yellow"
      : "lightgreen"};
  width: 300px;
  border-radius: 5px;
`;

const NotificationText = styled.p`
  font-size: 20px;
  margin: 0;
  color: black;
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: white;
  font-size: 20px;
  outline: none;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.1);
  }
`;

const CloseIcon = styled.span`
  font-weight: bold;
  font-size: 20px;
  color: black;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

export default Company;
