import fetch from "node-fetch";

export const get = async (size = 50, from = 0) => {
  const response = await fetch(
    process.env.ELASTIC_API_URL + `/popcorn/_search`,
    {
      method: "POST",
      body: JSON.stringify({
        query: {
          match_all: {}
        },
        size,
        from
      })
    }
  );
  return response.json();
};

export const getFiltred = async (size = 15, from = 0, filters) => {
  const response = await fetch(
    process.env.ELASTIC_API_URL + `/popcorn/_search`,
    {
      method: "POST",
      body: JSON.stringify({
        query: {
          bool: {
            filter: [
              filters.nameValue !== ""
                ? {
                    match_phrase_prefix: {
                      title: `${filters.nameValue}`
                    }
                  }
                : {},
              filters.descriptionValue !== ""
                ? {
                    match_phrase_prefix: {
                      overview: `${filters.descriptionValue}*`
                    }
                  }
                : {},
              {
                range: {
                  vote_average: {
                    gte: filters.ratingValues[0] ? filters.ratingValues[0] : 0,
                    lte: filters.ratingValues[1] ? filters.ratingValues[1] : 10
                  }
                }
              },
              {
                range: {
                  runtime: {
                    gte: filters.durationValues[0]
                      ? filters.durationValues[0]
                      : 0,
                    lte: filters.durationValues[1]
                      ? filters.durationValues[1]
                      : 600
                  }
                }
              },
              {
                range: {
                  release_date: {
                    gte: filters.yearValues.startDate,
                    lte: filters.yearValues.endDate
                  }
                }
              },
              filters.genresValues.length !== 0
                ? {
                    match: {
                      genres: filters.genresValues.join(", ")
                    }
                  }
                : {},
              filters.castValues !== ""
                ? {
                    query_string: {
                      query: `("${filters.castValues}")`,
                      fields: ["cast"]
                    }
                  }
                : {}
            ]
          }
        },
        sort: [
          {
            popularity: {
              order: "desc"
            }
          }
        ],
        size,
        from
      })
    }
  );
  return response.json();
};

export const getById = async (id: string) => {
  const response = await fetch(
    process.env.ELASTIC_API_URL + "/popcorn/_search",
    {
      method: "POST",
      body: JSON.stringify({
        query: {
          match: {
            id
          }
        }
      })
    }
  );
  return response.json();
};

export const getByTitle = async (title: string) => {
  const response = await fetch(
    process.env.ELASTIC_API_URL + "/popcorn/_search",
    {
      method: "POST",
      body: JSON.stringify({
        query: {
          match: {
            original_title: {
              query: `${title}`,
              "fuzziness": "auto",
            }
          }
        }
      })
    }
  );
  return response.json();
};

export const getByIdValues = async idValues => {
  const response = await fetch(
    process.env.ELASTIC_API_URL + `/popcorn/_search`,
    {
      method: "POST",
      body: JSON.stringify({
        query: {
          terms: {
            id: [...idValues]
          }
        },
        size: idValues.length
      })
    }
  );
  return response.json();
};

export const getPropertiesByMovieTitle = async (
  title: string,
  properties: string[]
) => {
  const response = await fetch(
    process.env.ELASTIC_API_URL + "/popcorn/_search",
    {
      method: "POST",
      body: JSON.stringify({
        _source: {
          includes: [...properties]
        },
        query: {
          match_phrase_prefix: {
            title
          }
        }
      })
    }
  );
  return response.json();
};

export const getPropertiesByMovieId = async (
  id: string,
  properties: string[]
) => {
  const response = await fetch(
    process.env.ELASTIC_API_URL + "/popcorn/_search",
    {
      method: "POST",
      body: JSON.stringify({
        _source: {
          includes: [...properties]
        },
        query: {
          match: {
            id
          }
        }
      })
    }
  );
  return response.json();
};

export const getPropertiesByIdValues = async (idValues, properties) => {
  const response = await fetch(
    process.env.ELASTIC_API_URL + `/popcorn/_search`,
    {
      method: "POST",
      body: JSON.stringify({
        _source: {
          includes: [...properties]
        },
        query: {
          terms: {
            id: [...idValues]
          }
        },
        size: idValues.length
      })
    }
  );
  return response.json();
};

// rating = "7"
export const getByGTRating = async (rating: string) => {
  const response = await fetch(
    process.env.ELASTIC_API_URL + `/popcorn/_search`,
    {
      method: "POST",
      body: JSON.stringify({
        query: {
          range: {
            vote_average: {
              gt: rating
            }
          }
        }
      })
    }
  );
  return response.json();
};

export const getByGTRatingAndGenre = async (rating: string, genres: string) => {
  if (!genres) {
    return getByGTRating(rating);
  }
  const response = await fetch(
    process.env.ELASTIC_API_URL + `/popcorn/_search`,
    {
      method: "POST",
      body: JSON.stringify({
        query: {
          bool: {
            must: [
              {
                range: {
                  vote_average: {
                    gt: rating
                  }
                }
              },
              {
                bool: {
                  must: [
                    {
                      match: {
                        genres
                      }
                    }
                  ]
                }
              }
            ]
          }
        }
      })
    }
  );
  return response.json();
};
