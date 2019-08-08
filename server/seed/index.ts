import {SeedUsers1565158741120} from './1565158741120-SeedUsers';
import { SeedMovies1565181039423 } from './1565181039423-SeedMovies';
//to create new migration run in this folder: typeorm migration:create -n <name>
// then import this migration hear and export in array below

export default [SeedUsers1565158741120, SeedMovies1565181039423];