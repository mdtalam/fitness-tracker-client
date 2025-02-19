import React from "react";
import { Helmet } from "react-helmet-async";
import useAuth from "../../Hooks/useAuth";
import useRole from "../../Hooks/useRole";
import Spinner from "../../OthersComponent/Spinner";

const UserProfile = () => {
  const { user, loading } = useAuth();
  const [role, isLoading] = useRole();

  if (loading || isLoading) return <Spinner />;

  return (
    <div className="min-h-screen flex flex-col items-center py-10 mt-[74px]">
      <Helmet>
        <title>FitFusion | Profile</title>
      </Helmet>
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">
          Your Profile
        </h2>
        <div className="flex flex-col items-center">
          {/* Profile Picture */}
          <div className="mb-6">
            <img
              src={user?.photoURL || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-primary object-cover"
            />
          </div>

          {/* User Information */}
          <div className="text-center">
            <h3 className="text-2xl capitalize font-semibold text-gray-800 mb-2">
              {user?.displayName || "User Name"}
            </h3>
            <p className="text-sm text-secondary bg-primary px-4 py-1 rounded-lg uppercase inline-block">
              {role || "Role"}
            </p>
          </div>

          {/* Email */}
          <div className="mt-4">
            <h4 className="text-lg font-medium text-gray-700">Email:</h4>
            <p className="text-gray-600">{user?.email || "Not Available"}</p>
          </div>

          {/* Last Login */}
          <div className="mt-4">
            <h4 className="text-lg font-medium text-gray-700">Last Login:</h4>
            <p className="text-gray-600">
              {user?.metadata?.lastSignInTime || "Unknown"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
