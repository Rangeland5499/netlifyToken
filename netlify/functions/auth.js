// auth.js
const jwt = require("jsonwebtoken")

exports.handler = async function(event, context) {
	if (event.httpMethod !== "POST") {
		return {
			statusCode: 405,
			body: ""
		}
	}

	const { email, password } = JSON.parse(event.body)

	if (email !== "jens@email.com" || password !== "1234") {
		return {
			statusCode: 403,
			body: ""
		}
	}

	const token = jwt.sign({ user: email }, process.env.TOKEN_SECRET)

	return {
		statusCode: 201,
		body: JSON.stringify({token: token})
	}
}
