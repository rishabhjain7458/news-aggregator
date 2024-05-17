// ParentComponent.js
import React, { useState, useEffect } from 'react';
import Profile from '../Components/Profile';
import { getAuth } from 'firebase/auth';
import { app } from '../firebase';
import Header from '../Components/Header';

const auth = getAuth(app);

const ParentComponent = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <Header/>
      <h1 style={{textAlign:"center"}}>Your Bookmarked Articles</h1>
      {userId && <Profile userId={userId} />}
    </div>
  );
};

export default ParentComponent;
