import fetch from 'node-fetch';


export const getAll = async () => {
    const response = await fetch(process.env.ELASTIC_API_URL + "/popcorn/_search", {
        method: "POST",
        body: JSON.stringify({
            query: {
                match_all: {}
            }
        })
    });

    return response.json();
};


export const getByTitle = async () => {
    const response = await fetch(process.env.ELASTIC_API_URL + "/popcorn/_search", {
        method: "POST",
        body: JSON.stringify({
            "query": {
                "match": {
                    "original_title": "Big"
                }
            }
        })
    });
    return response.json();
};