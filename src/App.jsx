import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import { MainLayout } from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import NotFound from "./pages/NotFound";
import JobPage, { jobLoader } from "./pages/JobPage";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";

/**
 * The main App component that renders the entire application.
 *
 * This component creates a router with the following routes:
 * - `/` renders the `HomePage` component
 * - `/jobs` renders the `JobsPage` component
 * - `/add-job` renders the `AddJobPage` component with an `addJobSubmit` prop
 *   that calls the `addJob` function when called.
 * - `/jobs/:id` renders the `JobPage` component with a route loader that fetches
 *   the job from the API.
 * - `*` renders the `NotFound` component.
 *
 * The `addJob` function makes a POST request to the API to create a new job.
 * The `jobLoader` function is a route loader that fetches a job from the API.
 */
const App = () => {
  /**
   * Makes a POST request to the API to create a new job.
   *
   * @param {Object} newJob The new job to be created.
   * @returns {Promise<void>} A Promise that resolves when the request is complete.
   */
  const addJob = async (newJob) => {
    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJob),
    });

    return;
  };

  /**
   * Makes a DELETE request to the API to delete a job with the given id.
   *
   * @param {number} id The id of the job to delete.
   * @returns {Promise<void>} A Promise that resolves when the request is complete.
   */
  const deleteJob = async (id) => {
    const res = await fetch(`/api/jobs/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  /**
   * Makes a PATCH request to the API to update a job.
   *
   * @param {Object} updatedJob The updated job object.
   * @returns {Promise<void>} A Promise that resolves when the request is complete.
   */
  const editJob = async (updatedJob) => {
    const res = await fetch(`/api/jobs/${updatedJob.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedJob),
    });

    return;
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/add-job" element={<AddJobPage addJobSubmit={addJob} />} />
        <Route
          path="/jobs/:id"
          element={<JobPage deleteJob={deleteJob} />}
          loader={jobLoader}
        />
        <Route
          path="/edit-job/:id"
          element={<EditJobPage editJobSubmit={editJob} />}
          loader={jobLoader}
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
