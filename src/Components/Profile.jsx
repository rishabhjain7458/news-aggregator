// Profile.js
import React, { useState, useEffect } from "react";
import { collection, query, getDocs, getFirestore, deleteDoc, doc } from "firebase/firestore";
import { app } from "../firebase";

const firestore = getFirestore(app);

const Profile = ({ userId }) => {
    const [bookmarkedArticles, setBookmarkedArticles] = useState([]);

    useEffect(() => {
        const fetchBookmarks = async () => {
            try {
                const q = query(collection(firestore, "users", userId, "bookmarks"));
                const querySnapshot = await getDocs(q);
                const articles = [];
                querySnapshot.forEach((doc) => {
                    articles.push({ id: doc.id, ...doc.data() });
                });
                setBookmarkedArticles(articles);
            } catch (error) {
                console.error("Error fetching bookmarked articles:", error);
            }
        };

        fetchBookmarks();
    }, [userId]);

    const removeBookmark = async (id) => {
        try {
            await deleteDoc(doc(firestore, "users", userId, "bookmarks", id));
            setBookmarkedArticles(bookmarkedArticles.filter(article => article.id !== id));
        } catch (error) {
            console.error("Error removing bookmark:", error);
        }
    };

    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength) + "...";
    };

    return (
        <div className="card-container categorycontainer">
            {bookmarkedArticles.map((article) => (
                <div className="card categorycard" key={article.id}>
                    <img src={article.urlToImage} className="card-img-top categoryimg" alt={article.title} />
                    <div className="card-body">
                        <h5 className="card-title text-white">{truncateText(article.title, 80)}</h5>
                        <p className="card-text text-white">{truncateText(article.description, 80)}</p>
                        <a href={article.url} className="btn btn-primary text-white" target="_blank" rel="noopener noreferrer">Read more</a>
                        <button className="btn btn-danger" onClick={() => removeBookmark(article.id)}>Remove Bookmark</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Profile;
