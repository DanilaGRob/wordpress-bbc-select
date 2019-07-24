import { PLUGIN_DIR } from "../../constants";
import axios from "axios";

export const getTypes = callback => {
  axios.post(PLUGIN_DIR + "/getTypesFromDB.php", {}).then(({ data }) => {
    callback(data);
  });
};
export const getComps = callback => {
  axios.post(PLUGIN_DIR + "/getCompsFromDB.php", {}).then(({ data }) => {
    callback(data);
  });
};
