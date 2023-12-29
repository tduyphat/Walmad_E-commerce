interface UserRegisterInput {
  name: string;
  email: string;
  password: string;
  avatar: string;
  role: string;
  addressLine1: string;
  addressLine2?: string;
  postCode: number;
  city: string;
  country: string;
}

export default UserRegisterInput;
