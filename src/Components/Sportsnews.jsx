import React, { useState, useEffect } from "react";
import axios from "axios";
import "./NewsComponent.css";
import "./CategoryNews.css";

const SportsNews = () => {
    const [sportsNews, setSportsNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [country, setCountry] = useState("us"); 

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            try {
                
                const sportsResponse = await axios.get(
                    "https://newsapi.org/v2/top-headlines",
                    {
                        params: {
                            category: "sports",
                            country: country, 
                            apiKey: "362214fe295a47e796e19883a30b596b",
                            pageSize: 100,
                        },
                    }
                );
                
                const filteredNews = sportsResponse.data.articles.filter(article => article.urlToImage);
                setSportsNews(filteredNews);
            } catch (error) {
                console.error("Error fetching sports news:", error);
            }
            setLoading(false);
        };

        fetchNews(); 
    }, [country]); 

    
    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength) + "...";
    };

    
    const handleCountryChange = (newCountry) => {
        setCountry(newCountry);
    };

    return (
        <div>
            <div className="country-buttons">
                <button className="btn btn-success usabutton" onClick={() => handleCountryChange("us")}>
                    USA
                </button>
                <button className="btn btn-success indiabutton" onClick={() => handleCountryChange("in")}>
                    India
                </button>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="card-container categorycontainer">
                    {sportsNews.map((article, index) => (
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

export default SportsNews;
