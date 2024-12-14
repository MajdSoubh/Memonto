const links = [
  { link: "#", label: "Contact" },
  { link: "#", label: "Privacy" },
  { link: "#", label: "Blog" },
  { link: "#", label: "Careers" },
];

const Footer = ({ className }) => {
  return (
    <div className={"flex justify-end mx-5 mt-3 " + className}>
      {/* <MantineLogo size={28} /> */}
      <div className="flex gap-5 ">
        <a className=" text-slate-400 font-medium text-sm cursor-pointer ">
          Contact
        </a>
        <a className=" text-slate-400 font-medium text-sm cursor-pointer">
          Privacy
        </a>
        <a className=" text-slate-400 font-medium text-sm cursor-pointer">
          Blog
        </a>
      </div>
    </div>
  );
};

export default Footer;
