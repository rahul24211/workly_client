import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { freelancerAPI } from "../services/api";
import {
  Search,
  MapPin,
  DollarSign,
  Clock,
  Award,
  ChevronRight,
  Loader,
  Heart,
} from "lucide-react";
import { toast } from "react-toastify";

export default function BrowseJobs() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [budgetFilter, setBudgetFilter] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [deliveryDays, setDeliveryDays] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [submittingProposal, setSubmittingProposal] = useState(false);
  const [savedJobs, setSavedJobs] = useState(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
    fetchSavedJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await freelancerAPI.getJobs();
      const jobsData = response.data.jobs || response.data.data || [];
      setJobs(jobsData);
      setFilteredJobs(jobsData);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  const fetchSavedJobs = async () => {
    try {
      const response = await freelancerAPI.getSavedJobs();
      const jobIds = response.data.jobs?.map(item => item.jobId) || [];
      setSavedJobs(new Set(jobIds));
    } catch (error) {
      console.error("Error fetching saved jobs:", error);
    }
  };

  const handleSaveJob = async (jobId, e) => {
    e.stopPropagation();
    try {
      if (savedJobs.has(jobId)) {
        await freelancerAPI.unsaveJob(jobId);
        const newSet = new Set(savedJobs);
        newSet.delete(jobId);
        setSavedJobs(newSet);
        toast.success("Job unsaved");
      } else {
        await freelancerAPI.saveJob(jobId);
        setSavedJobs(prev => new Set([...prev, jobId]));
        toast.success("Job saved successfully");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save job");
    }
  };

  const isSaved = (jobId) => savedJobs.has(jobId);

  useEffect(() => {
    let filtered = jobs;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter) {
      filtered = filtered.filter((job) => job.category === categoryFilter);
    }

    // Budget filter
    if (budgetFilter === "low") {
      filtered = filtered.filter((job) => job.budget < 5000);
    } else if (budgetFilter === "mid") {
      filtered = filtered.filter((job) => job.budget >= 5000 && job.budget < 20000);
    } else if (budgetFilter === "high") {
      filtered = filtered.filter((job) => job.budget >= 20000);
    }

    setFilteredJobs(filtered);
  }, [searchTerm, categoryFilter, budgetFilter, jobs]);

  const handleSubmitProposal = async () => {
    if (!bidAmount || !coverLetter || !deliveryDays) {
      toast.error("Please fill in all fields");
      return;
    }

    const days = parseInt(deliveryDays);
    if (isNaN(days) || days < 1 || days > 365) {
      toast.error("Delivery days must be between 1 and 365");
      return;
    }

    try {
      setSubmittingProposal(true);
      await freelancerAPI.createProposal({
        jobId: selectedJob.id,
        bidAmount: parseFloat(bidAmount),
        coverLetter,
        deliveryDays: days,
      });
      toast.success("Proposal submitted successfully!");
      setSelectedJob(null);
      setBidAmount("");
      setCoverLetter("");
      setDeliveryDays("");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to submit proposal");
    } finally {
      setSubmittingProposal(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-indigo-600 mx-auto" />
          <p className="mt-4 text-slate-600">Loading available jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">Available Jobs</h1>
          <p className="text-slate-600 mt-2">
            {filteredJobs.length} jobs matching your search
          </p>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">All Categories</option>
              <option value="Web Development">Web Development</option>
              <option value="Mobile Development">Mobile Development</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Graphic Design">Graphic Design</option>
              <option value="Content Writing">Content Writing</option>
            </select>

            {/* Budget Filter */}
            <select
              value={budgetFilter}
              onChange={(e) => setBudgetFilter(e.target.value)}
              className="px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">All Budgets</option>
              <option value="low">Under ₹5,000</option>
              <option value="mid">₹5,000 - ₹20,000</option>
              <option value="high">Above ₹20,000</option>
            </select>

            {/* Reset Button */}
            <button
              onClick={() => {
                setSearchTerm("");
                setCategoryFilter("");
                setBudgetFilter("");
              }}
              className="px-4 py-3 bg-slate-200 hover:bg-slate-300 rounded-xl font-medium transition"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Jobs List */}
        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <p className="text-xl text-slate-500">
              No jobs found matching your criteria
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredJobs.map((job) => (
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

                  {/* Action Button */}
                  <div className="flex flex-col gap-3 justify-between">
                    <button
                      onClick={() => setSelectedJob(job)}
                      className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition flex items-center gap-2"
                    >
                      Submit Proposal <ChevronRight size={18} />
                    </button>
                    <button
                      onClick={(e) => handleSaveJob(job.id, e)}
                      className="px-6 py-3 border border-slate-300 hover:bg-slate-50 rounded-xl font-semibold transition flex items-center justify-center gap-2"
                      title={isSaved(job.id) ? "Unsave job" : "Save job"}
                    >
                      <Heart
                        size={18}
                        fill={isSaved(job.id) ? "currentColor" : "none"}
                        color={isSaved(job.id) ? "#ef4444" : "#9ca3af"}
                      />
                      {isSaved(job.id) ? "Saved" : "Save Job"}
                    </button>
                    <button
                      onClick={() => navigate(`/job/${job.id}`)}
                      className="px-6 py-3 border border-slate-300 hover:bg-slate-50 rounded-xl font-semibold transition"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Proposal Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
              <h2 className="text-2xl font-bold">Submit Proposal</h2>
              <p className="text-indigo-100 mt-1">{selectedJob.title}</p>
            </div>

            <div className="p-8 space-y-6">
              {/* Job Summary */}
              <div className="bg-slate-50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Job Details</h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-slate-600">Budget</p>
                    <p className="font-bold">
                      ₹{selectedJob.budget?.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-600">Duration</p>
                    <p className="font-bold">{selectedJob.duration}</p>
                  </div>
                  <div>
                    <p className="text-slate-600">Category</p>
                    <p className="font-bold">{selectedJob.category}</p>
                  </div>
                </div>
              </div>

              {/* Bid Amount */}
              <div>
                <label className="block font-semibold mb-2">Your Bid Amount</label>
                <div className="relative">
                  <DollarSign
                    className="absolute left-3 top-3.5 text-gray-400"
                    size={20}
                  />
                  <input
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    placeholder="Enter your bid amount"
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Delivery Days */}
              <div>
                <label className="block font-semibold mb-2">Delivery Days *</label>
                <div className="relative">
                  <Clock
                    className="absolute left-3 top-3.5 text-gray-400"
                    size={20}
                  />
                  <input
                    type="number"
                    value={deliveryDays}
                    onChange={(e) => setDeliveryDays(e.target.value)}
                    placeholder="Enter delivery days (1-365)"
                    min="1"
                    max="365"
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <p className="text-sm text-slate-500 mt-1">Specify how many days you need to complete this project</p>
              </div>

              {/* Cover Letter */}
              <div>
                <label className="block font-semibold mb-2">Cover Letter</label>
                <textarea
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  placeholder="Tell the client why you're a good fit for this project..."
                  rows={6}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedJob(null)}
                  className="flex-1 px-6 py-3 border border-slate-300 rounded-xl font-semibold hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitProposal}
                  disabled={submittingProposal}
                  className="flex-1 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-xl font-semibold transition"
                >
                  {submittingProposal ? "Submitting..." : "Submit Proposal"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
