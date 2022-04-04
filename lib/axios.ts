import axios from "axios";

export const client = axios.create({
  baseURL: "https://next-rails-todo-backend.herokuapp.com",
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
});
