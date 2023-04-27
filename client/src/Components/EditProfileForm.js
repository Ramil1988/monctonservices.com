import { useParams } from "react-router-dom";
import styled from "styled-components";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { UserContext } from "./UserContext";

import { useEffect, useState, useContext } from "react";

const EditProfileForm = ({ open, handleClose, handleRefreshData }) => {
  const [user, setUser] = useState();
  const [nickname, setNickname] = useState("");
  const [name, setName] = useState("");

  const { profileId } = useParams();
  const { refetchUser } = useContext(UserContext);

  const fetchUser = async () => {
    try {
      const response = await fetch(`/user/${profileId}`);
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
      const response = await fetch(`/user/${user._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.data);
        handleClose();
        handleRefreshData();
        refetchUser();
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
  width: 500px;
  margin: auto;
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
  width: 99%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 1rem;
`;

const ButtonBase = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  min-width: 64px;
  padding: 6px 12px;
  margin-top: 30px;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 500;
  font-size: 0.75rem;
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

export default EditProfileForm;
