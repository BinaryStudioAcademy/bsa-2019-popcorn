import { EntityRepository, Repository } from "typeorm";
import { Settings } from "../entities/Settings";
import * as uuid from "uuid/v4";

@EntityRepository(Settings)
class SettingsRepository extends Repository<Settings> {
  async getByToken(token) {
    return this.findOne({ resetToken: token });
  }

  async createByPassword(password) {
    const settings = new Settings();
    settings.id = uuid();
    console.log("create set", settings.id);
    settings.password = password;
    return this.save(settings);
  }
}

export default SettingsRepository;
