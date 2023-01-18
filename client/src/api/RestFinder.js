import axios from "axios";
import { backendDEV } from "./fetchpaths.js";

export default axios.create({
  baseURL: backendDEV,
});
