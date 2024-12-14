import { Avatar } from "@mantine/core";
import {
  fetchFollowingSuggestions,
  followUser,
} from "../../redux/actions/UserActions";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FollowersCard = () => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetchFollowingSuggestions().then((suggestions) =>
      setSuggestions(suggestions)
    );
  }, []);

  const deleteSuggestion = (index) => {
    suggestions.splice(index, 1);
    setSuggestions([...suggestions]);
  };
  return (
    <div className="z-10 flex flex-col gap-2 justify-center items-center w-full">
      {suggestions?.map((user, index) => (
        <div
          key={user._id}
          className="flex items-center justify-between gap-2 w-full"
        >
          <Link to={`/profile/${user._id}`}>
            <div className="flex items-center gap-2">
              <Avatar
                name={user.firstname + " " + user.lastname}
                src={user.avatar}
                size={50}
                radius={80}
              />
              <div>
                <p className="text-[12px] ">{user?.title}</p>

                <p className="text-[12px] font-bold">
                  {user.firstname + " " + user.lastname}
                </p>
              </div>
            </div>
          </Link>
          <button
            onClick={() => {
              followUser(user?._id);
              deleteSuggestion(index);
            }}
            className="p-2 px-3 text-center text-xs button rounded-[1rem] font-bold"
          >
            Follow
          </button>
        </div>
      ))}
    </div>
  );
};

export default FollowersCard;
