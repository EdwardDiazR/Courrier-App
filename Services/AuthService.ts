import axios from "axios";
import { Alert } from "react-native";

export const ValidateCedula = (cedula: string) => {
  interface ApiResponse {
    valid: boolean;
  }

  const API_URL = `https://api.digital.gob.do/v3/cedulas/40208945564/validate`;

  axios
    .get<ApiResponse>(API_URL)
    .then((response) => {
      console.log(response.data);
    })
    .catch((e) => Alert.alert(e));
};
