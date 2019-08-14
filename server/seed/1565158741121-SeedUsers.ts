import { getCustomRepository, MigrationInterface, QueryRunner } from "typeorm";
import UserRepository from "../repository/user.repository";
import { User } from "../models/UserModel";
const uuid = require("uuid/v4");

export class SeedUsers1565158741121 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const usersSeed = [
      {
        name: "admin",
        email: "test@gmail.com",
        password: "admin1",
        location: "Lebanon",
        aboutMe: "Work in Canopoly",
        avatar: ""
      },
      {
        name: "Shawn Leonard",
        email: "shawnleonard@comstar.com",
        password: "5d5440e1271362283b0bae72",
        location: "Spain",
        aboutMe: "Work in Phormula",
        avatar: ""
      },
      {
        name: "Peterson Hull",
        email: "petersonhull@phormula.com",
        password: "5d5440e187d0336c0de0c33b",
        location: "Guyana",
        aboutMe: "Work in Zosis",
        avatar: ""
      },
      {
        name: "Brittany Herring",
        email: "brittanyherring@zosis.com",
        password: "5d5440e1f5a75940f1a4a804",
        location: "Qatar",
        aboutMe: "Work in Comtract",
        avatar: ""
      },
      {
        name: "Ramos Fernandez",
        email: "ramosfernandez@comtract.com",
        password: "5d5440e13d63211446c43b29",
        location: "Israel",
        aboutMe: "Work in Remotion",
        avatar: ""
      },
      {
        name: "Marshall Solis",
        email: "marshallsolis@remotion.com",
        password: "5d5440e181a79e6ca28ca608",
        location: "Solomon Islands",
        aboutMe: "Work in Ecratic",
        avatar: ""
      },
      {
        name: "Christi Scott",
        email: "christiscott@ecratic.com",
        password: "5d5440e1fed85750693e7404",
        location: "Jordan",
        aboutMe: "Work in Rodeology",
        avatar: ""
      },
      {
        name: "Hubbard Sykes",
        email: "hubbardsykes@rodeology.com",
        password: "5d5440e1e48fee3713eb74ea",
        location: "Western Sahara",
        aboutMe: "Work in Acrodance",
        avatar: ""
      },
      {
        name: "Ola Hogan",
        email: "olahogan@acrodance.com",
        password: "5d5440e1e5e832aa4ec157d1",
        location: "Oman",
        aboutMe: "Work in Filodyne",
        avatar: ""
      },
      {
        name: "Scott Spence",
        email: "scottspence@filodyne.com",
        password: "5d5440e1f92bb734a62220aa",
        location: "Honduras",
        aboutMe: "Work in Zaj",
        avatar: ""
      },
      {
        name: "Hess Finch",
        email: "hessfinch@zaj.com",
        password: "5d5440e1e9aaf53ccb58523f",
        location: "Mexico",
        aboutMe: "Work in Zilch",
        avatar: ""
      }
    ];
    usersSeed.map(async userData => {
      const user = new User();
      user.name = userData.name;
      user.password = userData.password;
      user.email = userData.email;
      user.location = userData.location;
      user.aboutMe = userData.aboutMe;
      user.avatar = userData.avatar;
      await getCustomRepository(UserRepository).save(user);
    });
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
