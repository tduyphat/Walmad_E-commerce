interface User {
  createdAt: Date;
  updatedAt: Date;
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  addressLine1: string;
  addressLine2?: string;
  postCode: number;
  city: string;
  country: string;
}

export default User;