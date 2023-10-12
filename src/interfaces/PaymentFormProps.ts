import PaymentForm from "./PaymentFormInput";

interface PaymentFormProps {
  paymentForm: PaymentForm;
  handlePaymentFormChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default PaymentFormProps;