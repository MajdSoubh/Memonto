import PostCard from "@components/cards/PostCard.jsx";

const PostsCard = ({ data }) => {
  return (
    <div className="flex flex-col md:gap-4 max-md:gap-2">
      {data?.loading &&
        Array.from({ length: 3 }).map((_, i) => (
          <PostCard laoding={true} key={i} />
        ))}
      {!data?.loading && (
        <>
          {data?.posts?.map((post, id) => (
            <PostCard loading={false} data={post} key={id} />
          ))}
        </>
      )}
    </div>
  );
};

export default PostsCard;
