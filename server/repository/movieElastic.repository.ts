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

export const getById = async (id: string) => {
  const response = await fetch(
    process.env.ELASTIC_API_URL + "/popcorn/_search",
    {
      method: "POST",
      body: JSON.stringify({
        query: {
          match: {
            id: id
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
            original_title: `"${title}"`
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
  properties: Array<string>
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
  properties: Array<string>
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
