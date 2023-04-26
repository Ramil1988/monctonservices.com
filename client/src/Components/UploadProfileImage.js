import React, { useState, useEffect } from "react";
import UploadNotification from "./UploadNotification";

const UploadProfileImage = ({ currentUser, setCurrentUser }) => {
  const [previewSource, setPreviewSource] = useState(currentUser.image);
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleUploadProfileImage = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
      uploadImage(reader.result);
    };
    reader.onerror = () => {
      console.error("AHHHHHHHH!!");
      setErrMsg("something went wrong!");
    };
  };

  console.log(currentUser);

  const uploadImage = async (base64EncodedImage) => {
    try {
      const response = await fetch(`/user/${currentUser._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...currentUser, image: base64EncodedImage }),
      });

      if (response.ok) {
        const data = await response.json();
        setCurrentUser(data.data);
        setSuccessMsg("Profile image uploaded successfully");
      } else {
        console.error("Error uploading profile image");
        setErrMsg("Error uploading profile image");
      }
    } catch (error) {
      console.error("Error uploading profile image:", error);
      setErrMsg("Error uploading profile image");
    }
  };

  useEffect(() => {
    setPreviewSource(currentUser.image);
  }, [currentUser.image]);

  return (
    <div>
      <h1 className="title">Upload Profile Image</h1>
      <UploadNotification msg={errMsg} type="danger" />
      <UploadNotification msg={successMsg} type="success" />
      <div className="form">
        <input
          id="fileInput"
          type="file"
          name="image"
          onChange={handleUploadProfileImage}
        />
      </div>
      {previewSource && (
        <img src={previewSource} alt="chosen" style={{ height: "150px" }} />
      )}
    </div>
  );
};

export default UploadProfileImage;
