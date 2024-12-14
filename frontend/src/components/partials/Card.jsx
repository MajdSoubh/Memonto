const Card = ({ children, className = "" }) => {
  return (
    <div
      className={
        "w-full border relative border-slate-200 bg-white gap-3 rounded-xl md:p-5 max-md:p-3 " +
        className
      }
    >
      {children}
    </div>
  );
};

export default Card;
