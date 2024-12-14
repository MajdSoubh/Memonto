import { useState } from "react";
import { useDispatch } from "react-redux";
import LogoImg from "@images/logo.png";
import { login, signup } from "../redux/actions/UserActions.js";
import InputField from "../components/inputs/InputField.jsx";
import { notifications } from "@mantine/notifications";

const Auth = () => {
  const initialState = {
    firstname: "",
    lastname: "",
    email: "",
    title: "",
    password: "",
    password_confirmation: "",
  };
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [data, setData] = useState(initialState);
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (ev) => {
    setData({ ...data, [ev.target.name]: ev.target.value });
  };

  const toggleForm = () => {
    setData(initialState);
    setErrors({});
    setIsSignUp(!isSignUp);
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setLoading(true);
    let payload = data;
    if (isSignUp) {
      await dispatch(signup(payload)).catch((errors) => setErrors(errors));
    } else {
      const { email, password } = data;
      payload = { email, password };
      await dispatch(login(payload)).catch((errors) => {
        if (errors.message) {
          notifications.show({
            message: errors.message,
            position: "top-center",
            color: "orange",
          });
        }
        setErrors(errors);
      });
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center w-full h-full gap-16 relative  max-md:flex-col max-md:gap-8">
      <div className="flex justify-center items-center flex-col">
        <div className="flex justify-center items-center gap-4">
          <img
            className="w-[4rem] h-[4rem] max-md:w-[2.7rem] max-md:h-[2.7rem]"
            src={LogoImg}
            alt="media-logo"
          />
          <h1 className=" text-[3rem] max-md:text-[2.5rem] m-0 bg-buttonBg bg-clip-text text-transparent">
            Momento
          </h1>
        </div>
        <div>
          <h5>Explorer the idea throughout the world</h5>
        </div>
      </div>
      <form
        className="flex flex-col justify-center items-center gap-4 bg-cardColor rounded-2xl p-4 min-w-[28rem] max-md:min-w-[90%]"
        onSubmit={handleSubmit}
      >
        <h3 className="m-0">{isSignUp ? "Register" : "Login"}</h3>
        {isSignUp && (
          <div className="flex gap-4 justify-center items-start w-full">
            <InputField
              type="text"
              name="firstname"
              placeholder="First Name"
              value={data.firstname}
              error={errors?.firstname}
              onChange={handleChange}
            />
            <InputField
              type="text"
              name="lastname"
              placeholder="Last Name"
              value={data.lastname}
              error={errors?.lastname}
              onChange={handleChange}
            />
          </div>
        )}

        <div className="flex gap-4 justify-center items-start w-full">
          <InputField
            type="text"
            name="email"
            placeholder="Email"
            value={data.email}
            error={errors?.email}
            onChange={handleChange}
            autoFocus
          />
          {isSignUp && (
            <InputField
              type="text"
              name="title"
              placeholder="Your Title"
              value={data.title}
              error={errors?.title}
              onChange={handleChange}
            />
          )}
        </div>
        <div className="flex gap-4 justify-center items-start w-full">
          <InputField
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            error={errors?.password}
            onChange={handleChange}
          />

          {isSignUp && (
            <InputField
              type="password"
              name="password_confirmation"
              placeholder="Retype Password"
              value={data.password_confirmation}
              error={errors?.password_confirmation}
              onChange={handleChange}
            />
          )}
        </div>

        <div
          style={{
            fontSize: "12px",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          {isSignUp ? (
            <span onClick={toggleForm}>Already have an account Login</span>
          ) : (
            <span onClick={toggleForm}>Don't have an account Sign up</span>
          )}
        </div>
        <button
          className="p-2 !px-5 text-center self-end mr-2 text-sm button group"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <div
              style={{ width: "25px" }}
              className="loader group-hover:fill-orange"
            ></div>
          ) : isSignUp ? (
            "Sign up"
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
};

export default Auth;
