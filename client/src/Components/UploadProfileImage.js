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
      setCurrentUser({ ...currentUser, image: reader.result });
    };
    reader.onerror = () => {
      console.error("AHHHHHHHH!!");
      setErrMsg("Something went wrong!");
    };
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
          onChange={(e) => {
            handleUploadProfileImage(e);
          }}
        />
      </div>
      {previewSource && (
        <img src={previewSource} alt="chosen" style={{ height: "150px" }} />
      )}
    </div>
  );
};

export default UploadProfileImage;
