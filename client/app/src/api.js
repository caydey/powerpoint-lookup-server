import { API_HOST } from "@/config.js";
import axios from "axios";

export default {
  search: (query, category, callback) => {
    const json = { query: query, category: category };
    handleApiRequest("search", json, callback);
  },
  stats: (callback) => {
    handleApiRequest("stats", {}, callback);
  },
};

function handleApiRequest(apiFunction, json, callback) {
  axios
    .post(`${API_HOST}/${apiFunction}`, json)
    .then((res) => {
      // api wrong param error
      if (res.data.success === false)
        return callback(res.data.message || "api error");
      callback(undefined, res.data.data);
    })
    .catch((err) => {
      console.log(err);
      callback(err.message); // axios error message
    });
}
