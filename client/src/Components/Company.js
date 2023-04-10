import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { UserContext } from "./UserContext";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Spinner from "./Spinner";

const Company = () => {
  const { companyId } = useParams();
  const [company, setCompany] = useState(null);
  const [open, setOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { currentUser, isAuthenticated } = useContext(UserContext);
  const { loginWithRedirect } = useAuth0();

  if (currentUser) {
    console.log(currentUser.sub);
  } else {
    console.log("User is not defined");
  }

  const handleLoginClick = () => {
    if (!isAuthenticated) {
      loginWithRedirect({
        appState: { returnTo: `/company/${companyId}` },
      });
    }
  };

  useEffect(() => {
    fetchCompanyById(companyId);
  }, [companyId, showConfirmation]);

  const fetchCompanyById = async (companyId) => {
    try {
      const response = await fetch(`/company/${companyId}`);
      const data = await response.json();
      setCompany(data.data);
    } catch (error) {
      console.error("Error fetching company:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewData = {
      userId: currentUser.sub, // Add user ID here
      date: e.target.date.value,
      title: e.target.title.value,
      text: e.target.text.value,
      grade: parseInt(e.target.grade.value, 10),
    };

    console.log("Review data:", reviewData); // Log the review data

    try {
      const response = await fetch(`/company/review/${companyId}`, {
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

  if (!company) {
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    );
  }

  if (showConfirmation) {
    return (
      <Wrapper>
        <Header>
          <Title>Review Submitted</Title>
        </Header>
        <Content>
          <p>
            Thank you for submitting your review! Your feedback is valuable to
            us.
          </p>
          <Button onClick={() => setShowConfirmation(false)}>Go Back</Button>
        </Content>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Header>
        <Title>{company.name}</Title>
      </Header>
      <Content>
        <Image src={company.image} alt={company.name} />
        <Address>{company.address}</Address>
        <Reviews>
          {company.reviews && company.reviews.length > 0 ? (
            company.reviews.map((review) => (
              <Review key={review._id}>
                <Rating>{review.grade}</Rating>
                <Comment>{review.title}</Comment>
              </Review>
            ))
          ) : (
            <p>No reviews found.</p>
          )}
        </Reviews>
      </Content>
      {isAuthenticated ? (
        <Button onClick={() => setOpen(true)}>Add Review</Button>
      ) : (
        <NavLinkStyled
          to={
            isAuthenticated
              ? `/Profile/${encodeURIComponent(currentUser.name)}`
              : null
          }
          onClick={handleLoginClick}
        >
          Add Review
        </NavLinkStyled>
      )}

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Review</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <StyledTextField
                  label="Date"
                  name="date"
                  type="date"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <StyledTextField
                  label="Title"
                  name="title"
                  type="text"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <StyledTextField
                  label="Text"
                  name="text"
                  type="text"
                  fullWidth
                  multiline
                  rows={4}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <StyledTextField
                  label="Grade"
                  name="grade"
                  type="number"
                  inputProps={{ min: 1, max: 5 }}
                  fullWidth
                  required
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button type="button" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </form>
      </Dialog>
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
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin: 0;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Image = styled.img`
  width: 100%;
  max-width: 500px;
  height: auto;
  margin-bottom: 20px;
`;

const Address = styled.p`
  font-size: 20px;
  margin-bottom: 20px;
`;

const Reviews = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Review = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const Rating = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-right: 10px;
`;

const Comment = styled.div`
  font-size: 20px;
`;

const StyledTextField = styled(TextField)`
  && {
    margin-bottom: 16px;
  }
`;

const NavLinkStyled = styled(NavLink)`
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  display: inline-block;
  padding: 6px 16px;
  min-width: 64px;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.75;
  text-transform: uppercase;
  background-color: #e0e0e0;

  &:hover {
    background-color: #d5d5d5;
  }
`;

export default Company;
