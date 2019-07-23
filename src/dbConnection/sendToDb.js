import { PLUGIN_DIR } from "../../constants";
import axios from "axios";

export const sendTypes = (types, callback) => {
  axios.post(PLUGIN_DIR + "/sendTypesToDB.php", types).then(response => {
    callback(response);
  });
};
