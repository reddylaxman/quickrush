import React, { useState, useEffect } from "react";
import AvatarEdit from "react-avatar-edit";
import { useNavigate } from "react-router-dom";
import { FaCamera } from "react-icons/fa";

const UpdateProfile = ({ onClose }) => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null); // Original image
  const [imgBase64, setImgBase64] = useState(null); // Base64 of cropped image
  const [doctor, setDoctor] = useState(null); // Doctor details
  const [loading, setLoading] = useState(false);
  const [showAvatarEdit, setShowAvatarEdit] = useState(false);

  const userRole = localStorage.getItem("role");
  const apiUrl =
    userRole === "doctor"
      ? `${process.env.REACT_APP_VERCEL_URL}/api/doctors/update-avatar`
      : `${process.env.REACT_APP_VERCEL_URL}/api/users/update-avatar`;

  useEffect(() => {
    const fetchUserDetails = async () => {
      const Id = localStorage.getItem("id");
      try {
        const response = await fetch(
          `${process.env.REACT_APP_VERCEL_URL}/api/${userRole}s/${Id}`
        );
        const data = await response.json();
        setDoctor(data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [userRole]);

  const handleImageCrop = (preview) => {
    setImgBase64(preview);
  };

  const handleImageClose = () => {
    setImage(null);
    setImgBase64(null);
    setShowAvatarEdit(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setShowAvatarEdit(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const Id = localStorage.getItem("id");
    const formData = {
      Id,
      img: imgBase64,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Profile updated successfully");
        onClose();
        navigate("/");
        setTimeout(() => {
          window.location.reload(false);
        }, 1000);
      } else {
        const result = await response.json();
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleCameraClick = () => {
    document.getElementById("avatarEditInput").click();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <h2 className="text-lg font-semibold mb-4">Update Profile</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4 flex flex-col items-center">
            <div className="relative mb-4">
              <div
                className="w-32 h-32 rounded-full overflow-hidden flex items-center justify-center bg-gray-200"
                style={{
                  backgroundImage: `url(${imgBase64 || doctor?.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {!imgBase64 && !doctor?.img && (
                  <FaCamera className="text-gray-500 absolute text-4xl" />
                )}
                <FaCamera
                  className="text-white absolute bottom-2 right-2 text-2xl md:text-2xl lg:text-3xl bg-black bg-opacity-50 rounded-full p-1 cursor-pointer"
                  onClick={handleCameraClick}
                />
              </div>
              <input
                id="avatarEditInput"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              {showAvatarEdit && (
                <div id="avatarEdit">
                  <AvatarEdit
                    width={250}
                    height={250}
                    onCrop={handleImageCrop}
                    onClose={handleImageClose}
                    src={image}
                  />
                </div>
              )}
            </div>
            <div className="text-center mb-4">
              <p className="text-gray-700 font-semibold text-lg">
                {doctor?.fullname || "Full Name"}
              </p>
            </div>
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className={`bg-blue-500 text-white font-bold py-2 px-4 rounded ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Profile Pic"}
            </button>
            <button
              type="button"
              className="ml-4 bg-gray-500 text-white font-bold py-2 px-4 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
