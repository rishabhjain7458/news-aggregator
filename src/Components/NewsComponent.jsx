import React, { useState, useEffect } from "react";
import axios from "axios";
import "./NewsComponent.css";
import {
	getFirestore,
	collection,
	addDoc,
	doc,
	setDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { app } from "../firebase";

const firestore = getFirestore(app);
const auth = getAuth(app);

const NewsComponent = () => {
	const [usNews, setUsNews] = useState([]);
	const [indiaNews, setIndiaNews] = useState([]);
	const [visibleNewsCount, setVisibleNewsCount] = useState(6);
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState(null);

	useEffect(() => {
		const fetchNews = async () => {
			setLoading(true);
			try {
				const usResponse = await axios.get(
					"https://newsapi.org/v2/top-headlines",
					{
						params: {
							country: "us",
							apiKey: "07d3602ca2ce4c758e084d360e48ed2c",
							pageSize: 100,
						},
					}
				);
				const usFilteredNews = usResponse.data.articles.filter(
					(article) => article.urlToImage
				);
				setUsNews(usFilteredNews);

				const indiaResponse = await axios.get(
					"https://newsapi.org/v2/top-headlines",
					{
						params: {
							country: "in",
							apiKey: "07d3602ca2ce4c758e084d360e48ed2c",
							pageSize: 100,
						},
					}
				);
				const indiaFilteredNews = indiaResponse.data.articles.filter(
					(article) => article.urlToImage
				);
				setIndiaNews(indiaFilteredNews);
			} catch (error) {
				console.error("Error fetching news:", error);
			}
			setLoading(false);
		};

		fetchNews();

		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				setUser(user);
				saveUserEmail(user);
			} else {
				setUser(null);
			}
		});

		return () => unsubscribe();
	}, []);

	const saveUserEmail = async (user) => {
		const userDocRef = doc(firestore, "users", user.uid);
		await setDoc(
			userDocRef,
			{
				email: user.email,
			},
			{ merge: true }
		);
	};

	const writedata = async (article) => {
		if (!user) {
			alert("You must be logged in to bookmark articles.");
			return;
		}

		try {
			const userDocRef = doc(collection(firestore, "users"), user.uid);
			const bookmarksCollectionRef = collection(userDocRef, "bookmarks");
			const result = await addDoc(bookmarksCollectionRef, {
				title: article.title,
				description: article.description,
				url: article.url,
				urlToImage: article.urlToImage,
				publishedAt: article.publishedAt,
			});

			console.log("Bookmark added with ID:", result.id);
		} catch (error) {
			console.error("Error adding bookmark:", error);
		}
	};

	useEffect(() => {
		const handleScroll = () => {
			if (
				window.innerHeight + document.documentElement.scrollTop !==
				document.documentElement.offsetHeight
			)
				return;
			if (!loading) {
				setVisibleNewsCount((prevCount) => prevCount + 3);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [loading]);

	return (
		<>
			<div className="container">
				<div className="row">
					<div className="col-md-7">
						{/* US News Carousel */}
						<div
							id="usNewsCarousel"
							className="carousel carousel-dark slide mt-0"
							data-bs-ride="carousel">
							<h1
								style={{
									textAlign: "center",
									backgroundColor: "#DD0103",
									color: "white",
								}}>
								USA-NOW
							</h1>
							<div className="carousel-inner">
								{usNews.map((article, index) => (
									<div
										key={index}
										className={`carousel-item ${index === 0 ? "active" : ""}`}>
										<img
											src={article.urlToImage}
											className="d-block w-100"
											alt={article.title}
											style={{ objectFit: "cover", maxHeight: "50vh" }}
										/>
										<br />
										<div className="carousel-caption d-none d-md-block">
											<h5
												style={{
													backgroundColor: "#F5CC75",
													marginBottom: "0%",
												}}>
												{article.title}
											</h5>
											<a
												href={article.url}
												target="_blank"
												rel="noopener noreferrer">
												Read more
											</a>
										</div>
									</div>
								))}
							</div>
							<button
								className="carousel-control-prev"
								type="button"
								data-bs-target="#usNewsCarousel"
								data-bs-slide="prev">
								<span
									className="carousel-control-prev-icon"
									aria-hidden="true"></span>
								<span className="visually-hidden">Previous</span>
							</button>
							<button
								className="carousel-control-next"
								type="button"
								data-bs-target="#usNewsCarousel"
								data-bs-slide="next">
								<span
									className="carousel-control-next-icon"
									aria-hidden="true"></span>
								<span className="visually-hidden">Next</span>
							</button>
						</div>
						{/* India News Carousel */}
						<h1
							style={{
								textAlign: "center",
								backgroundColor: "#DD0103",
								color: "white",
							}}>
							INDIA-NOW
						</h1>
						<div
							id="indiaCarousel"
							className="carousel carousel-dark slide"
							data-bs-ride="carousel">
							<div className="carousel-inner">
								{indiaNews.map((article, index) => (
									<div
										key={index}
										className={`carousel-item ${index === 0 ? "active" : ""}`}>
										<img
											src={article.urlToImage}
											className="d-block w-100"
											alt={article.title}
											style={{ objectFit: "cover", maxHeight: "50vh" }}
										/>
										<br />
										<div className="carousel-caption d-none d-md-block">
											<h5
												style={{
													backgroundColor: "#F5CC75",
													marginBottom: "0%",
												}}>
												{article.title}
											</h5>
											<a
												href={article.url}
												target="_blank"
												rel="noopener noreferrer">
												Read more
											</a>
										</div>
									</div>
								))}
							</div>
							<button
								className="carousel-control-prev"
								type="button"
								data-bs-target="#indiaCarousel"
								data-bs-slide="prev">
								<span
									className="carousel-control-prev-icon"
									aria-hidden="true"></span>
								<span className="visually-hidden">Previous</span>
							</button>
							<button
								className="carousel-control-next"
								type="button"
								data-bs-target="#indiaCarousel"
								data-bs-slide="next">
								<span
									className="carousel-control-next-icon"
									aria-hidden="true"></span>
								<span className="visually-hidden">Next</span>
							</button>
						</div>
					</div>
					<div className="col-md-5">
						<div
							className="mt-1 pe-2"
							style={{ maxHeight: "120vh", overflowY: "scroll" }}>
							<h1
								style={{
									textAlign: "center",
									backgroundColor: "#DD0103",
									color: "white",
								}}>
								HEADLINES
							</h1>
							{usNews.slice(3, visibleNewsCount).map((article, index) => (
								<div
									key={index}
									className="card mb-3"
									style={{ backgroundColor: "#DD0103" }}>
									<div className="row g-0">
										<div className="col-md-4">
											<img
												src={article.urlToImage}
												className="img-fluid rounded-start"
												alt={article.title}
											/>
										</div>
										<div className="col-md-8">
											<div className="card-body text-white">
												<h5 className="card-title text-white">
													{article.title}
												</h5>
												<p className="card-text text-white">
													{article.description}
												</p>
												<p className="card-text">
													<small className="text-white">
														<a
															href={article.url}
															target="_blank"
															rel="noopener noreferrer">
															Read more
														</a>
													</small>
												</p>
												<button
													className="btn btn-primary"
													onClick={() => writedata(article)}>
													Bookmark
												</button>
											</div>
										</div>
									</div>
								</div>
							))}
							{loading && <p>Loading...</p>}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default NewsComponent;
