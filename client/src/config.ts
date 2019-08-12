require('dotenv').config();
const config = {
API_URL: process.env.REACT_APP_API_URL || "http://localhost:5000",
  DEFAULT_AVATAR: "https://forwardsummit.ca/wp-content/uploads/2019/01/avatar-default.png"
}
export default config;
  