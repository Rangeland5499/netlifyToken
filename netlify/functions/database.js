exports.handler = async function(event, context) {
	if (event.httpMethod === "POST") {
		console.log(event.body)
		return {
			statusCode: 201,
			body: JSON.stringify({message: ""})
		}
	} else {
		return {
			statusCode: 405,
			body: JSON.stringify({message: "Method not allowed"})
		}
	}
}