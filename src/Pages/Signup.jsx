import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";
import { Link } from "react-router-dom";
import Header from "../Components/Header";

const auth = getAuth();

const SignupPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");

	const createuser = () => {
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed up successfully
				const user = userCredential.user;
				alert("Registration successful!");
				// Store the user's name in the database
				const db = app.firestore();
				db.collection("users").doc(user.uid).set({
					name: name,
					email: email,
				})
				.catch((error) => {
					console.error("Error writing document: ", error);
				});
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				alert(errorMessage);
			});
	};

	return (
		<div>
			<Header/>
		<div className="signup-page">
			<section className="vh-100">
				<div className="mask d-flex align-items-center h-100 gradient-custom-3">
					<div className="container h-100">
						<div className="row d-flex justify-content-center align-items-center h-100">
							<div className="col-12 col-md-9 col-lg-7 col-xl-6">
								<div className="card text-white" style={{ backgroundColor: "red" }}>
									<div className="card-body p-5">
										<h2 className="text-uppercase text-center mb-5">
											Create an account
										</h2>

										<form>
											<div className="form-outline mb-4">
												<input
													onChange={(e) => setName(e.target.value)}
													value={name}
													type="text"
													id="name"
													className="form-control form-control-lg bg-white"
												/>
												<label className="form-label" htmlFor="name">
													Your Name
												</label>
											</div>

											<div className="form-outline mb-4">
												<input
													onChange={(e) => setEmail(e.target.value)}
													value={email}
													type="email"
													id="email"
													className="form-control form-control-lg bg-white"
												/>
												<label className="form-label" htmlFor="email">
													Your Email
												</label>
											</div>

											<div className="form-outline mb-4">
												<input
													onChange={(e) => setPassword(e.target.value)}
													value={password}
													type="password"
													id="password"
													className="form-control form-control-lg bg-white"
												/>
												<label className="form-label" htmlFor="password">
													Password
												</label>
											</div>

											<div className="form-check d-flex justify-content-center mb-5">
												<input
													className="form-check-input me-2"
													type="checkbox"
													value=""
													id="terms"
												/>
												<label className="form-check-label" htmlFor="terms">
													I agree all statements in{" "}
													<a href="#!" className="text-body">
														<u>Terms of service</u>
													</a>
												</label>
											</div>

											<div className="d-flex justify-content-center">
												<button
													type="button"
													onClick={createuser}
													className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
												>
													Register
												</button>
											</div>

											<p className="text-center text-muted mt-5 mb-0">
												Already have an account?{" "}
												<Link to="/login" className="btn-primary text-black m-0">
													Login
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

export default SignupPage;
