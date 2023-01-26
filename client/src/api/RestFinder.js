import axios from "axios";
import { backend } from "./fetchpaths.js";

export default axios.create({
  baseURL: backend,
});
