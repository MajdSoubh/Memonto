const InputField = ({
  type = "text",
  name,
  value,
  placeholder,
  className = "",
  error,
  label = "",
  onChange,
  align = "top",
  ...props
}) => {
  return (
    <div
      className={`w-full flex ${
        align === "top"
          ? "flex-col justify-start"
          : "flex-row items-center justify-between"
      }  gap-3 `}
    >
      {label && <span className="">{label}</span>}
      <div className="grow flex flex-col gap-2">
        {type == "textarea" && (
          <>
            <textarea
              name={name}
              value={value}
              placeholder={placeholder}
              className={`w-full outline-none border-none text-sm p-[9px] bg-inputColor rounded-lg focus:shadow-inputShadow placeholder:text-black/30 aria-[invalid=true]:shadow-inputShadow ${className}`}
              aria-invalid={!!error}
              onChange={onChange}
              {...props}
            />
            {error && (
              <span className="text-xs text-orange font-bold">{error}</span>
            )}
          </>
        )}
        {type !== "textarea" && (
          <>
            <input
              type={type}
              name={name}
              value={value}
              placeholder={placeholder}
              className={`w-full outline-none border-none text-sm p-[9px] bg-inputColor rounded-lg focus:shadow-inputShadow placeholder:text-black/30 aria-[invalid=true]:shadow-inputShadow ${className}`}
              aria-invalid={!!error}
              onChange={onChange}
              {...props}
            />
            {error && (
              <span className="text-xs text-orange font-bold">{error}</span>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default InputField;
