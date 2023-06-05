import axios from "axios";

export default axios.create({
	baseURL: "https://bpla-finder-api.onrender.com/api",
	headers: {
		"Content-type": "application/json",
	},
});
