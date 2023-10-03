import Button from "@mui/material/Button";
import styled from "styled-components";

import CartItem from "../interfaces/CartItem";
import useAppDispatch from "../hooks/useAppDispatch";
import {
  addOneToCart,
  removeOneFromCart,
} from "../redux/reducers/cartReducer";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: Arial, Helvetica, sans-serif;
  border-bottom: 1px solid lightblue;
  padding-bottom: 20px;

  div {
    flex: 1;
  }

  .information,
  .buttons {
    display: flex;
    justify-content: space-between;
  }

  img {
    max-width: 80px;
    object-fit: cover;
    margin-left: 40px;
  }
`;

const ItemInCart = (item: CartItem) => {
  const dispatch = useAppDispatch();

  return (
    <Wrapper>
      <div>
        <h3>{item.title}</h3>
        <div className="information">
          <p>Price: € {item.price}</p>
          <p>Total: € {item.quantity * item.price}</p>
        </div>
        <div className="buttons">
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => dispatch(removeOneFromCart(item.id))}
          >
            -
          </Button>
          <p>{item.quantity}</p>
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => dispatch(addOneToCart(item.id))}
          >
            +
          </Button>
        </div>
      </div>
      <img src={item.images[0]} alt={item.title} />
    </Wrapper>
  );
};

export default ItemInCart;
