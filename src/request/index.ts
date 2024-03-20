import axios from "axios";

const request = axios.create({
    baseURL: "http:/192.168.1.225:8080",
    timeout: 5000
});

const post = (url: string, params?: object) => {
    return request.post(url, params);
};

export default post;