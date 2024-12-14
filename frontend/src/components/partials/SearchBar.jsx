import { UsersSearchInput } from "../inputs/UsersSearchInput.jsx";
import { SearchIcon2 } from "../../assets/icons/icons.jsx";
const SearchBar = () => {
  return (
    <div className="relative flex items-center justify-center bg-inputColor rounded-xl p-1 px-2">
      <UsersSearchInput />
      <div className="cursor-pointer flex items-center justify-center  bg-buttonBg rounded-xl p-1 text-white">
        <SearchIcon2 />
      </div>
    </div>
  );
};

export default SearchBar;
