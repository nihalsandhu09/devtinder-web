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

  return (
    feed && (
      <div className="w-full">
        <div className="flex justify-center mt-10">
          <UserCard user={feed[0]} />
        </div>
      </div>
    )
  );
};

export default Feed;
