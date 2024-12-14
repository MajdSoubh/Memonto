import { Modal } from "@mantine/core";
import { useState } from "react";
import { useSelector } from "react-redux";
import InputField from "../inputs/InputField.jsx";
import { updateUser } from "../../redux/actions/UserActions.js";
import { useDispatch } from "react-redux";
import { notifications } from "@mantine/notifications";
import { SaveIcon } from "../../assets/icons/icons.jsx";

const EditDetails = ({ opened, close }) => {
  const user = useSelector((state) => state.userReducer.user);
  const [errors, setErrors] = useState({});

  const [data, setData] = useState({
    title: user.title,
    worksat: user.worksat,
    bio: user.bio,
    livesin: user.livesin,
    relationship: user.relationship,
  });
  const dispatch = useDispatch();
  const handleChange = (ev) => {
    setData({ ...data, [ev.target.name]: ev.target.value });
  };

  const handleSubmit = () => {
    dispatch(updateUser(data))
      .then(() => {
        notifications.show({
          message: "Your Profile has been updated.",
          position: "top-center",
          color: "orange",
        });
        close();
      })
      .catch((errors) => setErrors(errors));
  };
  return (
    <Modal
      size="auto"
      opened={opened}
      withCloseButton={false}
      radius={"lg"}
      onClose={close}
    >
      <div className="w-[100%] flex flex-col gap-3 justify-center">
        <InputField
          type="text"
          label="Title"
          align="left"
          name="title"
          placeholder=" Your title"
          value={data.title}
          error={errors?.title}
          onChange={handleChange}
        />
        <InputField
          type="text"
          label="Lives In"
          align="left"
          name="livesin"
          placeholder="Your place"
          value={data?.livesin}
          error={errors?.livesin}
          onChange={handleChange}
        />
        <InputField
          type="text"
          label="Working"
          align="left"
          name="worksat"
          placeholder="Your work"
          value={data?.worksat}
          error={errors?.worksat}
          onChange={handleChange}
        />
        <InputField
          type="text"
          label="Relationship"
          align="left"
          name="relationship"
          placeholder="Single, Married or other"
          value={data?.relationship}
          error={errors?.relationship}
          onChange={handleChange}
        />
        <InputField
          type="text"
          label="Bio"
          align="left"
          name="bio"
          placeholder="About you"
          value={data?.bio}
          error={errors?.bio}
          onChange={handleChange}
        />
        <button
          onClick={handleSubmit}
          className="button gap-2 self-end mt-2 w-[5rem] group"
        >
          <SaveIcon />
        </button>
      </div>
    </Modal>
  );
};

export default EditDetails;
