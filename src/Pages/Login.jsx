import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";
import { Link } from "react-router-dom";
import Header from "../Components/Header";

const auth = getAuth(app);

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null); // State variable for error message

    const loginUser = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                // Redirect to the home page after successful login
                window.location.href = "/"; // Adjust the URL to your home page route
            })
            .catch((error) => {
                console.error("Login error:", error);
                // Set error message state
                setError("Invalid username or password.");
            });
    };

    return (
		<div>
		<Header/>
        <div className="login-page">
            <section className="vh-100">
                <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                    <div className="container h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                                <div className="card text-white" style={{ backgroundColor: "red" }}>
                                    <div className="card-body p-5">
                                        <h2 className="text-uppercase text-center mb-5">
                                            Login
                                        </h2>
                                        <form>
                                            <div className="form-outline mb-4">
                                                <input
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    value={email}
                                                    type="email"
                                                    id="form3Example3cg"
                                                    className="form-control form-control-lg bg-white"
                                                />
                                                <label className="form-label" htmlFor="form3Example3cg">
                                                    Your Email
                                                </label>
                                            </div>

                                            <div className="form-outline mb-4">
                                                <input
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    value={password}
                                                    type="password"
                                                    id="form3Example4cg"
                                                    className="form-control form-control-lg bg-white"
                                                />
                                                <label className="form-label" htmlFor="form3Example4cg">
                                                    Password
                                                </label>
                                            </div>
                                            <div className="d-flex justify-content-center">
                                                <button
                                                    type="button"
                                                    onClick={loginUser}
                                                    className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                                                >
                                                    Log me in
                                                </button>
                                            </div>
                                            {/* Display error message */}
                                            {error && <div className="alert alert-danger mt-3">{error}</div>}
                                            <p className="text-center text-muted mt-5 mb-0">
                                                New user?{" "}
                                                <Link to="/signup" className="btn-primary text-black m-0">
                                                    Signup
                                                </Link>
                                            </p>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
		</div>
    );
};

export default LoginPage;
