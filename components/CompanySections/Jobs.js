import React, { useRef, useState, useEffect } from "react";
import AddJobModal from "../Modals/AddJobModal";
import axios from "axios";

function Jobs({ id, companyDetails }) {
  const [showAddJobModal, setShowAddJobModal] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [curItem, setCurItem] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [index, setIndex] = useState();

  useEffect(() => {
    if (
      companyDetails &&
      companyDetails.jobs &&
      companyDetails.jobs.length > 0
    ) {
      setJobs(companyDetails.jobs);
      setIndex(companyDetails.jobs.length);
      // console.log(companyDetails.jobs);
    }
  }, [companyDetails]);

  const handleJobClick = (job, index) => {
    setCurItem(job);
    setIsEdit(true);
    setIndex(index);
    setShowAddJobModal(true);
    setIsEdit(true);
  };

  const handleSaveJobClick = () => {
    console.log(curItem);
    setCurItem({
      title: "",
      jobType: "",
      description: "",
      responsibilities: "",
    });
    setIsEdit(false);
    setShowAddJobModal(true);
  };

  return (
    <div className="px-20">
      <button
        className="save-button float-right m-[20px] "
        onClick={handleSaveJobClick}
      >
        Add Job
      </button>
      <AddJobModal
        showAddJobModal={showAddJobModal}
        setShowAddJobModal={setShowAddJobModal}
        jobs={jobs}
        setJobs={setJobs}
        curItem={curItem}
        isEdit={isEdit}
        index={index}
        companyDetails={companyDetails}
      />

      <div className="w-[80%] flex flex-row-rev flex-wrap ">
        {jobs.map((job, index) => {
          return (
            <div
              key={index}
              className="cursor-pointer m-[15px]"
              onClick={() => handleJobClick(job, index)}
            >
              <h1>{job.title}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Jobs;
