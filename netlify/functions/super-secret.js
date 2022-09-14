// super-secret.js
const jwt = require("jsonwebtoken")

exports.handler = async function(event, context) {
	if (event.httpMethod !== "GET") {
		return {
			statusCode: 405,
			body: ""
		}
	}

	if (!event.headers.authorization
		|| !event.headers.authorization.includes("Bearer ")) {
			return {
				statusCode: 401,
				body: ""
			}
		}

	const token = event.headers.authorization.split("Bearer ")[1]

	if (!jwt.verify(token, process.env.TOKEN_SECRET)) {
		return {
			statusCode: 403,
			body: ""
		}
	}

	return {
		statusCode: 200,
		body: JSON.stringify({message: "Hello, World!"})
	}
}