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
    <div className="border rounded-lg p-4 shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-semibold">
            {fromUserId.firstName} {fromUserId.lastName}
          </h2>

          <p className="text-sm text-gray-600">
            {fromUserId.age} yrs • {fromUserId.gender}
          </p>
        </div>

        <span className="text-sm px-2 py-1 rounded bg-yellow-100 text-yellow-800">
          {status}
        </span>
      </div>

      <p className="mt-3 text-gray-700">{fromUserId.about}</p>

      {/* Skills */}
      <div className="mt-3 flex gap-2 flex-wrap">
        {fromUserId.skills.map((skill, index) => (
          <span
            key={index}
            className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="mt-4 flex gap-3">
        <button
          className="px-4 py-2 bg-green-600 text-white rounded"
          onClick={() => {
            reviewRequest("accepted", request._id);
          }}
        >
          Accept
        </button>
        <button
          className="px-4 py-2 bg-gray-300 rounded"
          onClick={() => {
            reviewRequest("rejected", request._id);
          }}
        >
          Ignore
        </button>
      </div>
    </div>
  );
};

export default RequestCard;
