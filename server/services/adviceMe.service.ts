import { getByGTRating } from "../repository/movieElastic.repository";
import { getUniqRandomNumber } from "../helpers/random.helper";

const minimalRating = "5";
const amount = 3;

export const getAdviceMovie = async (userId: string) => {
  return getRandomMovie();
};

const getRandomMovie = async () => {
  const movies: any[] = (
    (await getByGTRating(minimalRating)).hits.hits || []
  ).map(movie => movie._source);

  const randomNumbers: number[] = getUniqRandomNumber(
    0,
    movies.length - 1,
    amount
  );

  return randomNumbers.map(randomIndex => movies[randomIndex]);
};
