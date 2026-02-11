import axios from "axios";
import React, { useEffect } from "react";
import { BaseUrl } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../store/connectionSlice";
const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BaseUrl + "/user/connections", {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addConnections(res.data.data));
      console.log(connections);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log("useEddect runs");
    if (!connections || connections.length === 0) {
      fetchConnections();
    }
    console.log(connections);
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-semibold mb-6 ">Connections</h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {connections.length === 0 ? (
          <p className="p-6 text-center text-gray-500">No connections yet</p>
        ) : (
          connections.map((connection) => (
            <div
              key={connection._id}
              className="flex flex-col sm:flex-row sm:items-center gap-4 px-6 py-4 hover:bg-gray-50 transition"
            >
              <img
                src={
                  connection.photoUrl ||
                  "https://randomuser.me/api/portraits/lego/1.jpg"
                }
                alt={connection.firstName}
                className="w-12 h-12 rounded-full object-cover border"
              />

              <div className="flex-1">
                <p className="font-medium text-gray-900">
                  {connection.firstName} {connection.lastName}
                </p>
                <p className="text-sm text-gray-500">{connection.gender}</p>
                <p className="text-sm text-gray-500 truncate">
                  {connection.about || "No bio available"}
                </p>
              </div>

              <span className="text-gray-400 text-xl self-end sm:self-auto">
                ›
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Connections;
