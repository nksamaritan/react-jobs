import React from "react";
import { useState, useEffect } from "react";
import JobListing from "./JobListing";
import Spinner from "./Spinner";
/**
 * A component that displays a list of jobs.
 *
 * The component fetches the jobs from the API and displays them in a grid.
 * If `isHome` is true, it fetches only 3 jobs.
 * It uses the `Spinner` component to display a loading animation
 * while the data is being fetched.
 *
 * @param {Object} props The component's props
 * @param {boolean} [props.isHome=false] Whether to fetch only 3 jobs
 * @returns {ReactElement}
 */
const JobListings = ({ isHome = false }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /**
     * Fetches jobs from the API and updates the state of the component.
     * If `isHome` is true, it fetches only 3 jobs.
     * It also sets the loading state to false when the data is fetched.
     */
    const fetchJobs = async () => {
      const queryString = isHome ? "?_limit=3" : "";
      try {
        const response = await fetch(`/api/jobs${queryString}`);
        const data = await response.json();
        setJobs(data);
      } catch (e) {
        console.log("Error in fetchin data", e);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);
  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHome ? "Recent Jobs" : "All Jobs"}
        </h2>
        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobListing job={job} key={job.id} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default JobListings;
