import { TextField, Rating, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

import User from "../interfaces/User";

interface ReviewFormProps {
  content: string;
  handleContentChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rating: number | null;
  setRating: React.Dispatch<React.SetStateAction<number | null>>;
  editMode: boolean;
  handleCancelEdit: () => void;
  currentUser?: User;
  handleSubmit: () => void;
}

const ReviewForm : React.FC<ReviewFormProps> = ({
  content,
  handleContentChange,
  rating,
  setRating,
  editMode,
  handleCancelEdit,
  currentUser,
  handleSubmit,
}) => {
  const navigate = useNavigate();
  return (
    <TextField
      id="content"
      name="content"
      sx={{ width: 450, position: "relative" }}
      multiline
      rows={6}
      variant="filled"
      value={content}
      onChange={handleContentChange}
      placeholder="Write your review..."
      InputProps={{
        endAdornment: (
          <div
            style={{
              position: "absolute",
              bottom: "0",
              right: "0",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Rating
              size="large"
              name="simple-controlled"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
            {editMode && (
              <Button onClick={handleCancelEdit} variant="contained">
                Cancel
              </Button>
            )}
            <Button
              variant="contained"
              style={{ marginLeft: "10px" }}
              disabled={content === "" ? true : false}
              onClick={() => {
                currentUser?.role === "Customer"
                  ? handleSubmit()
                  : navigate("/login");
              }}
            >
              {editMode ? "Edit" : "Submit"}
            </Button>
          </div>
        ),
      }}
    />
  );
};

export default ReviewForm;
