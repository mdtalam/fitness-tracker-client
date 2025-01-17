import React from "react";
import SectionTitle from "../../../Shared/SectionTitle";

const CommunityPost = () => {
  // Dummy data for recent posts
  const posts = [
    {
      author: "Olivia Davis",
      location: "Germany",
      date: "29 May, 2024",
      title: "Track Your Progress...",
      description: "SyncFit provides tools to help you track your fitness progress effectively.",
      image: "https://i.ibb.co.com/d4N0DRG/United-States.jpg", // Replace with the actual image link
      link: "/post/track-your-progress",
    },
    {
      author: "Olivia Davis",
      location: "Germany",
      date: "29 May, 2024",
      title: "Track Your Progress...",
      description: "SyncFit provides tools to help you track your fitness progress effectively.",
      image: "https://i.ibb.co.com/d4N0DRG/United-States.jpg", // Replace with the actual image link
      link: "/post/track-your-progress",
    },
    {
      author: "Olivia Davis",
      location: "Germany",
      date: "29 May, 2024",
      title: "Track Your Progress...",
      description: "SyncFit provides tools to help you track your fitness progress effectively.",
      image: "https://i.ibb.co.com/d4N0DRG/United-States.jpg", // Replace with the actual image link
      link: "/post/track-your-progress",
    },
    {
      author: "Olivia Davis",
      location: "Germany",
      date: "29 May, 2024",
      title: "Track Your Progress...",
      description: "SyncFit provides tools to help you track your fitness progress effectively.",
      image: "https://i.ibb.co.com/d4N0DRG/United-States.jpg", // Replace with the actual image link
      link: "/post/track-your-progress",
    },
    {
      author: "Olivia Davis",
      location: "Germany",
      date: "29 May, 2024",
      title: "Track Your Progress...",
      description: "SyncFit provides tools to help you track your fitness progress effectively.",
      image: "https://i.ibb.co.com/d4N0DRG/United-States.jpg", // Replace with the actual image link
      link: "/post/track-your-progress",
    },
    {
      author: "Olivia Davis",
      location: "Germany",
      date: "29 May, 2024",
      title: "Track Your Progress...",
      description: "SyncFit provides tools to help you track your fitness progress effectively.",
      image: "https://i.ibb.co.com/d4N0DRG/United-States.jpg", // Replace with the actual image link
      link: "/post/track-your-progress",
    },
  ];

  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <SectionTitle title={"Latest Community Posts"} subTitle={"Stay updated with the latest articles and discussions from our community."}></SectionTitle>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.slice(0, 6).map((post, index) => (
            <div key={index} className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Image Section */}
            <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
      
            {/* Content Section */}
            <div className="p-4">
              {/* Author Info */}
              <div className="flex items-center mb-4">
                <img
                  src="https://via.placeholder.com/40" // Replace with author's avatar
                  alt={post.author}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <h4 className="font-bold text-gray-800">{post.author}</h4>
                  <p className="text-sm text-gray-500">{post.location}</p>
                </div>
                <span className="ml-auto text-sm text-gray-500">{post.date}</span>
              </div>
      
              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-800">{post.title}</h3>
      
              {/* Description */}
              <p className="text-sm text-gray-600 mt-2">{post.description}</p>
      
              {/* Read More Link */}
              <a
                href={post.link}
                className="text-teal-500 text-sm font-medium mt-4 inline-block hover:underline"
              >
                Read More
              </a>
            </div>
          </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <a
            href="/blog"
            className="text-white bg-teal-500 px-6 py-2 rounded-md hover:bg-teal-600 transition-colors"
          >
            Explore All Posts
          </a>
        </div>
      </div>
    </div>
  );
};

export default CommunityPost;
