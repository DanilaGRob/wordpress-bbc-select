import { PLUGIN_DIR } from "../../constants";
import axios from "axios";

export const getTypes = callback => {
  axios
    .post(PLUGIN_DIR + "/getFromDB.php", { name: "types" })
    .then(({ data }) => {
      callback(data);
    });
};
export const getComps = callback => {
  axios
    .post(PLUGIN_DIR + "/getFromDB.php", { name: "comps" })
    .then(({ data }) => {
      callback(data);
    });
};
export const getFood = callback => {
  axios
    .post(PLUGIN_DIR + "/getFromDB.php", { name: "food" })
    .then(({ data }) => {
      callback(data);
    });
};
