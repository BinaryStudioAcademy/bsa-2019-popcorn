import { EntityRepository, Repository } from "typeorm";
import { User } from "../entities/User";

@EntityRepository(User)
class UserRepository extends Repository<User> {
  async getUserById(id: string) {
    let data: { user?: User } = {};
    let error = "";
    let success = true;
    try {
      data.user = await this.findOne({ where: { id } });
      if (!data.user) throw new Error(`User with ${id} id is not found`);
    } catch (err) {
      error = err.message;
      success = false;
    }
    return { data, error, success };
  }

  async getUsers() {
    let data: { users?: User[] } = {};
    let error = "";
    let success = true;
    try {
      data.users = await this.find();
    } catch (err) {
      error = err.message;
      success = false;
    }
    return { data, error, success };
  }

  async updateById(id, newData) {
    let data: { user?: User } = {};
    let error = "";
    let success = true;
    try {
      await this.update({ id }, newData);
      data.user = await this.findOne({ where: { id } });
      if (!data.user) throw new Error(`User with ${id} id is not found`);
    } catch (err) {
      error = err.message;
      success = false;
    }
    return { data, error, success };
  }

  async deleteById(id) {
    let data = {};
    let error = "";
    let success = true;
    try {
      const user = await this.findOne({ where: { id } });
      if (!user) throw new Error(`User with ${id} id is not found`);
      await this.delete({ id });
    } catch (err) {
      error = err.message;
      success = false;
    }
    return { data, error, success };
  }

  async getByEmail(email) {
    return this.findOne({ email });
  }
}

export default UserRepository;
