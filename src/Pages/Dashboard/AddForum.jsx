import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { imageUpload } from "../../ImageAPI/utils";

const AddForum = () => {
  const [previewImage, setPreviewImage] = useState(null);
  const [userRole, setUserRole] = useState(""); // State to store the role
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch user role
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axiosSecure.get(`/users/role/${user?.email}`);
        setUserRole(response.data.role || ""); // Set the role from the response
      } catch (error) {
        console.error("Failed to fetch user role:", error);
      }
    };

    if (user?.email) {
      fetchUserRole();
    }
  }, [user?.email, axiosSecure]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file)); // Generate preview URL
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const forumTitle = form.forumTitle.value;
    const classDetails = form.classDetails.value;
    const image = form.image.files[0];
    const imageURL = await imageUpload(image);

    // Save User Info
    const userInfo = {
      name: user?.displayName,
      role: userRole, // Use the fetched role
      email: user?.email,
    };

    const forumData = {
      forumTitle,
      classDetails,
      image: imageURL,
      userInfo,
    };

    try {
      await axiosSecure.post("/forum", forumData);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Forum Added Successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      form.reset(); // Reset the form fields
      setPreviewImage(null); // Clear the preview image
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">ADD NEW FORUM</h2>
        <p className="text-gray-500 mb-8">In here you can add new forum</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Forum Title */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="forumTitle"
            >
              Forum Title
            </label>
            <input
              type="text"
              id="forumTitle"
              name="forumTitle"
              placeholder="Forum Title"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Banner Image */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="bannerImage"
            >
              Banner Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-gray-500 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none"
            />
            {/* Image Preview */}
            {previewImage && (
              <img
                src={previewImage}
                alt="Class Preview"
                className="w-24 h-24 object-cover rounded-md border border-gray-300"
              />
            )}
          </div>

          {/* Class Details */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="classDetails"
            >
              Class Details
            </label>
            <textarea
              id="classDetails"
              name="classDetails"
              placeholder="Description in details"
              rows="4"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              Make Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddForum;
