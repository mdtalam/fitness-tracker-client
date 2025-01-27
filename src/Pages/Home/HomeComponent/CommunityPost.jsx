import { useQuery } from "@tanstack/react-query";
import React from "react";

import { Link } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Spinner from "../../../OthersComponent/Spinner";



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
    <div className="my-14">
      <h2 className="text-2xl font-bold text-center mb-6">Latest Community Posts</h2>
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
      <div className="text-center mt-8">
        <Link
          to="community"
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-secondary"
        >
          View All Posts
        </Link>
      </div>
    </div>
  );
};

export default CommunityPost;
