import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { authAPI } from "../services/api";

export default function AdminProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await authAPI.getMyProfile();
        if (response.data.success) {
          setProfile(response.data.data || response.data.user || user);
        } else {
          setProfile(user);
        }
      } catch (err) {
        console.error("Error fetching admin profile:", err);
        setError("Unable to load profile details.");
        setProfile(user);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  if (loading) {
    return (
      <div className="bg-slate-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin inline-block w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-slate-50 min-h-screen flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-3xl shadow-lg border border-red-100 max-w-xl text-center">
          <h2 className="text-xl font-semibold mb-2">Failed to load profile</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-900 via-indigo-700 to-sky-700 p-8 text-white">
            <h1 className="text-3xl font-bold">Admin Profile</h1>
            <p className="mt-2 text-slate-200">Review your account and contact details.</p>
          </div>
          <div className="p-8 space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
                <h2 className="text-sm uppercase tracking-[0.2em] text-slate-500">Name</h2>
                <p className="mt-3 text-lg font-semibold text-slate-900">{profile?.name || "N/A"}</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
                <h2 className="text-sm uppercase tracking-[0.2em] text-slate-500">Email</h2>
                <p className="mt-3 text-lg font-semibold text-slate-900">{profile?.email || "N/A"}</p>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
                <h2 className="text-sm uppercase tracking-[0.2em] text-slate-500">Role</h2>
                <p className="mt-3 text-lg font-semibold text-slate-900">{profile?.role || "N/A"}</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
                <h2 className="text-sm uppercase tracking-[0.2em] text-slate-500">Status</h2>
                <p className="mt-3 text-lg font-semibold text-slate-900">{profile?.status || "N/A"}</p>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
              <h2 className="text-sm uppercase tracking-[0.2em] text-slate-500">About</h2>
              <p className="mt-3 text-base leading-7 text-slate-700">
                {profile?.bio || "No additional details are available for this administrator."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
