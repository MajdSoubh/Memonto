import SearchBar from "@components/partials/SearchBar.jsx";
import Logo from "@components/partials/Logo";

const SidebarLeft = ({ children }) => {
  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="flex justify-center items-center gap-2">
        <Logo />
        <SearchBar />
      </div>
      {children}
    </div>
  );
};

export default SidebarLeft;
