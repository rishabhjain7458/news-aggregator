import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { app } from "../firebase";
import "./Footer.css";

const firestore = getFirestore(app);

function Footer() {
    const [email, setEmail] = useState("");
    const [newsletterSuccess, setNewsletterSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const docRef = await addDoc(collection(firestore, "newsletter"), {
                email: email,
            });
            console.log("Document written with ID: ", docRef.id);

            setNewsletterSuccess(true);
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    return (
        <>
            <footer className="w-100 py-4 flex-shrink-0 mt-5" style={{ backgroundColor: "#F5CC75" }}>
                <div className="container py-4">
                    <div className="row gy-4 gx-5">
                        <div className="col-lg-4 col-md-6">
                            <h5 className="h1 text-black">About Us</h5>
                            <p className="small text-black">
                                Whether you're looking for breaking news, in-depth analysis, or human-interest stories, you can rely on us to provide you with timely and reliable updates. Thank you for trusting us as your source for news.
                            </p>
                            <p className="small text-black mb-0">&copy; Copyrights. All rights reserved. <a href="#" className="text-primary">NewsNow.com</a></p>
                        </div>
                        <div className="col-lg-2 col-md-6">
                            <h5 className="text-black mb-3">Categories</h5>
                            <ul className="list-unstyled text-black">
                                <li><a href="/sports">Sports</a></li>
                                <li><a href="/politics">Politics</a></li>
                                <li><a href="/entertainment">Entertainment</a></li>
                                <li><a href="/business">Business</a></li>
                                <li><a href="/tech">Technology</a></li>
                            </ul>
                        </div>
                        <div className="col-lg-2 col-md-6">
                            <h5 className="text-black mb-3">Quick links</h5>
                            <ul className="list-unstyled text-black">
                                <li><a href="/">Home</a></li>
                                <li><a href="#">About</a></li>
                                <li><a href="#">Get started</a></li>
                                <li><a href="#">FAQ</a></li>
                            </ul>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <h5 className="text-black mb-3">Newsletter</h5>
                            <p className="small text-black">Enter Your Email address to sign up for our daily newsletter for free!</p>
                            <form onSubmit={handleSubmit}>
                                <div className="input-group mb-3 text-white">
                                    <input
                                        className="form-control text-white"
                                        type="email"
                                        placeholder="Recipient's username"
                                        aria-label="Recipient's username"
                                        aria-describedby="button-addon2"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <button
                                        className="btn btn-primary text-white"
                                        id="button-addon2"
                                        type="submit"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </footer>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                {newsletterSuccess ? "Your response has been recorded." : "Error"}
                            </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">{newsletterSuccess ? "Daily newsletters will be sent to your mail." : "An error occurred. Please try again later."}</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Footer;
