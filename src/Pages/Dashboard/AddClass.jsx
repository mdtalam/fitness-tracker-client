import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { imageUpload } from "../../ImageAPI/utils";

const AddClass = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [previewImage, setPreviewImage] = useState(null); // State to hold the preview image

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file)); // Generate preview URL
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const className = form.className.value;
    const details = form.details.value;
    const additionalInfo = form.additionalInfo.value;
    const image = form.image.files[0];
    const imageURL = await imageUpload(image);
  
    // User Info
    const adminUser = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
    };
  
    // Create class data object
    const classData = {
      className,
      details,
      additionalInfo,
      image: imageURL,
      adminUser,
    };
  
    try {
      await axiosSecure.post('/classes', classData);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Class Added Successfully!",
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
    <div className="p-6 bg-gray-100">
      <Helmet>
        <title>Dashboard | Add Class</title>
      </Helmet>
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Add New Class
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Class Name */}
          <div>
            <label
              htmlFor="className"
              className="block text-sm font-medium text-gray-700"
            >
              Class Name
            </label>
            <input
              type="text"
              id="className"
              name="className"
              required
              className="mt-1 block w-full p-2 rounded-md border-gray-400 shadow-sm focus:border-primary focus:ring focus:ring-primary"
              placeholder="Enter class name"
            />
          </div>

          {/* Image */}
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Class Image
            </label>
            <div className="flex items-center gap-4">
              {/* Image Input */}
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange} // Call the handler here
                required
                className="mt-1 block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-primary"
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
          </div>

          {/* Details */}
          <div>
            <label
              htmlFor="details"
              className="block text-sm font-medium text-gray-700"
            >
              Details
            </label>
            <textarea
              id="details"
              name="details"
              required
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary"
              placeholder="Enter details about the class"
              rows="4"
            ></textarea>
          </div>

          {/* Additional Info */}
          <div>
            <label
              htmlFor="additionalInfo"
              className="block text-sm font-medium text-gray-700"
            >
              Additional Info (Optional)
            </label>
            <input
              type="text"
              id="additionalInfo"
              name="additionalInfo"
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary"
              placeholder="Enter additional information"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Add Class
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddClass;
