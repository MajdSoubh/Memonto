import { useEffect, useState } from "react";
import SidebarLeft from "@components/sections/SidebarLeft";
import SidebarRight from "@components/sections/SidebarRight";
import FollowersCard from "@components/cards/FollowersCard.jsx";
import ProfileCard from "@components/cards/ProfileCard";
import PostShare from "@components/cards/PostShareCard.jsx";
import PostsCard from "@components/cards/PostsCard.jsx";
import TrendCard from "@components/cards/TrendCard";
import ShareModal from "@components/modals/ShareModal";
import { getTimelinePosts } from "../redux/actions/PostActions";
import { useDisclosure } from "@mantine/hooks";

const Home = () => {
  const [posts, setPosts] = useState({ loading: false, posts: [] });
  const [opened, { open, close }] = useDisclosure(false);

  const fetchTimeLine = async () => {
    setPosts({ ...posts, loading: true });
    try {
      const posts = await getTimelinePosts();
      setPosts({ posts: [...posts], loading: false });
    } catch (error) {
      setPosts({ posts: [...posts], loading: false });
    }
  };
  const handlePostCreated = (post) => {
    setPosts((prevState) => {
      return { loading: prevState.loading, posts: [post, ...prevState.posts] };
    });
  };
  useEffect(() => {
    fetchTimeLine();
  }, []);
  return (
    <>
      <div className="relative h-full grid max-md:hidden grid-cols-[minmax(15rem,18rem)_minmax(34rem,auto)_minmax(15rem,18rem)] gap-4">
        <SidebarLeft>
          <ProfileCard />
          <FollowersCard />
        </SidebarLeft>
        <div className="flex flex-col gap-4 h-full overflow-auto max-md:overflow-visible">
          <PostShare onPostCreated={handlePostCreated} />
          <PostsCard data={posts} />
        </div>
        <SidebarRight>
          <TrendCard />
          <ShareModal opened={opened} close={close} data={{}} />
          <button
            className="p-3 px-3 text-center text-sm button w-4/5 rounded-[1rem] font-bold"
            onClick={() => open()}
          >
            Share
          </button>
        </SidebarRight>
      </div>
      {/* Mobiles */}
      <div className="md:hidden relative h-max">
        <div className="flex flex-col gap-2 h-full overflow-auto max-md:overflow-visible">
          <PostShare onPostCreated={handlePostCreated} />
          <PostsCard data={posts} />
        </div>
      </div>
    </>
  );
};

export default Home;
