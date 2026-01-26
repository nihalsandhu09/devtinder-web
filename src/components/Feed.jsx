import axios from "axios";
import { useEffect, useState } from "react";

const Feed = () => {
  const [feed, setFeed] = useState([]);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await axios.get("http://localhost:3000/user/feed", {
          withCredentials: true,
        });

        console.log("FEED DATA 👉", res.data);
        setFeed(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFeed();
  }, []);
  const currentUser = feed[currentUserIndex];

  if (!currentUser) {
    return <h1>No User PRofile MAtch </h1>;
  }
  return (
    <div>
      <h1>{currentUser.firstName}</h1>
    </div>
  );
};

export default Feed;
