import axios from "axios";

const defaultAxios = axios.create({
    baseURL: 'http://localhost:8080'
});

export default defaultAxios;