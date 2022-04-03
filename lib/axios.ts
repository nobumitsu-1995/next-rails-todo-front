import axios from "axios";

export const client = axios.create({
  baseURL: "https://cf32-2400-2411-8a64-5000-f59a-ddfa-e50-ca0a.ngrok.io",
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
});