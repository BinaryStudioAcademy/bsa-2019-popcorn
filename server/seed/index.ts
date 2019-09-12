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
import { SeedReviews1566319951202 } from "./1566319951202-SeedReviews";
import { SeedTops1566549724762 } from "./1566549724762-SeedTops";
import { SeedFollowers1566665184861 } from "./1566665184861-SeedFollowers";
import { SeedReviewReaction1566744047867 } from "./1566744047867-SeedReviewReaction";
import { SeedFavoriteList1566841720412 } from "./1566841720412-SeedFavoriteList";
import { SeedChat1567284688344 } from "./1567284688344-SeedChat";
import { SeedMessage1567286972231 } from "./1567286972231-SeedMessage";
import { SeedMovieRate1567392463875 } from "./1567392463875-SeedMovieRate";
import { SeedMovieList1567632579430 } from "./1567632579430-SeedMovieList";
import { Fix1568132364606 } from "./1568132364606-Fix";
import { VotingReactions1568133381781 } from "./1568133381781-VotingReactions";

export default [
  SeedUsers1565158741121,
  SeedPosts1565202279038,
  SeedStory1565606634607,
  SeedPostComments1565823065222,
  // SeedPostReaction1565847243749,
  SeedVoting1565848454004,
  SeedSurvey1566123343520,
  SeedAdmin1566138938621,
  SeedEvents1566428038388,
  SeedSurveyAnswers1565963322768,
  SeedReviews1566319951202,
  SeedTops1566549724762,
  SeedFollowers1566665184861,
  SeedReviewReaction1566744047867,
  SeedFavoriteList1566841720412,
  SeedChat1567284688344,
  SeedMessage1567286972231,
  SeedMovieRate1567392463875,
  SeedMovieList1567632579430,
  Fix1568132364606,
  VotingReactions1568133381781
];
//to create new migration run in this folder: typeorm migration:create -n <name>
// then import this migration hear and export in array below
