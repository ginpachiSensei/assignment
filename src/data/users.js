import bcrypt from "bcryptjs";

const Users = [
  {
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    email: "satyam@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default Users;
