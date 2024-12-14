import { useSelector } from "react-redux";
import { Avatar, Image, Indicator, Skeleton } from "@mantine/core";
import { reactToPost } from "../../redux/actions/PostActions.js";
import { calcPassedTime } from "../../helpers/Helpers.js";
import Card from "../partials/Card.jsx";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LikedIcon,
  UnLikedIcon,
  CommentIcon,
  ShareIcon,
} from "../../assets/icons/icons.jsx";

const PostCard = ({ data, loading = true }) => {
  const userId = useSelector((state) => state.userReducer.user._id);
  const [likes, setLikes] = useState(data?.likes);

  const react = async () => {
    const result = await reactToPost(data);
    if (result) {
      const idx = likes.findIndex((liker) => {
        return liker._id === userId;
      });
      if (idx > -1) {
        likes.splice(idx, 1);
      } else {
        likes.push({ _id: userId });
      }
      setLikes([...likes]);
    }
  };
  return (
    <Card>
      <div className="flex gap-3 justify-start items-center">
        {loading && <Skeleton height={"55"} width={"55"} circle />}
        {!loading && (
          <Link to={`/profile/${data?.publisher?._id}`}>
            <Indicator
              color="green"
              size={7}
              offset={5}
              disabled={!data?.publisher?.active}
              zIndex={5}
            >
              <Avatar
                src={data?.publisher?.avatar}
                alt="Publisher Avatar"
                radius="xl"
                name={
                  data?.publisher?.firstname + " " + data?.publisher?.lastname
                }
                color="initials"
              />
            </Indicator>
          </Link>
        )}
        {loading && (
          <div className="flex flex-col gap-1">
            <Skeleton height={8} width={"30"} />
            <Skeleton height={8} width={"50"} />
          </div>
        )}
        {!loading && (
          <div>
            <p className="text-sm text-black">
              {data?.publisher?.firstname + " " + data?.publisher?.lastname}
            </p>
            <p className="text-xs text-black/40">
              {calcPassedTime(data?.createdAt)}
            </p>
          </div>
        )}
      </div>
      {loading && (
        <div className="flex flex-col gap-2 ml-4 mt-6">
          <Skeleton height={8} width={"70%"} />
          <Skeleton height={8} width={"80%"} />
          <Skeleton height={8} width={"80%"} />
        </div>
      )}
      {!loading && (
        <>
          <div className="ml-4 mt-4 text-sm">{data?.content}</div>
          {data?.images?.length > 0 && (
            <div className="flex justify-center gap-2 mt-4">
              {data?.images?.map((img, ind) => (
                <Image w="10rem" key={ind} src={img} alt="post-image" />
              ))}
            </div>
          )}

          <div className="flex gap-3 mt-4 ml-4 justify-start">
            <div className="flex items-center gap-2 justify-center">
              {likes?.some((like) => like._id === userId) ? (
                <LikedIcon onClick={react} />
              ) : (
                <UnLikedIcon onClick={react} />
              )}

              <p className="text-sm ">{likes?.length}</p>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <CommentIcon />

              <p className="text-sm ">0</p>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <ShareIcon />
              <p className="text-sm">0</p>
            </div>
          </div>
        </>
      )}
    </Card>
  );
};
export default PostCard;
