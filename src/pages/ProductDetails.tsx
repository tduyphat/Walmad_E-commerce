import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { Box, Typography } from "@mui/material";
import { toast } from "react-toastify";

import ProductDetailsCard from "../components/ProductDetailsCard";
import Product from "../interfaces/Product";
import CardsContainer from "../components/CardsContainer";
import ProductCard from "../components/ProductCard";
import useAppSelector from "../hooks/useAppSelector";
import ReviewForm from "../components/ReviewForm";
import Review from "../interfaces/Review";
import ReviewCard from "../components/ReviewCard";

const ProductDetails = () => {
  const { currentUser } = useAppSelector((state) => state.usersReducer);
  const [productDetails, setProductDetails] = useState<Product>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const { products } = useAppSelector((state) => state.productsReducer);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const [amount, setAmount] = useState(1);

  const [content, setContent] = useState("");
  const [rating, setRating] = useState<number | null>(3);

  const [editMode, setEditMode] = useState(false);
  const [updateReviewId, setUpdateReviewId] = useState("");

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Math.max(Number(event.target.value), 1));
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const handleSwitchToEditMode = (review: Review) => {
    handleMenuClose();
    setEditMode(true);
    setUpdateReviewId(review.id);
    setRating(review.rating);
    setContent(review.content);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setUpdateReviewId("");
    setRating(3);
    setContent("");
  };

  const handleSubmit = () => {
    editMode ? updateReview() : createReview();
    setUpdateReviewId("");
    setRating(3);
    setContent("");
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const result = await axios.get(
          `${process.env.REACT_APP_API_URL}api/v1/products/${id}`
        );
        setProductDetails(result.data);
        try {
          const commentResult = await axios.get(
            `${process.env.REACT_APP_API_URL}api/v1/reviews/product/${result.data.id}`
          );
          setReviews(commentResult.data);
        } catch (e) {
          const error = e as AxiosError;
          toast.error(error.message);
        }
      } catch (e) {
        const error = e as AxiosError;
        setError(error.message);
      }
      setLoading(false);
    };

    fetchProductDetails();
  }, [id]);

  const createReview = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const result = await axios.post(
        `${process.env.REACT_APP_API_URL}api/v1/reviews/`,
        {
          rating: rating,
          content: content,
          productID: productDetails?.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReviews([...reviews, result.data]);
      setRating(3);
      setContent("");
    } catch (e) {
      const error = e as AxiosError;
      toast.error(error.message);
    }
  };

  const deleteReview = async (id: string) => {
    try {
      const token = localStorage.getItem("access_token");
      const result = await axios.delete(
        `${process.env.REACT_APP_API_URL}api/v1/reviews/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (result.data === true) {
        setReviews(reviews.filter((review) => review.id !== id));
      } else {
        toast.error("Can't delete review");
      }
    } catch (e) {
      const error = e as AxiosError;
      toast.error(error.message);
    }
    handleMenuClose();
  };

  const updateReview = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const result = await axios.patch(
        `${process.env.REACT_APP_API_URL}api/v1/reviews/${updateReviewId}`,
        {
          rating: rating,
          content: content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedReviews = [...reviews];
      const foundIndex = reviews.findIndex(
        (review) => review.id === updateReviewId
      );

      if (foundIndex >= 0) {
        updatedReviews[foundIndex] = result.data;
        setReviews(updatedReviews);
      }
      handleCancelEdit();
    } catch (e) {
      const error = e as AxiosError;
      toast.error(error.message);
    }
  };

  return (
    <>
      {!productDetails && !error && loading && <p>Loading...</p>}
      {!productDetails && !loading && error && <p>Error happens!</p>}
      {!error && !loading && productDetails && (
        <>
          <ProductDetailsCard
            productDetails={productDetails}
            amount={amount}
            setAmount={setAmount}
            handleAmountChange={handleAmountChange}
          />
          <Typography
            variant="h4"
            color="primary"
            sx={{ marginTop: 10 }}
            gutterBottom
          >
            Review
          </Typography>
          <ReviewForm
            content={content}
            handleContentChange={handleContentChange}
            rating={rating}
            setRating={setRating}
            editMode={editMode}
            handleCancelEdit={handleCancelEdit}
            currentUser={currentUser}
            handleSubmit={handleSubmit}
          />
          <Box sx={{ marginTop: 2 }}>
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <ReviewCard
                  currentUser={currentUser}
                  review={review}
                  handleMenuClick={handleMenuClick}
                  open={open}
                  anchorEl={anchorEl}
                  handleMenuClose={handleMenuClose}
                  handleSwitchToEditMode={handleSwitchToEditMode}
                  deleteReview={deleteReview}
                  editMode={editMode}
                />
              ))
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="h4" color="primary">
                  No review for this product yet
                </Typography>
              </Box>
            )}
          </Box>
        </>
      )}
      <Typography
        variant="h4"
        color="primary"
        sx={{ marginTop: 10 }}
        gutterBottom
      >
        Similar Products
      </Typography>
      <CardsContainer>
        {products
          .filter(
            (product) => product.category.id === productDetails?.category.id
          )
          .slice(0, 4)
          .map((product: Product) => (
            <ProductCard key={product.id} {...product} />
          ))}
      </CardsContainer>
    </>
  );
};

export default ProductDetails;
