import React from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import "./Footer.css";

function Footer() {
	return (
		<>
			<div className="d-flex flex-column h-100">
				<footer
					className="w-100 py-4 flex-shrink-0 mt-5"
					style={{ backgroundColor: "#F5CC75" }}>
					<div className="container py-4">
						<div className="row gy-4 gx-5">
							<div className="col-lg-4 col-md-6">
								<h5 className="h1 text-black">About Us</h5>
								<p className="small text-black">
									Whether you're looking for breaking news, in-depth analysis,
									or human-interest stories, you can rely on us to provide you
									with timely and reliable updates. Thank you for trusting us as
									your source for news.
								</p>
								<p className="small text-black mb-0">
									&copy; Copyrights. All rights reserved.{" "}
									<Link to="#" className="text-primary">
										NewsNow.com
									</Link>
								</p>
							</div>
							<div className="col-lg-2 col-md-6">
								<h5 className="text-black mb-3">Categories</h5>
								<ul className="list-unstyled text-black">
									<li>
										<Link to="/sports">Sports</Link>
									</li>
									<li>
										<Link to="/politics">Politics</Link>
									</li>
									<li>
										<Link to="/entertainment">Entertainment</Link>
									</li>
									<li>
										<Link to="/business">Business</Link>
									</li>
									<li>
										<Link to="/tech">Technology</Link>
									</li>
								</ul>
							</div>
							<div className="col-lg-2 col-md-6">
								<h5 className="text-black mb-3">Quick links</h5>
								<ul className="list-unstyled text-black">
									<li>
										<Link to="/">Home</Link>
									</li>
									<li>
										<Link to="#">About</Link>
									</li>
									<li>
										<Link to="#">Get started</Link>
									</li>
									<li>
										<Link to="#">FAQ</Link>
									</li>
								</ul>
							</div>
							<div className="col-lg-4 col-md-6">
								<h5 className="text-black mb-3">Newsletter</h5>
								<p className="small text-black">
									Enter Your Email address to sign up for our daily newsletter
									for free!
								</p>
								<form action="#">
									<div className="input-group mb-3 text-white">
										<input
											className="form-control text-white"
											type="email"
											placeholder="Recipient's username"
											aria-label="Recipient's username"
											aria-describedby="button-addon2"
										/>
										<button
											className="btn btn-primary text-white"
											id="button-addon2"
											type="button"
											data-bs-toggle="modal"
											data-bs-target="#exampleModal">
											Submit
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</footer>

				<div
					className="modal fade"
					id="exampleModal"
					tabIndex="-1"
					aria-labelledby="exampleModalLabel"
					aria-hidden="true">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h1 className="modal-title fs-5" id="exampleModalLabel">
									Your response has been recorded.
								</h1>
								<button
									type="button"
									className="btn-close"
									data-bs-dismiss="modal"
									aria-label="Close"></button>
							</div>
							<div className="modal-body">
								Daily newsletters will be sent to your mail.
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Footer;
