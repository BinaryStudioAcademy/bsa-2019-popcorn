import {SeedUsers1565158741120} from './1565158741120-SeedUsers';
import {SeedPosts1565202279037} from './1565202279037-SeedPosts';
//to create new migration run in this folder: typeorm migration:create -n <name>
// then import this migration hear and export in array below

export default [SeedUsers1565158741120, SeedPosts1565202279037];