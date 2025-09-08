"use client"
import { ChangeEvent, useEffect, useState, FormEvent } from "react";
import axios from "axios";
import FormImageUpload from "@/app/components/FormImage";
import FormInput from "@/app/components/FormInput";
import { useCustomRouter } from "@/hooks/useCustomRouter";

interface ProfileData {
  id: string;
  username: string;
  display_name: string;
  profile_picture_url: string | null;
  bio: string | null;
}

interface ApiError {
  [key: string]: string[];
}

const EditProfilePage = () => {
  const router = useCustomRouter()
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<ApiError>({});

  const API_BASE_URL = "http://localhost:8000/api";

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${API_BASE_URL}/profiles/my-profile/`, {
          withCredentials: true,
        });
        setProfileData(response.data.profile);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          if (err.response.status === 401) {
            setError("You are not authenticated. Please log in.");
          } else {
            setError(err.response.data.detail || "Failed to fetch profile data.");
          }
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewImageFile(e.target.files[0]);
    } else {
      setNewImageFile(null);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!profileData) return;

    setIsSubmitting(true);
    setError(null);
    setFormErrors({});

    const formData = new FormData();
    formData.append("display_name", profileData.display_name);
    if (profileData.bio !== null) {
      formData.append("bio", profileData.bio);
    }
    if (newImageFile) {
      formData.append("profile_picture_url", newImageFile);
    }

    try {
      await axios.patch(`${API_BASE_URL}/profiles/${profileData.id}/`, formData, {
        withCredentials: true,
      });

      console.log("Profile updated successfully!");
      router.push(`/profile/${profileData.username}`);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        if (err.response.status === 400) {
          setFormErrors(err.response.data);
        } else if (err.response.data.detail) {
          setError(err.response.data.detail);
        } else {
          setError("Failed to update profile.");
        }
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-900 text-zinc-200">
        <p>Loading profile...</p>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-900 text-zinc-200">
        <p className="text-red-500">{error || "Failed to load profile. Please try again."}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-200 p-8 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-zinc-950 p-8 rounded-xl shadow-lg border border-zinc-800">
        <h1 className="text-3xl font-bold text-center text-zinc-100 mb-8">Edit Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center space-x-6">
            <div className="relative w-36 h-36 rounded-full overflow-hidden border-2 border-zinc-700">
              {newImageFile ? (
                <img
                  src={URL.createObjectURL(newImageFile)}
                  alt="New Profile"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : profileData.profile_picture_url ? (
                <img
                  src={profileData.profile_picture_url}
                  alt="Current Profile"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-400 text-sm">
                  No Image
                </div>
              )}
            </div>
            <div className="flex-1">
              <FormImageUpload
                id="profile_picture_url"
                label="Change Profile Picture"
                file={newImageFile}
                onChange={handleImageChange}
                error={formErrors.profile_picture_url?.[0]}
              />
            </div>
          </div>

          <FormInput
            id="display_name"
            label="Display Name"
            value={profileData.display_name}
            onChange={handleChange}
            placeholder="Enter your display name"
            error={formErrors.display_name?.[0]}
          />

          <div>
            <label htmlFor="bio" className="block text-zinc-400 text-sm font-semibold mb-2">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={profileData.bio || ""}
              onChange={handleChange}
              rows={4}
              placeholder="Tell us a little bit about yourself"
              className={`
                w-full p-3 rounded-lg bg-zinc-800 text-zinc-200 border-2
                focus:outline-none transition-colors duration-200 resize-none
                ${formErrors.bio ? 'border-red-500' : 'border-zinc-700 focus:border-white'}
              `}
            ></textarea>
            {formErrors.bio?.[0] && <p className="text-red-500 text-sm mt-1">{formErrors.bio[0]}</p>}
          </div>

          {error && (
            <div className="bg-red-900/30 border border-red-700 text-red-400 p-4 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`
                px-6 py-3 rounded-lg font-bold transition-all duration-200
                ${isSubmitting
                  ? "bg-zinc-700 text-zinc-400 cursor-not-allowed"
                  : "bg-orange-700 hover:bg-amber-800 text-white"
                }
              `}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;