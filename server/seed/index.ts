import {SeedUsers1565158741121} from './1565158741121-SeedUsers';
import {SeedPosts1565202279037} from './1565202279037-SeedPosts';
import { SeedMovies1565181039423 } from './1565181039423-SeedMovies';
import {SeedStory1565606634607} from './1565606634607-SeedStory';


// export default [SeedUsers1565158741121, SeedPosts1565202279037, SeedMovies1565181039423];
export default [SeedUsers1565158741121, SeedPosts1565202279037, SeedStory1565606634607];
//to create new migration run in this folder: typeorm migration:create -n <name>
// then import this migration hear and export in array below