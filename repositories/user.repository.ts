import dbConfig from "../config/db";
import { User } from "../entities/user";

const UserRepository = dbConfig.getRepository(User).extend({
  getAllUsers() {
    return this.createQueryBuilder(User.name).getMany();
  },
});

export default UserRepository;
