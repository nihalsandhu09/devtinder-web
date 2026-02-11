import axios from "axios";

import { BaseUrl } from "../utils/constant";
import { useDispatch } from "react-redux";
import { removeRequest } from "../store/requestSlice";
const RequestCard = ({ request }) => {
  const { fromUserId, status } = request;
  const dispatch = useDispatch();
  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BaseUrl + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true },
      );
      dispatch(removeRequest(_id));
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-black">
            {fromUserId.firstName} {fromUserId.lastName}
          </h2>

          <p className="text-sm text-gray-600">
            {fromUserId.age} yrs • {fromUserId.gender}
          </p>
        </div>

        <span className="self-start sm:self-auto text-xs px-3 py-1 rounded-full bg-yellow-100 text-yellow-800">
          {status}
        </span>
      </div>

      {/* About */}
      {fromUserId.about && (
        <p className="mt-3 text-gray-700 text-sm">{fromUserId.about}</p>
      )}

      {/* Skills */}
      {Array.isArray(fromUserId.skills) && fromUserId.skills.length > 0 && (
        <div className="mt-3 flex gap-2 flex-wrap">
          {fromUserId.skills.map((skill, index) => (
            <span
              key={index}
              className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="mt-5 flex flex-col sm:flex-row gap-3">
        <button
          className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          onClick={() => reviewRequest("accepted", request._id)}
        >
          Accept
        </button>

        <button
          className="w-full sm:w-auto px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
          onClick={() => reviewRequest("rejected", request._id)}
        >
          Ignore
        </button>
      </div>
    </div>
  );
};

export default RequestCard;
