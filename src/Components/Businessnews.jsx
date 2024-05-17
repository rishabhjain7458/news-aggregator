import React, { useState, useEffect } from "react";
import axios from "axios";
import "./NewsComponent.css";
import "./CategoryNews.css";
import { getFirestore, collection, addDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { app } from "../firebase";

const firestore = getFirestore(app);
const auth = getAuth(app);

const BusinessNews = () => {
  const [businessNews, setBusinessNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState("us");
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const businessResponse = await axios.get(
          "https://newsapi.org/v2/top-headlines",
          {
            params: {
              category: "business",
              country: country,
              apiKey: "6a4df677f92548a8aebfd1200ef3791d",
              pageSize: 100,
            },
          }
        );

        const filteredNews = businessResponse.data.articles.filter(
          (article) => article.urlToImage
        );
        setBusinessNews(filteredNews);
        setFilteredNews(filteredNews); // Initially set filtered news same as fetched news
      } catch (error) {
        console.error("Error fetching business news:", error);
      }
      setLoading(false);
    };

    fetchNews();

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [country]);

  const writedata = async (article) => {
    if (!user) {
      alert("You must be logged in to bookmark articles.");
      return;
    }

    try {
      const userDocRef = doc(collection(firestore, 'users'), user.uid);
      const bookmarksCollectionRef = collection(userDocRef, 'bookmarks');
      const result = await addDoc(bookmarksCollectionRef, {
        title: article.title,
        description: article.description,
        url: article.url,
        urlToImage: article.urlToImage,
        publishedAt: article.publishedAt,
      });

      alert("Bookmark added successfully!");
      console.log("Bookmark added with ID:", result.id);
    } catch (error) {
      console.error("Error adding bookmark:", error);
    }
  };

  const truncateText = (text, maxLength) => {
    if (!text || text.length <= maxLength) return text;
    return text.substr(0, maxLength) + "...";
  };

  const handleCountryChange = (newCountry) => {
    setCountry(newCountry);
  };

  // Function to filter articles based on search query
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = businessNews.filter(article =>
      article.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredNews(filtered);
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
      <div className="search-container" style={{paddingLeft:"83vh",paddingTop:"2vh"}}>
        <input className="text-black"
          style={{height:"6vh",borderRadius:"15px"}}
          type="text"
          placeholder = "Search articles..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="card-container categorycontainer">
          {filteredNews.map((article, index) => (
            <div className="card categorycard" key={index}>
              <img
                src={article.urlToImage}
                className="card-img-top categoryimg"
                alt={article.title}
              />
              <div className="card-body">
                <h5 className="card-title text-white">
                  {truncateText(article.title, 80)}
                </h5>
                <p className="card-text text-white">
                  {truncateText(article.description, 80)}
                </p>
                <a
                  href={article.url}
                  className="btn btn-primary text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read more
                </a>
                <button 
                  className="btn btn-primary text-white" 
                  onClick={() => writedata(article)}
                  style={{ marginLeft: '10px' }}>
                  Bookmark
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BusinessNews;
