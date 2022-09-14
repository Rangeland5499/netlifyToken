import { useEffect, useState } from "react"

function App() {
	const [token, setToken] = useState(null)
	const [secretMessage, setSecretMessage] = useState("")

	useEffect(function() {
		fetch("/.netlify/functions/super-secret", {
			headers: {
				authorization: "Bearer " + token
			}
		})
			.then(res=>res.json())
			.then(data=>setSecretMessage(data.message))
	}, [token])

	async function submitHandler(event) {
		event.preventDefault()
		try {
			const response = await fetch("/.netlify/functions/auth", {
				method: "POST",
				body: JSON.stringify({
					email: event.target.email.value,
					password: event.target.password.value
				})
			})
			if (response.status === 201) {
				const data = await response.json()
				setToken(data.token)
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className="App">
			<form onSubmit={submitHandler}>
				<div>
					<label>
						Email:
						<input type="email" name="email" />
					</label>
				</div>
				<div>
					<label>
						Password:
						<input type="password" name="password" />
					</label>
				</div>
				<button type="submit">Log in</button>
			</form>
			<p>{token ? "Du er logget ind" : "Du er IKKE logget ind"}</p>
			<div>
				{secretMessage}
			</div>
		</div>
	);
}

export default App;
