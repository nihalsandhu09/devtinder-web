import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../store/feedSlice";
import UserCard from "./UserCard";
const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await axios.get("http://localhost:3000/user/feed", {
          withCredentials: true,
        });

        console.log("FEED DATA 👉", res.data);
        dispatch(addFeed(res.data.data));
        console.log(feed);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFeed();
  }, []);
  if (!feed || feed.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-gray-500 text-center">
        <p className="text-lg sm:text-xl">No users in your feed right now</p>
      </div>
    );
  }
  return (
    feed && (
      <div className="max-w-7xl mx-auto py-8">
        <div className="flex justify-center">
          <UserCard user={feed[0]} />
        </div>
      </div>
    )
  );
};

export default Feed;
