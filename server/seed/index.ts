import { SeedUsers1565158741121 } from "./1565158741121-SeedUsers";
import { SeedPosts1565202279038 } from "./1565202279038-SeedPosts";
import { SeedMovies1565181039423 } from "./1565181039423-SeedMovies";
import { SeedStory1565606634607 } from "./1565606634607-SeedStory";
import { SeedSurveys1565789734851 } from './1565789734851-SeedSurveys';

// export default [SeedUsers1565158741121, SeedPosts1565202279037, SeedMovies1565181039423];
export default [
  SeedUsers1565158741121,
  SeedPosts1565202279038,
  SeedStory1565606634607,
  SeedSurveys1565789734851
];
//to create new migration run in this folder: typeorm migration:create -n <name>
// then import this migration hear and export in array below
