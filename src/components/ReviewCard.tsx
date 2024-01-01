import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Typography,
  Rating,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import Review from "../interfaces/Review";
import User from "../interfaces/User";

const formatDateTime = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  return `${formattedDay}.${formattedMonth}.${year}`;
};

interface ReviewCardProps {
  review: Review;
  currentUser?: User;
  handleMenuClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  open: boolean;
  anchorEl: null | HTMLElement;
  handleMenuClose: () => void;
  handleSwitchToEditMode: (review: Review) => void;
  deleteReview: (id: string) => void;
  editMode: boolean
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  currentUser,
  handleMenuClick,
  open,
  anchorEl,
  handleMenuClose,
  handleSwitchToEditMode,
  deleteReview,
  editMode
}) => {
  return (
    <Card key={review.id} sx={{ width: "60%", marginBottom: 2 }}>
      <CardContent>
        <CardHeader
          avatar={<Avatar alt={review.user.id} src={review.user.avatar} />}
          action={
            (currentUser?.role === "Admin" ||
              currentUser?.id === review.user.id) && (
              <>
                <IconButton
                  aria-label="settings"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleMenuClick}
                  disabled={editMode ? true : false}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleMenuClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={() => handleSwitchToEditMode(review)}>
                    Edit
                  </MenuItem>
                  <MenuItem onClick={() => deleteReview(review.id)}>
                    Delete
                  </MenuItem>
                </Menu>
              </>
            )
          }
          title={review.user.name}
          subheader={`Post dated: ${formatDateTime(
            new Date(review.createdAt.toString())
          )}`}
        />
        <Box sx={{ display: "flex" }}>
          <Typography variant="subtitle2">Rating: </Typography>
          <Rating
            name="read-only"
            value={review.rating}
            sx={{ ml: 1 }}
            readOnly
          />
        </Box>
        <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
          {review.content}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
