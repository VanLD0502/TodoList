import axios from "axios";

BASE_URL =
	import.meta.env.MODE === "development"
		? "http://localhost:5002/api"
		: "/api";
const api = axios.create({
	baseURL: BASE_URL,
});
export default api;
