import React from "react";
import Carousel from "react-material-ui-carousel";

import useAppSelector from "../hooks/useAppSelector";
import CategorySlide from "../components/CategorySlide";

const Home = () => {
  const { categories, loading, error } = useAppSelector(
    (state) => state.categoriesReducer
  );

  return (
    <>
      {!categories && !error && loading && <p>Loading...</p>}
      {!categories && !loading && error && <p>Error happens!</p>}
      <Carousel>
        {!error &&
          !loading &&
          categories &&
          categories.map((category) => (
            <CategorySlide key={category.id} {...category} />
          ))}
      </Carousel>
    </>
  );
};

export default Home;
