import AddressFormInput from "./AddressFormInput";

interface AddressFormProps {
  addressForm: AddressFormInput;
  handleAddressFormChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default AddressFormProps;
