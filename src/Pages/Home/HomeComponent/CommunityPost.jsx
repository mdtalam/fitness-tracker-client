import { useQuery } from "@tanstack/react-query";
import React from "react";

import { Link } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Spinner from "../../../OthersComponent/Spinner";
import SectionTitle from "../../../Shared/SectionTitle";
import { ShimmerButton } from "../../../components/magicui/shimmer-button";



const CommunityPost = () => {
  const axiosPublic = useAxiosPublic();

  // Fetch the latest 6 forum posts
  const { data: forumData, isLoading } = useQuery({
    queryKey: ["forum", 1, 6], // Fetch page 1 with limit 6
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/forum?page=1&limit=6`);
      return data;
    },
  });

  if (isLoading) return <Spinner />;

  const posts = forumData?.posts || [];

  return (
    <div className="my-14 max-w-screen-2xl mx-auto">
      <SectionTitle title={"Latest Community Posts"}
          subTitle={
            "Stay updated with the latest fitness tips, success stories, and community highlights from FitFusion!"
          } />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post._id}
            className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <img
              src={post.image}
              alt={post.forumTitle}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold mb-2 truncate">
              {post.forumTitle}
            </h3>
            <p className="text-sm text-gray-600 mb-4 truncate">
              {post.classDetails}
            </p>
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                <span className="font-medium">{post.userInfo.name}</span> -{" "}
                <span>{post.userInfo.role}</span>
              </div>
              <Link
                to={`/forum/${post._id}`}
                className="text-primary hover:underline text-sm font-medium"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-8 flex justify-center">
        <ShimmerButton className="px-6 py-2 bg-primary text-white rounded-lg">
        <Link
          to="community"
          className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg"
        >
          View All Posts
        </Link>
        </ShimmerButton>
      </div>
    </div>
  );
};

export default CommunityPost;
