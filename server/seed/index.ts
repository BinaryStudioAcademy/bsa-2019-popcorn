import { SeedUsers1565158741121 } from "./1565158741121-SeedUsers";
import { SeedPosts1565202279038 } from "./1565202279038-SeedPosts";
import { SeedPostComments1565823065222 } from "./1565823065222-SeedPostComments";
import { SeedStory1565606634607 } from "./1565606634607-SeedStory";
import { SeedPostReaction1565847243749 } from "./1565847243749-SeedPostReaction";
import { SeedSurvey1566123343520 } from "./1566123343520-SeedSurvey";
import { SeedVoting1565848454004 } from "./1565848454004-SeedVoting";
import { SeedSurveyAnswers1565963322768 } from "./1565963322768-SeedSurveyAnswers";
import { SeedAdmin1566138938621 } from "./1566138938621-SeedAdmin";
import { SeedEvents1566428038388 } from "./1566428038388-SeedEvents";
import { SeedTops1566326006466 } from "./1566326006466-SeedTops";
import { SeedMovieInTop1566326020135 } from "./1566326020135-SeedMovieInTop";
import { SeedReviews1566319951202 } from "./1566319951202-SeedReviews";
import { SeedTops1566549724762 } from "./1566549724762-SeedTops";
import { SeedReviewDEMO21566559150315 } from "./1566559150315-SeedReviewDEMO2";
import { SeedFollowers1566665184861 } from "./1566665184861-SeedFollowers";

export default [
  SeedUsers1565158741121,
  SeedPosts1565202279038,
  SeedStory1565606634607,
  SeedPostComments1565823065222,
  // SeedPostReaction1565847243749,
  SeedVoting1565848454004,
  SeedSurveyAnswers1565963322768,
  SeedSurvey1566123343520,
  SeedAdmin1566138938621,
  SeedEvents1566428038388,
  // SeedTops1566326006466,
  // SeedMovieInTop1566326020135,
  // SeedReviews1566319951202,
  SeedTops1566549724762,
  SeedReviewDEMO21566559150315,
  SeedFollowers1566665184861
];
//to create new migration run in this folder: typeorm migration:create -n <name>
// then import this migration hear and export in array below
