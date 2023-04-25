import React, { useState } from "react";
import UploadNotification from "./UploadNotification";

const UploadImage = ({ newCompany, setNewCompany }) => {
  const [previewSource, setPreviewSource] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleUploadImage = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setNewCompany({ ...newCompany, image: reader.result });
    };
    reader.onerror = () => {
      console.error("AHHHHHHHH!!");
      setErrMsg("something went wrong!");
    };
  };

  return (
    <div>
      <h1 className="title">Upload an Image</h1>
      <UploadNotification msg={errMsg} type="danger" />
      <UploadNotification msg={successMsg} type="success" />
      <div className="form">
        <input
          id="fileInput"
          type="file"
          name="image"
          onChange={(e) => {
            handleUploadImage(e);
          }}
        />
      </div>
      {previewSource && (
        <img src={previewSource} alt="chosen" style={{ height: "300px" }} />
      )}
    </div>
  );
};

export default UploadImage;
