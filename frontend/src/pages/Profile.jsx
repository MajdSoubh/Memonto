import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchUserPosts } from "../redux/actions/PostActions";
import SidebarRight from "@components/sections/SidebarRight";
import SidebarLeft from "@components/sections/SidebarLeft";
import TrendCard from "@components/cards/TrendCard";
import FollowersCard from "@components/cards/FollowersCard";
import ShareModal from "@components/modals/ShareModal";
import ProfileView from "../components/cards/ProfileView";
import PostShareCard from "../components/cards/PostShareCard";
import PostsCard from "../components/cards/PostsCard";
import DetailsCard from "../components/cards/DetailsCard";
import { fetchAccount } from "../redux/actions/UserActions";
import { useDispatch } from "react-redux";

const Profile = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [posts, setPosts] = useState({ loading: false, posts: [] });
  const [profile, setProfile] = useState({ loading: false, profile: {} });
  const dispatch = useDispatch();
  const params = useParams();
  const user = useSelector((state) => state.userReducer.user);

  const fetchProfile = async (userId) => {
    setProfile({ ...profile, loading: true });
    try {
      const profile = await fetchAccount(userId);
      setProfile({ profile, loading: false });
    } catch (error) {
      setProfile({ ...profile, loading: false });
    }
  };

  const fetchPosts = async (userId) => {
    setPosts({ ...posts, loading: true });
    try {
      const posts = await fetchUserPosts(userId);
      setPosts({ posts: [...posts], loading: false });
    } catch (error) {
      setPosts({ posts: [...posts], loading: false });
    }
  };

  const handleFollowUser = () => {
    if (profile?.profile?.followers) {
      profile?.profile?.followers.push(user._id);
      setProfile({ ...profile });
      dispatch({ type: "FOLLOW_USER", user: profile?.profile });
    }
  };
  const handleUnFollowUser = () => {
    if (profile?.profile?.followers) {
      const index = profile?.profile?.followers.findIndex(
        (follower) => follower === user._id
      );
      if (index > -1) {
        profile?.profile?.followers.splice(index, 1);
      }
      setProfile({ ...profile });
      dispatch({ type: "UNFOLLOW_USER", user: profile?.profile });
    }
  };

  useEffect(() => {
    let userId = params?.id ? params?.id : user._id;
    fetchPosts(userId);
    fetchProfile(userId);
  }, [params?.id]);
  return (
    <>
      <div className="max-md:hidden relative h-full grid grid-cols-[minmax(15rem,18rem)_minmax(34rem,auto)_minmax(15rem,18rem)] gap-4">
        <SidebarLeft>
          <DetailsCard data={profile} />
          <FollowersCard />
        </SidebarLeft>

        <div className="flex flex-col gap-4 h-full overflow-auto max-md:overflow-visible">
          <ProfileView
            data={profile}
            onFollowUser={handleFollowUser}
            onUnFollowUser={handleUnFollowUser}
          />
          {!profile.loading && profile?.profile._id === user._id && (
            <PostShareCard />
          )}
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
      <div className="md:hidden relative h-max ">
        <div className="flex flex-col gap-2">
          <ProfileView
            data={profile}
            onFollowUser={handleFollowUser}
            onUnFollowUser={handleUnFollowUser}
          />

          {!profile.loading && profile?.profile._id === user._id && (
            <>
              <PostShareCard />
            </>
          )}
          <DetailsCard data={profile} />
          <PostsCard data={posts} />
        </div>
      </div>
    </>
  );
};

export default Profile;
