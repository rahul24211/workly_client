import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { freelancerAPI } from "../services/api";
import {
  DollarSign,
  Clock,
  Award,
  Heart,
  ChevronRight,
  Loader,
  Bookmark,
} from "lucide-react";
import { toast } from "react-toastify";

export default function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSavedJobs();
  }, []);

const fetchSavedJobs = async () => {
  try {
    setLoading(true);

    const response = await freelancerAPI.getSavedJobs();

    console.log("Saved Jobs Response:", response.data);

    const jobsData =
      response.data.jobs?.map((item) => ({
        ...item.Job,
        savedJobId: item.id,
        savedAt: item.createdAt,
      })) || [];

    setSavedJobs(jobsData);

    console.log("Mapped Jobs:", jobsData);
  } catch (error) {
    console.error(error);
    toast.error(
      error.response?.data?.message || "Failed to load saved jobs"
    );
  } finally {
    setLoading(false);
  }
};


  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-indigo-600 mx-auto" />
          <p className="mt-4 text-slate-600">Loading your saved jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">Saved Jobs</h1>
          <p className="text-slate-600 mt-2">
            {savedJobs.length} jobs saved for later
          </p>
        </div>

        {/* Jobs List */}
        {savedJobs.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <Bookmark className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-xl text-slate-500">No saved jobs yet</p>
            <p className="text-slate-600 mt-2">
              Browse jobs and save your favorites for later
            </p>
            <button
              onClick={() => navigate("/browse-jobs")}
              className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition"
            >
              Browse Jobs
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {savedJobs.map((savedJob) => {
              const job = savedJob.job || savedJob;
              return (
                <div
                  key={job.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6 cursor-pointer"
                >
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h2 className="text-xl font-bold text-slate-900">
                            {job.title}
                          </h2>
                          <p className="text-slate-600 mt-2 line-clamp-2">
                            {job.description}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
                            job.status === "OPEN"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {job.status || "OPEN"}
                        </span>
                      </div>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        {job.skills?.slice(0, 4).map((skill, idx) => (
                          <span
                            key={idx}
                            className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                        {job.skills?.length > 4 && (
                          <span className="text-slate-500 text-sm">
                            +{job.skills.length - 4} more
                          </span>
                        )}
                      </div>

                      {/* Meta Info */}
                      <div className="flex flex-wrap gap-6 mt-4 text-slate-600 text-sm">
                        <div className="flex items-center gap-2">
                          <DollarSign size={16} />
                          <span>₹{job.budget?.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={16} />
                          <span>{job.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Award size={16} />
                          <span>{job.experienceLevel}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3 justify-between">
                      <button
                        onClick={() => navigate(`/job/${job.id}`)}
                        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition flex items-center justify-center gap-2"
                      >
                        Submit Proposal <ChevronRight size={18} />
                      </button>
                      <button
                        onClick={() => navigate("/browse-jobs")}
                        className="px-6 py-3 border border-slate-300 hover:bg-slate-50 rounded-xl font-semibold transition"
                      >
                        View All Jobs
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
