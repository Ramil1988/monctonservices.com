import { useState } from "react";
import styled from "styled-components";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

const ReviewUpdateForm = ({
  review,
  handleUpdateSubmit,
  open,
  handleClose,
}) => {
  const [updatedData, setUpdatedData] = useState({
    title: review.title,
    text: review.text,
    grade: review.grade,
  });

  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === "grade" && parseInt(value) > 5) {
      value = "5";
    }
    setUpdatedData({
      ...updatedData,
      [e.target.name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleUpdateSubmit(updatedData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Update Review</DialogTitle>
      <DialogContent>
        <form onSubmit={onSubmit}>
          <FormGrid>
            <GridItem>
              <InputLabel>Title</InputLabel>
              <Input
                name="title"
                type="text"
                value={updatedData.title}
                onChange={handleChange}
              />
            </GridItem>
            <GridItem>
              <InputLabel>Text</InputLabel>
              <TextArea
                name="text"
                value={updatedData.text}
                onChange={handleChange}
              />
            </GridItem>
            <GridItem>
              <InputLabel>Grade</InputLabel>
              <Input
                name="grade"
                type="number"
                min="0"
                max="5"
                value={updatedData.grade}
                onChange={handleChange}
              />
            </GridItem>
          </FormGrid>
          <DialogActions>
            <CancelButton type="button" onClick={handleClose}>
              Cancel
            </CancelButton>
            <SubmitButton type="submit">Submit</SubmitButton>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
`;

const GridItem = styled.div`
  width: 100%;
`;

const InputLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  min-height: 8rem;
  box-sizing: border-box;
`;

const ButtonBase = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  min-width: 64px;
  padding: 6px 16px;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  min-height: 36px;
  line-height: 1.75;
  border-radius: 4px;
  letter-spacing: 0.02857em;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.87);
  background-color: #e0e0e0;
  cursor: pointer;
  outline: none;
  border: none;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

  &:hover {
    background-color: #d5d5d5;
  }

  &:active {
    box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
      0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
  }
`;

const CancelButton = styled(ButtonBase)`
  background-color: red;
  color: white;
`;

const SubmitButton = styled(ButtonBase)`
  margin-left: 8px;
  color: #fff;
  background-color: #3f51b5;

  &:active {
    box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),
      0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
  }
`;

export default ReviewUpdateForm;
