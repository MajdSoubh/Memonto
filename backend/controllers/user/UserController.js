import { User } from "../../models/User.js";

// Get a User
export const getUser = async (req, res) => {
  const id = req.params.id;

  const user = await User.findById(id).withoutPopulation();

  if (!user) {
    return res.status(404).json({ message: "This user doesn't exist" });
  }

  res.status(200).json(user);
};
