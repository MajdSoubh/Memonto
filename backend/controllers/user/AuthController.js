import { User } from "../../models/User.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  const { email, password, ...others } = req.body;

  // Check if this email existed before.
  let user = await User.findOne({ email }).withoutPopulation();

  if (user) {
    return res.status(400).json({ message: "This email is already used" });
  }

  // Create the user
  const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));
  user = new User({ email, password: hashedPassword, ...others });

  // Store the user avatar
  if (req?.file && req.file.length > 0) {
    user.avatar = file.filename;
  }

  user = await user.save();

  // Generate auth token
  const token = user.generateAuthToken();

  // Set user active
  user.active = true;

  // Send respone
  res.header("authorization", token).status(201).json(user);
};
