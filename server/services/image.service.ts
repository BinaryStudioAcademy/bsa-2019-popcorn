import fetch from "node-fetch";
import { imgurId } from "../config/imgur.config";

const uploadToImgur = async image => {
  try {
    const data = await (await fetch("https://api.imgur.com/3/upload", {
      body: image,
      headers: { Authorization: `Client-ID ${imgurId}` },
      method: "POST"
    })).json();
    return data.data.link;
  } catch (e) {
    throw e;
  }
};

export const upload = async file => {
  return await uploadToImgur(file);
};
