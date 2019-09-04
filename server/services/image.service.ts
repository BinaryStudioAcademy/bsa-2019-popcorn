import axios from "axios";
import { imgurId } from "../config/imgur.config";

const uploadToImgur = async image => {
  try {
    const data = await axios.post(
      "https://api.imgur.com/3/upload",
      {
        image
      },
      {
        headers: { Authorization: `Client-ID ${imgurId}` }
      }
    );
    return data.data.data.link;
  } catch (e) {
    // parse Imgur error
    console.log(e.message, e);
    return Promise.reject(e);
  }
};

export const upload = async file => {
  return await uploadToImgur(file);
};
