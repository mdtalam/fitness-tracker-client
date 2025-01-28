import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Spinner from "../../OthersComponent/Spinner";

const Community = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [posts, setPosts] = useState([]);
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();

  // Fetch posts with React Query
  const {
    data,
    isLoading: dataLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["posts", currentPage],
    queryFn: async () => {
      const response = await axiosSecure.get(`/forum?page=${currentPage}&limit=6`);
      setTotalPages(response.data.totalPages);
      setPosts(response.data.posts);
      return response.data.posts;
    },
  });

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Handle voting (upvote or downvote)
  const handleVote = async (postId, voteType) => {
    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You need to log in to vote!",
      });
      return;
    }
  
    try {
      const endpoint = `/forum/${voteType}/${postId}`;
      const userId = user?._id;
  
      // Optimistic UI update
      const updatedPosts = posts.map((post) => {
        if (post._id === postId) {
          if (voteType === "upvote" && !post.upvotes.includes(userId)) {
            post.upvotes.push(userId);
            post.downvotes = post.downvotes.filter((id) => id !== userId);
            post.upvoteCount += 1;
            post.downvoteCount -= post.downvoteCount > 0 ? 1 : 0;
          } else if (voteType === "downvote" && !post.downvotes.includes(userId)) {
            post.downvotes.push(userId);
            post.upvotes = post.upvotes.filter((id) => id !== userId);
            post.downvoteCount += 1;
            post.upvoteCount -= post.upvoteCount > 0 ? 1 : 0;
          }
        }
        return post;
      });
      setPosts(updatedPosts);
  
      // Send vote to server
      await axiosSecure.put(endpoint, { userId });
  
      // Refetch posts to ensure consistency
      refetch();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message || "Something went wrong.",
      });
    }
  };
  

  if (loading || dataLoading) return <Spinner />;
  if (error) return <div>Error loading posts.</div>;

  return (
    <div className="min-h-screen p-6 sm:p-8 bg-gray-50">
      <Helmet>
        <title>FitFusion | Community</title>
      </Helmet>
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center sm:text-left">
        Forum
      </h2>

      {/* Posts */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col sm:flex-row space-x-0 sm:space-x-6 h-auto min-h-[300px]"
          >
            <div className="w-full sm:w-1/3 mb-4 sm:mb-0">
              <img
                src={post.image || "https://via.placeholder.com/150"}
                alt="Cover"
                className="w-full object-cover rounded-lg"
              />
            </div>
            <div className="w-full sm:w-2/3 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-gray-800">
                  {post.forumTitle}
                </h3>
                <p className="text-gray-600 mt-2">{post.classDetails}</p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <p className="text-sm sm:text-base">
                  Posted By <span className="bg-primary p-1 px-2 rounded-xl">{post?.userInfo?.role || "Unavailable"}</span>
                </p>
                <div className="flex items-center space-x-2">
                  <button
                    className="flex items-center space-x-2 px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={() => handleVote(post._id, "upvote")}
                  >
                    <FaThumbsUp />
                    <span>{post.upvoteCount || 0}</span>
                  </button>
                  <button
                    className="flex items-center space-x-2 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => handleVote(post._id, "downvote")}
                  >
                    <FaThumbsDown />
                    <span>{post.downvoteCount || 0}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 space-x-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className={`px-4 py-2 bg-blue-500 text-white rounded ${
            currentPage === 1 && "opacity-50 pointer-events-none"
          }`}
        >
          Previous
        </button>
        <p className="text-gray-600 text-sm sm:text-base">
          Page {currentPage} of {totalPages}
        </p>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className={`px-4 py-2 bg-blue-500 text-white rounded ${
            currentPage === totalPages && "opacity-50 pointer-events-none"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Community;
