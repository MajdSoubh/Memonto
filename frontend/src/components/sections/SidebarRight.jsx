import NavBar from "@components/partials/NavBar.jsx";

const SidebarRight = ({ children }) => {
  return (
    <div className="h-full flex flex-col gap-4 items-center">
      <NavBar />
      {children}
    </div>
  );
};

export default SidebarRight;
