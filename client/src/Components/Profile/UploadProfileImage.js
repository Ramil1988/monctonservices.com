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
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
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
    </Dialog>
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

const ButtonBase = styled.button`
  font-size: 14px;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  margin: 20px 10px;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
`;

const CancelButton = styled(ButtonBase)`
  background-color: red;
  color: white;

  &:hover {
    background-color: #d32f2f;
  }
`;

const SubmitButton = styled(ButtonBase)`
  color: #fff;
  background-color: #3f51b5;

  &:hover {
    background-color: #283593;
  }

  &:active {
    box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0, 0.2),
      0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
  }
`;

export default UploadProfileImage;
