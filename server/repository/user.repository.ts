import {EntityRepository, Repository} from "typeorm";
import {User} from "../entities/User";

@EntityRepository(User)
class UserRepository extends Repository<User> {

  async getUserById(id: string) {
    try {
      const user = await this.findOne({ where: { id } });
      return user;
    } catch(error) {
      console.log(error.message);
    }
  }

  async getUsers() {
    try {
      const users = await this.find();
      return users;
    } catch(error) {
      console.error(error.message);
    }
  }

  async updateById(id, data) {
    try {
      await this.update({ id }, data);
      return { success: true };
    } catch(error) {
      console.error(error.message);
    }
  }

  async deleteById(id) {
    try {
      await this.delete({ id });
      return { success: true };
    } catch(error) {
      console.error(error.message);
    }
  }
}


export default UserRepository;