import Product from "./Product";

interface ProductDetailsCardProps {
  productDetails: Product;
  amount: number;
  setAmount: (amount: number) => void;
  handleAmountChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default ProductDetailsCardProps;