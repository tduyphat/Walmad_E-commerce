import User from "../../interfaces/User";

export const usersData: User[] = [
  {
    name: "SuperAdmin",
    email: "superadmin@gmail.com",
    avatar: "https://picsum.photos/200",
    role: "Admin",
    addressLine1: "Olympiakatu 12",
    addressLine2: "C1",
    postCode: 65100,
    city: "Vaasa",
    country: "Finland",
    id: "347aa0ba-fafa-4d17-a167-c7bb71904bf5",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "maria",
    email: "maria@mail.com",
    avatar: "www.maria.com",
    role: "Customer",
    addressLine1: "palo 16",
    postCode: 65200,
    city: "Vaasa",
    country: "Finland",
    id: "2f382278-9892-4102-9cc9-0815752c84e5",
    createdAt: new Date(),
    updatedAt: new Date()
  }
];
