import React, { useState, useEffect } from "react";
import axios from "axios";
import "./NewsComponent.css";
import "./CategoryNews.css";

const EntertainmentNews = () => {
    const [entertainmentNews, setEntertainmentNews] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            try {
                // Fetch Entertainment news
                const entertainmentResponse = await axios.get(
                    "https://newsapi.org/v2/top-headlines",
                    {
                        params: {
                            category: "entertainment",
                            country: "us",
                            apiKey: "362214fe295a47e796e19883a30b596b",
                            pageSize: 100,
                        },
                    }
                );
                // Filter out news articles without images
                const filteredNews = entertainmentResponse.data.articles.filter(article => article.urlToImage);
                setEntertainmentNews(filteredNews);
            } catch (error) {
                console.error("Error fetching entertainment news:", error);
            }
            setLoading(false);
        };

        fetchNews(); // Call the fetchNews function
    }, []);

    // Function to truncate text
    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength) + "...";
    };

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="card-container categorycontainer">
                    {entertainmentNews.map((article, index) => (
                        <div className="card categorycard" key={index}>
                            <img src={article.urlToImage} className="card-img-top categoryimg" alt={article.title} />
                            <div className="card-body">
                            <h5 className="card-title text-white">{truncateText(article.title,80)}</h5>
                                <p className="card-text text-white">{truncateText(article.description, 80)}</p>
                                <a href={article.url} className="btn btn-primary text-white" target="_blank" rel="noopener noreferrer">Read more</a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EntertainmentNews;
