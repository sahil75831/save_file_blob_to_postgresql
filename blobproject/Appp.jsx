// kindly make a react app and run it on differebt port

import React, { useState } from "react";
import axios from "axios";
import "./Appp.module.scss";
const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const onChangeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onClickHandler = async () => {
    if (!selectedFile) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);

    reader.onload = async () => {
      const fileData = reader.result;
      console.log("file data --> ", fileData);

      try {
        const response = await fetch("http://localhost:3001/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fileData }),
        });

        if (!response.ok) {
          throw new Error("Failed to upload file");
        }

        const responseData = await response.json();
        console.log(responseData);
      } catch (error) {
        console.error("Error uploading file: ", error);
      }
    };
  };

  const getImage = async () => {
    try {
      const response = await fetch("http://localhost:3001/get-image/7", {
        method: "GET",
        headers: {
          Accept: "image/png",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      console.log("blob --> ", blob);
      console.log("url --> ", url);

      setImageUrl(url);
    } catch (error) {
      console.error("Error fetching image: ", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={onChangeHandler} />

      <button onClick={onClickHandler}>Upload</button>

      <button onClick={getImage}>Get Image</button>
      {imageUrl && <img src={imageUrl} alt="Fetched Image" />}
    </div>
  );
};

export default FileUpload;
