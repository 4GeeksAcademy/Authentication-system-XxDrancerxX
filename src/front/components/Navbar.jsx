import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer()
	
	const handleLogout = () => {
		sessionStorage.removeItem("token"); // Remove the token from sessionStorage
		dispatch({ type: "updateToken", payload: null }); // Update the global state
	}


	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<div>
					{store.token !== null ? "You are logged in!" : "You are not logged in!"}
				</div>
                   <div>
					<button onClick={()=> handleLogout()} className="btn btn-danger">
						Loggout:
					</button>
				   </div>
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};