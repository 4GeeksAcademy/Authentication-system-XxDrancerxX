import React, { useEffect, useState } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";


export const Home = () => {

	const { store, dispatch } = useGlobalReducer()
	const [password, setPassword] = useState("")
	const [email, setEmail] = useState("")


	const loadMessage = async () => {
		try {
			const backendUrl = import.meta.env.VITE_BACKEND_URL

			if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

			const response = await fetch(backendUrl + "/api/hello")
			const data = await response.json()

			if (response.ok) dispatch({ type: "set_hello", payload: data.message })

			return data

		} catch (error) {
			if (error.message) throw new Error(
				`Could not fetch the message from the backend.
				Please check if the backend is running and the backend port is public.`
			);
		}

	}

	const login = () => {
		const option = {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: email,
				password: password
			})
		}

		fetch(import.meta.env.VITE_BACKEND_URL + "/login", option) 
			.then(response => response.json())
			.then(data => {
				dispatch({ type: "updateToken", payload: data.token_value }) //data is gonna be the full response from /login in our backend//data.token_value access the token from the response.
                                                                             //when we pass the payload to the dispatch function in store.js , we are updating the token in the store so in the Navbar we can see if the user is logged in or not.
			})
		// .catch(error => console.error("Error:", error))
	}

	useEffect(() => {
		loadMessage()
	}, [])

	return (
		// ==== the htmlFor attribute is used to associate the label with the input field. so when the user clicks on the label, the input field will be focused. ====//
		<div>
			<h1>Login</h1>
			<form>
				<div>
					<label htmlFor="email">Email:</label> 
					<input onChange={(e) => setEmail(e.target.value)} value={email} type="text" id="email" placeholder="Enter your Email" />
					<label htmlFor="password">Password:</label>
					<input onChange={(e) => setPassword(e.target.value)} value={password} type="text" id="password" placeholder="Enter your Password" />
					<button type="button" onClick={() => login()}>Login</button>
				</div>
			</form>
		</div>
	);
}; 