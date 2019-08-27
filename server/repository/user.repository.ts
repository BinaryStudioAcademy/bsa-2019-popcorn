import { EntityRepository, Repository, getCustomRepository } from "typeorm";
import { User } from "../entities/User";
import { getByIdValues } from "../repository/movieElastic.repository";
import FavoriteListRepository from "./favoriteList.repository";

@EntityRepository(User)
class UserRepository extends Repository<User> {
  async getUserById(id: string) {
    let data: { user?: User } = {};
    let error = "";
    let success = true;
    try {
      data.user = await this.findOne({
        where: { id },
        relations: ["favoriteLists"]
      });
      const movieIds = data.user.favoriteLists.map(movie => movie.movieId);
      const elasticResponse = await getByIdValues(movieIds);
      const movieArray = elasticResponse.hits.hits.map(movie => movie._source);
      data.user.favoriteLists.forEach((item: any) => {
        const movie = movieArray.find(
          movieItem => movieItem.id === item.movieId
        );
        item.movie = { id: movie.id, name: movie.title };
      });
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
      const { name, aboutMe, location, male, female } = newData;
      await this.update({ id }, { name, aboutMe, location, male, female });
      await getCustomRepository(
        FavoriteListRepository
      ).updateFavoriteMoviesByUserId(id, newData.favoriteMovieIds);
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

  async getByToken(token) {
    return this.findOne({ reset_token: token });
  }
}

export default UserRepository;
