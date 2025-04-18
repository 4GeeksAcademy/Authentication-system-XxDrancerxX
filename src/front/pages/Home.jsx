import React, { useEffect, useState } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router-dom";

export const Home = () => {
	const navigate = useNavigate()
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
				if (data.token_value) {
					console.log("Token from response:", data.token_value);
					sessionStorage.setItem("token", data.token_value); // Store the token in sessionStorage
					console.log("Token in sessionStorage after login:", sessionStorage.getItem("token"));
					dispatch({ type: "updateToken", payload: data.token_value });
					navigate("/demo"); // Redirect to the demo page
				} else {
					alert("Login failed: No token received.");
				}
			})
			.catch(error => console.error("Error:", error));
	};

	const signup = () => {
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

		fetch(import.meta.env.VITE_BACKEND_URL + "/signup", option)
			.then(response => response.json())
			.then(data => {
				alert(data.msg || "Signup successful")
				setEmail(""); // Clear the email field
				setPassword(""); // Clear the password field
			})
			.catch(error => console.error("Error:", error))
	}

	useEffect(() => {
		const savedToken = sessionStorage.getItem("token"); // Retrieve the token from sessionStorage
		console.log("Token in sessionStorage on load:", savedToken);
		if (savedToken && !store.token) {
			console.log("Restoring token from sessionStorage:", savedToken);
			dispatch({ type: "updateToken", payload: savedToken });
		}
	}, [store.token, dispatch]);

	return (
		// ==== the htmlFor attribute is used to associate the label with the input field. so when the user clicks on the label, the input field will be focused. ====//
		<div>
			<h1>Login</h1>
			<form>
				<div>
					<label htmlFor="email">Email:</label>
					<input onChange={(e) => setEmail(e.target.value)} value={email} type="text" id="email" placeholder="Enter your Email" />
					<label htmlFor="password">Password:</label>
					<input onChange={(e) => setPassword(e.target.value)} value={password} type="password" id="password" placeholder="Enter your Password" />
					<button type="button" onClick={() => login()}>Login</button>
					<button type="button" onClick={() => signup()}>Signup</button>


				</div>
			</form>
		</div>
	);
}; 