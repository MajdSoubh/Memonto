import { useSelector } from "react-redux";
import Card from "../partials/Card.jsx";
import EditDetails from "../modals/EditDetails.jsx";
import { EditIcon } from "../../assets/icons/icons.jsx";
import { useDisclosure } from "@mantine/hooks";
import { Skeleton } from "@mantine/core";
import { useEffect, useState } from "react";

const DetailsCard = ({ data }) => {
  const user = useSelector((state) => state.userReducer.user);
  const [profile, setProfile] = useState({});
  const [opened, { open, close }] = useDisclosure(false);
  useEffect(() => {
    if (user._id === data?.profile?._id) {
      setProfile(user);
    } else {
      setProfile(data?.profile || {});
    }
  }, [data?.profile?._id, user]);
  return (
    <Card>
      <div className="flex justify-between">
        <h3 className="font-bold text-md mb-4">Profile Info</h3>
        {user._id === data.profile?._id && (
          <>
            <EditDetails opened={opened} close={close} />
            <div onClick={open}>
              <EditIcon />
            </div>
          </>
        )}
      </div>
      <div className="flex flex-col gap-2">
        {data?.loading && (
          <div className="flex flex-col gap-3">
            <Skeleton height={8} mt={6} width="100%" radius="xl" />
            <Skeleton height={8} mt={6} width="100%" radius="xl" />
            <Skeleton height={8} mt={6} width="100%" radius="xl" />
          </div>
        )}
        {!data?.loading && (
          <>
            <div className="flex gap-2">
              <span className="block font-bold">Email</span>
              <span className="block">{profile?.email || "..."}</span>
            </div>
            <div className="flex gap-2">
              <span className="block font-bold">Lives in</span>
              <span className="block">{profile?.livesin || "..."}</span>
            </div>
            <div className="flex gap-2">
              <span className="block font-bold">Working</span>
              <span className="block">{profile?.worksat || "..."}</span>
            </div>
            <div className="flex gap-2">
              <span className="block font-bold">Relationship</span>
              <span className="block">{profile?.relationship || "..."}</span>
            </div>
            <div className="flex gap-2">
              <span className="block font-bold">Bio</span>
              <span className="block">{profile?.bio || "..."}</span>
            </div>
          </>
        )}
      </div>
    </Card>
  );
};
export default DetailsCard;
