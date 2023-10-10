import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Typography,
  IconButton,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { toast } from "react-toastify";

const ImageLinkGenerator: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imageLink, setImageLink] = useState<string | null>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);

      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await axios.post(
          "https://api.escuelajs.co/api/v1/files/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data.location) {
          setImageLink(response.data.location);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleRemoveImage = () => {
    setFile(null);
    setImageLink(null);
  };

  const handleCopyLink = () => {
    if (imageLink) {
      navigator.clipboard.writeText(imageLink)
        .then(() => {
          toast.info("Link copied to clipboard!")
        })
    }
  };

  return (
    <>
      <Typography variant="h6">Image URL Generator</Typography>
      {!file ? (
        <label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <Button variant="contained" component="span" size="small">
            Choose File
          </Button>
        </label>
      ) : (
        <div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography>{file.name}</Typography>
            <IconButton onClick={handleRemoveImage} color="error">
              <DeleteIcon />
            </IconButton>
          </div>
          {imageLink && (
            <>
              <Typography variant="subtitle1">Image URL:</Typography>
              <TextField
                variant="outlined"
                value={imageLink}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={handleCopyLink}>
                      <ContentCopyIcon />
                    </IconButton>
                  ),
                }}
              />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ImageLinkGenerator;
