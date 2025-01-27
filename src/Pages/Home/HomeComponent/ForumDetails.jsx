import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Spinner from "../../../OthersComponent/Spinner";

const ForumDetails = () => {
  const { id } = useParams(); // Get the forum ID from the URL
  const axiosPublic = useAxiosPublic();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = "uniqueUserId"; // Replace this with the logged-in user's ID from your auth system

  useEffect(() => {
    const fetchForumPost = async () => {
      try {
        const { data } = await axiosPublic.get(`/forum/${id}`);
        setPost(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching forum post:", error);
        setLoading(false);
      }
    };

    fetchForumPost();
  }, [id, axiosPublic]);

  const handleVote = async (type) => {
    try {
      const endpoint = type === "upvote" ? `/forum/upvote/${id}` : `/forum/downvote/${id}`;
      await axiosPublic.put(endpoint, { userId });

      // Refresh the post data after voting
      const { data } = await axiosPublic.get(`/forum/${id}`);
      setPost(data);
    } catch (error) {
      console.error(`Error handling ${type}:`, error);
    }
  };

  const hasVoted = (type) => {
    if (!post) return false;
    return type === "upvote" ? post.upvotes?.includes(userId) : post.downvotes?.includes(userId);
  };

  if (loading) return <Spinner />;

  if (!post) return <p>Forum post not found</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <img src={post.image} alt={post.forumTitle} className="w-full rounded-lg mb-4" />
        <h1 className="text-2xl font-bold mb-4">{post.forumTitle}</h1>
        <p className="text-gray-700">{post.classDetails}</p>
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Posted by:</h3>
          <p className="text-gray-600">{post.userInfo.name} ({post.userInfo.role})</p>
        </div>

      </div>
    </div>
  );
};

export default ForumDetails;
