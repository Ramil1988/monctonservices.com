import styled from "styled-components";
import UploadNotification from "../Helper/UploadNotification";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

import { useState } from "react";

const ROOT_API = "/.netlify/functions/api";

const UploadProfileImage = ({ user, setUser }) => {
  const [previewSource] = useState("");
  const [successMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [open, setOpen] = useState(true);
  const [targetImage, setTargetImage] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  const handleUploadProfileImage = (e) => {
    e.preventDefault();
    const response = fetch(`${ROOT_API}/user/${user._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: targetImage }),
    });
    if (response.ok) {
      const data = response.json();
    } else {
      console.error("Error updating profile");
    }
    handleClose();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setTargetImage(reader.result);
      setUser({ ...user, image: reader.result });
    };
    reader.onerror = () => {
      console.error("AHHHHHHHH!!");
      setErrMsg("Something went wrong!");
    };
  };

  return (
    <WrapperDialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Upload Profile Image</DialogTitle>
      <DialogContent>
        <UploadNotification msg={errMsg} type="danger" />
        <UploadNotification msg={successMsg} type="success" />
        <Form>
          <Input
            id="fileInput"
            type="file"
            name="image"
            onChange={(e) => {
              handleImageUpload(e);
            }}
          />
          {previewSource && (
            <>
              <ImagePreview src={previewSource} alt="chosen" />
            </>
          )}
        </Form>
      </DialogContent>
      <DialogActions>
        <CancelButton type="button" onClick={handleClose}>
          Cancel
        </CancelButton>
        <SubmitButton
          type="button"
          onClick={(e) => {
            handleUploadProfileImage(e);
          }}
        >
          Upload Image
        </SubmitButton>
      </DialogActions>
    </WrapperDialog>
  );
};

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  margin-bottom: 1rem;
`;

const ImagePreview = styled.img`
  height: 350px;
  width: auto;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 1rem;
`;

const WrapperDialog = styled(Dialog)`
  & .MuiPaper-root {
    background: var(--surface);
    color: var(--text);
    border: 1px solid var(--surface-border);
    border-radius: 16px;
    box-shadow: 0 10px 24px rgba(0,0,0,0.25);
  }
`;

const ButtonBase = styled.button`
  font-size: 0.95rem;
  font-weight: 700;
  padding: 10px 16px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  margin: 20px 10px;
  transition: transform 0.15s ease, box-shadow 0.2s ease;
`;

const CancelButton = styled(ButtonBase)`
  background: linear-gradient(90deg, #ef4444, #f97316);
  color: var(--pill-text);
`;

const SubmitButton = styled(ButtonBase)`
  background: linear-gradient(90deg, var(--primary-start), var(--primary-end));
  color: var(--pill-text);
`;

export default UploadProfileImage;
