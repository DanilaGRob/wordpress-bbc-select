import { PLUGIN_DIR } from "../../constants";
import axios from "axios";

export const sendTypes = (types, callback) => {
  axios
    .post(PLUGIN_DIR + "/sendToDB.php", { name: "types", data: types })
    .then(response => {
      callback(response);
    });
};
export const sendComps = (comps, callback) => {
  console.log(comps);
  axios
    .post(PLUGIN_DIR + "/sendToDB.php", { name: "comps", data: comps })
    .then(response => {
      callback(response);
    });
};
export const sendFood = (food, callback) => {
  axios
    .post(PLUGIN_DIR + "/sendToDB.php", { name: "food", data: food })
    .then(response => {
      callback(response);
    });
};
