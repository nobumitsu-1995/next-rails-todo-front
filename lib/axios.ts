import axios from "axios";

export const client = axios.create({
  baseURL: "https://todo-next-rails-backend.herokuapp.com",
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
});
