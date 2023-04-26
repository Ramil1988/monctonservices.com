import { useContext, useEffect, useState } from "react";
import UploadProfileImage from "./UploadProfileImage";
import { UserContext } from "./UserContext";

const EditProfileForm = () => {
  const { currentUser, setCurrentUser, setshouldFetchUser } =
    useContext(UserContext);
  const [nickname, setNickname] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (currentUser) {
      setNickname(currentUser.nickname);
      setName(currentUser.name);
    }
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedUser = {
      ...currentUser,
      name,
      nickname,
    };

    try {
      const response = await fetch(`/user/${currentUser._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        setshouldFetchUser(true);
        const data = await response.json();
        setCurrentUser(data.data);
        alert("Profile updated successfully");
      } else {
        console.error("Error updating profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label htmlFor="nickname">Nickname:</label>
        <input
          type="text"
          id="nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <br />
        <UploadProfileImage
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
        <br />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfileForm;
