export const contentSearch = async ({
  title,
  type
}: {
  title: string;
  type: string;
}) => {
  switch (type) {
    case "all":
      return await contentAll(title);
    case "movie":
      return await contentMovie(title);
    case "top":
      return await contentTop(title);
    case "event":
      return await contentEvent(title);
    case "survey":
      return await contentSurvey(title);
    default:
      throw new Error("Bad request");
  }
};

const contentAll = async (title: string) => {};
const contentMovie = async (title: string) => {};
const contentTop = async (title: string) => {};
const contentEvent = async (title: string) => {};
const contentSurvey = async (title: string) => {};
