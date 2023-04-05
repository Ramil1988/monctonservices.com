import { useState, useEffect } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

const Company = () => {
  const { companyId } = useParams();
  const [company, setCompany] = useState(null);
  const [open, setOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

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
      date: e.target.date.value,
      title: e.target.title.value,
      text: e.target.text.value,
      user: e.target.user.value,
      grade: parseInt(e.target.grade.value, 10),
    };

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
    return <div>Loading...</div>;
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
          {company.reviews.map((review) => (
            <Review key={review._id}>
              <Rating>{review.grade}</Rating>
              <Comment>{review.text}</Comment>
            </Review>
          ))}
        </Reviews>
      </Content>
      <Button onClick={() => setOpen(true)}>Add Review</Button>
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
                  label="User"
                  name="user"
                  type="text"
                  fullWidth
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

export default Company;
