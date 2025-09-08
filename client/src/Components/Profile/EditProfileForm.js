import { useParams } from "react-router-dom";
import styled from "styled-components";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { UserContext } from "../UserContext";

import { useEffect, useState, useContext } from "react";

const ROOT_API = "/.netlify/functions/api";

const EditProfileForm = ({ open, handleClose, handleRefreshData }) => {
  const [user, setUser] = useState();
  const [nickname, setNickname] = useState("");
  const [name, setName] = useState("");

  const { profileId } = useParams();
  const { setShouldFetchUser } = useContext(UserContext);

  const fetchUser = async () => {
    try {
      const response = await fetch(`${ROOT_API}/user/${profileId}`);
      const data = await response.json();
      setUser(data.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      setNickname(user.nickname);
      setName(user.name);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedUser = {
      ...user,
      name,
      nickname,
    };

    try {
      const response = await fetch(`${ROOT_API}/user/${user._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        const data = await response.json();
        handleClose();
        handleRefreshData();
        setShouldFetchUser(true);
      } else {
        console.error("Error updating profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <WrapperDialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <FormGrid>
            <GridItem>
              <InputLabel>Nickname:</InputLabel>
              <Input
                type="text"
                id="nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </GridItem>
            <GridItem>
              <InputLabel>Name:</InputLabel>
              <Input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </GridItem>
          </FormGrid>
          <DialogActions>
            <CancelButton type="button" onClick={handleClose}>
              Cancel
            </CancelButton>
            <SubmitButton type="submit">Save Changes</SubmitButton>
          </DialogActions>
        </form>
      </DialogContent>
    </WrapperDialog>
  );
};

const WrapperDialog = styled(Dialog)`
  & .MuiPaper-root {
    background: var(--surface);
    color: var(--text);
    border: 1px solid var(--surface-border);
    border-radius: 16px;
    box-shadow: 0 10px 24px rgba(0,0,0,0.25);
  }
`;

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

const ButtonBase = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 16px;
  margin-top: 24px;
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

export default EditProfileForm;
