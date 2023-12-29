import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { Button, Typography, IconButton, TextField } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { toast } from "react-toastify";

const ImageLinkGenerator: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imageLink, setImageLink] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUploadImage = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const result = await axios.post(
          `https://api.escuelajs.co/api/v1/files/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (result.data.location) {
          setImageLink(result.data.location);
        }
      } catch (e) {
        const error = e as AxiosError;
        toast.error(error.message);
      }
    }
  };

  const handleRemoveImage = () => {
    setFile(null);
    setImageLink(null);
    setImagePreview(null);
  };

  const handleCopyLink = () => {
    if (imageLink) {
      navigator.clipboard.writeText(imageLink).then(() => {
        toast.info("Link copied to clipboard!");
      });
    }
  };

  return (
    <>
      <Typography variant="h6" color="primary">Image URL Generator</Typography>
      {!file ? (
        <>
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
        </>
      ) : (
        <div>
          <div style={{ display: "flex", alignItems: "center" }}>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="thumbnail preview"
                style={{ maxHeight: 100, maxWidth: 100, marginRight: 10 }}
              />
            )}
          </div>
          {imageLink ? (
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
          ) : (
            <>
              <Button
                variant="contained"
                onClick={handleUploadImage}
                size="small"
                sx={{ marginTop: 1 }}
              >
                Upload
              </Button>
              <Button
                onClick={handleRemoveImage}
                size="small"
                color="error"
                sx={{ marginTop: 1, marginLeft: 1 }}
              >
                Remove
              </Button>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ImageLinkGenerator;
