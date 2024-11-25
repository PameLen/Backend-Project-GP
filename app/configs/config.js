import dotenv from "dotenv";

dotenv.config();

export default {
  PORT: process.env.PORT || 8080,
  // JWT_SECRET: "gabrielp2024",
  JWT_SECRET: process.env.JWT_SECRET,
};
