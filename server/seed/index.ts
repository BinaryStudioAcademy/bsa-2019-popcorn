import { SeedUsers1565158741121 } from "./1565158741121-SeedUsers";
import { SeedPosts1565202279038 } from "./1565202279038-SeedPosts";
import { SeedPostComments1565823065222 } from "./1565823065222-SeedPostComments";
import { SeedStory1565606634607 } from "./1565606634607-SeedStory";
import { SeedPostReaction1565847243749 } from "./1565847243749-SeedPostReaction";
import { SeedSurvey1566123343520 } from "./1566123343520-SeedSurvey";
import { SeedVoting1565848454004 } from "./1565848454004-SeedVoting";
import { SeedSurveyAnswers1565963322768 } from "./1565963322768-SeedSurveyAnswers";
import { SeedAdmin1566138938621 } from "./1566138938621-SeedAdmin";

export default [
  SeedUsers1565158741121,
  SeedPosts1565202279038,
  SeedStory1565606634607,
  SeedPostComments1565823065222,
  SeedPostReaction1565847243749,
  SeedVoting1565848454004,
  SeedSurveyAnswers1565963322768,
  SeedSurvey1566123343520,
  SeedAdmin1566138938621
];
//to create new migration run in this folder: typeorm migration:create -n <name>
// then import this migration hear and export in array below
