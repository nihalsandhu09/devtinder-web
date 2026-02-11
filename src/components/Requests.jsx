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
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-semibold mb-6 ">Connection Requests</h1>

      {requests.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <p className="text-gray-500">No pending requests</p>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <RequestCard key={req._id} request={req} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Requests;
