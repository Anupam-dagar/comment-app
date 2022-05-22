import { User } from "../entities/user";
import common from "./common";

const getRandomUser = (users: User[]) => {
  const totalUsers = users.length;
  const randomUser = common.getRandomNumber(totalUsers - 1);

  return users[randomUser];
};

export default {
  getRandomUser,
};
