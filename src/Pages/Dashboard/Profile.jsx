
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useRole from "../../Hooks/useRole";
import { imageUpload } from "../../ImageAPI/utils";
import Spinner from "../../OthersComponent/Spinner";

const Profile = () => {
  const { user, updateUserProfile, loading } = useAuth();
  const [role , isLoading] = useRole()
  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");
  const [preview, setPreview] = useState(photo);


  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = async (event) => {
    event.preventDefault();

    const updatedPhotoURL = photo instanceof File ? await imageUpload(photo) : photo;

    updateUserProfile(name, updatedPhotoURL)
      .then(() => {
        Swal.fire({
          title: "Profile Updated!",
          text: "Your profile details have been updated successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          // Optional: Navigate or reload the page
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          text: error.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  if(loading, isLoading) return <Spinner></Spinner>

  return (
    <div className="min-h-screen flex flex-col items-center py-10">
      <Helmet>
        <title>FitFusion | Profile</title>
      </Helmet>
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-secondary mb-6">
          Manage Your Profile
        </h2>
        <form onSubmit={handleUpdateProfile} className="flex flex-col items-center">
          {/* Profile Picture */}
          <div className="relative mb-6">
            <img
              src={preview}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-primary object-cover"
            />
            <label
              htmlFor="photo"
              className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-2 cursor-pointer hover:bg-secondary"
              title="Change Profile Picture"
            >
              &#x1F4F7;
            </label>
            <input
              type="file"
              id="photo"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </div>

          {/* User Role */}
          <p className="text-sm font-medium mb-4">
            <span className="text-secondary bg-primary px-4 py-1 rounded-lg uppercase">{role}</span>
          </p>

          {/* Name */}
          <div className="w-full mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Email */}
          <div className="w-full mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email (Uneditable)
            </label>
            <input
              type="email"
              id="email"
              value={user?.email || ""}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Last Login */}
          <div className="w-full mb-6">
            <label
              htmlFor="lastLogin"
              className="block text-gray-700 font-medium mb-2"
            >
              Last Login
            </label>
            <input
              type="text"
              id="lastLogin"
              value={user?.metadata?.lastSignInTime || "Unknown"}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-primary text-white rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
