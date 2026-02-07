import axios from "axios";
import React, { useEffect } from "react";
import { BaseUrl } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../store/requestSlice";
import RequestCard from "./RequestCard";

const Requests = () => {
  console.log("STEP 1: function called");
  console.log("REQUESTS COMPONENT LOADED");
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const fetchRequest = async () => {
    try {
      console.log("STEP 2: calling =>", BaseUrl + "/user/requests/received");
      const res = await axios.get(BaseUrl + "/user/requests/received", {
        withCredentials: true,
      });
      console.log("STEP 3: response =>", res);
      console.log("STEP 4: data =>", res.data);
      dispatch(addRequest(res?.data?.data));
      console.log(requests);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("useEffect runnign ");

    fetchRequest();
  }, []);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Connection Requests</h1>

      {requests.length === 0 && <p>No pending requests</p>}

      <div className="space-y-4">
        {requests.map((req) => (
          <RequestCard key={req._id} request={req} />
        ))}
      </div>
    </div>
  );
};

export default Requests;
