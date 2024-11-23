import axios from "axios";

const axiosApi = axios.create({
  baseURL:
    "https://aleksandra-server-default-rtdb.europe-west1.firebasedatabase.app/",
});

export default axiosApi;
