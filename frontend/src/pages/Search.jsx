import { UsersSearchInput } from "../components/inputs/UsersSearchInput";
import FollowersCard from "../components/cards/FollowersCard";

const Search = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="relative flex justify-center items-center bg-white p-3 rounded-xl ">
        <UsersSearchInput />
      </div>
      <FollowersCard />
    </div>
  );
};

export default Search;
