import UserRepository from "../repositories/user.repository";
import userUtilities from "../utils/user.utilities";

const getUser = async () => {
  const users = await UserRepository.getAllUsers();

  return userUtilities.getRandomUser(users);
};

export default {
  getUser,
};
