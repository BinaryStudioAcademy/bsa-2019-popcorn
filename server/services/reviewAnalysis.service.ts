const Sentiment = require('sentiment');

export const getRatingByReview = (review: string, next): any => {
  const sentiment = new Sentiment();
  const { score, words } = sentiment.analyze(review);
  const result = score / words.length;
  return { result };
};