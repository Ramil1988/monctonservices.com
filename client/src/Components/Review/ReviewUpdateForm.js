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
    if (e.target.name === "grade") {
      value = parseInt(value);
      if (value > 5) {
        value = 5;
      } else if (value < 0) {
        value = 0;
      }
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
                min="1"
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
  padding: 0.6rem 0.7rem;
  border: 1px solid var(--surface-border);
  border-radius: 12px;
  box-sizing: border-box;
  font-size: 1rem;
  background: var(--surface);
  color: var(--text);
  &:focus { outline: none; border-color: var(--primary-start); }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.6rem 0.7rem;
  border: 1px solid var(--surface-border);
  border-radius: 12px;
  resize: vertical;
  min-height: 8rem;
  box-sizing: border-box;
  font-size: 1rem;
  background: var(--surface);
  color: var(--text);
  &:focus { outline: none; border-color: var(--primary-start); }
`;

const ButtonBase = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 16px;
  font-weight: 700;
  font-size: 0.95rem;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.2s ease;
`;

const CancelButton = styled(ButtonBase)`
  background: linear-gradient(90deg, #ef4444, #f97316);
  color: var(--pill-text);
`;

const SubmitButton = styled(ButtonBase)`
  margin-left: 8px;
  background: linear-gradient(90deg, var(--primary-start), var(--primary-end));
  color: var(--pill-text);
`;

export default ReviewUpdateForm;
