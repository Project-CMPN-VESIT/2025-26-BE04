import jwt from "jsonwebtoken";

const generateToken = (user) => {
  return jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES || "30d",
  });
};

export default generateToken;
