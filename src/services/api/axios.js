import axios from "axios";

export const Spinnaxios = axios.create({
  baseURL: "https://api.games.etvirtual.com/v1/game/current",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export const Kenoaxios = axios.create({
  baseURL: "https://api.games.etvirtual.com/v1/game/current",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

const token = localStorage.getItem("token");

export const Betaxios = axios.create({
  baseURL: "https://api.games.etvirtual.com/v1/bet/",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${token}`,
  },
});

const Authaxios = axios.create({
  baseURL: "https://api.games.etvirtual.com/v1/cashier/",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export default Authaxios;
