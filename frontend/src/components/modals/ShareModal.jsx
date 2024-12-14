import { Modal } from "@mantine/core";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPost } from "../../redux/actions/PostActions.js";
import { Avatar, Image, CloseButton } from "@mantine/core";
import {
  PhotoIcon,
  VideoIcon,
  LocationIcon,
} from "../../assets/icons/icons.jsx";
import InputField from "../inputs/InputField.jsx";

const ShareModal = ({ opened, close }) => {
  const [data, setData] = useState({ content: "", images: [] });
  const [images, setImage] = useState([]);
  const imageRef = useRef();
  const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();

  const onImageChange = (event) => {
    Array.from(event.target?.files).forEach((image) => {
      data.images.push(image);
      setImage([...images, { imageURL: URL.createObjectURL(image) }]);
    });
  };

  const removeImage = (index) => {
    images.splice(index, 1);
    data.images.splice(index, 1);
    setData({ content: data.content, images: [...data.images] });
    setImage([...images]);
  };
  const handleChange = (ev) => {
    setData({ ...data, [ev.target.name]: ev.target.value });
  };
  const handleSubmit = () => {
    dispatch(uploadPost(data));
  };
  return (
    <Modal
      size="55%"
      opened={opened}
      radius={"lg"}
      withCloseButton={false}
      onClose={close}
    >
      <div className="w-full  bg-white  rounded-xl p-2 ">
        <div className="flex gap-3 justify-center items-center">
          <Avatar
            name={user.firstname + " " + user.lastname}
            src={user.avatar}
            alt="User Avatar"
            radius="xl"
            color="initials"
          />

          <InputField
            type="textarea"
            name="content"
            placeholder="What would you like to share ?"
            value={data.content}
            onChange={handleChange}
            autoFocus
            rows="1"
          />
        </div>

        <div className="flex gap-3 justify-center items-center mt-4">
          <div
            className=" hover:outline outline-1 outline-photo rounded-xl p-1 flex justify-center  items-center text-xs gap-1 cursor-pointer"
            style={{ color: "var(--photo)" }}
            onClick={() => imageRef.current.click()}
          >
            <PhotoIcon />
            Photo
          </div>
          <div
            className=" hover:outline outline-1 outline-video rounded-xl p-1 flex justify-center  items-center text-xs gap-1 cursor-pointer"
            style={{ color: "var(--video)" }}
          >
            <VideoIcon />
            Video
          </div>
          <div
            className=" hover:outline outline-1 outline-location rounded-xl p-1 flex justify-center  items-center text-xs gap-1 cursor-pointer"
            style={{ color: "var(--location)" }}
          >
            <LocationIcon />
            Location
          </div>
          <button
            onClick={handleSubmit}
            className="p-2 px-4 text-center text-xs button rounded-[1rem] font-bold"
          >
            Share
          </button>
        </div>

        {/* Container for files input */}
        <div>
          <input
            type="file"
            ref={imageRef}
            onChange={onImageChange}
            style={{ display: "none" }}
            multiple
          />
        </div>
        {/* Image Preview */}
        {images.length > 0 && (
          <div className="flex justify-center gap-2 mt-2">
            {images.map((img, index) => (
              <div className=" relative" key={index}>
                <CloseButton
                  className=" absolute top-1 right-1"
                  onClick={() => removeImage(index)}
                />
                <Image
                  className=" w-full rounded object-cover h-24"
                  src={img.imageURL}
                  alt="post-image-preview"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ShareModal;
