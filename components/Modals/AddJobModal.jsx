import { Editor } from "draft-js";
import React, { useRef, useState, useEffect } from "react";
import RichEditor from "../General/Editor";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { AiFillCheckCircle } from "react-icons/ai";
import Router from "next/router";

function AddJobModal({
  showAddJobModal,
  setShowAddJobModal,
  jobs,
  setJobs,
  curItem,
  setCurItem,
  isEdit,
  setIsEdit,
  index,
  companyDetails,
}) {
  const [jobtitle, setjobtitle] = useState("");
  const [featured, setFeatured] = useState(false);
  const [jobType, setjobType] = useState([
    { name: "Fulltime", selected: false },
    { name: "Internship", selected: false },
  ]);
  const [autocomplete, setAutocomplete] = useState({
    disabled: true,
    data: [],
  });
  const [description, setDescription] = useState("");
  const handleDescriptionChange = (htmlContent) => {
    setDescription(htmlContent);
  };
  const [inputValue, setInputValue] = useState("");

  // load company details
  useEffect(() => {
    if (curItem) {
      setjobtitle(curItem.jobtitle);
      setFeatured(curItem.featured);
      setDescription(curItem.description);

      if (curItem.type?.length > 0) {
        setjobType(curItem.type);
      }
    }
  }, [companyDetails, curItem]);

  const handleInputValueChange = (e) => {
    setInputValue(e.target.value);
    if (e.target.value.trim() === "")
      setAutocomplete({ disabled: true, data: [] });
    else {
      const autocompleteData = [];
      const regex = new RegExp(e.target.value, "i");

      jobType.forEach((job) => {
        if (regex.test(job.name)) autocompleteData.push(job.name);
      });

      setAutocomplete({
        disabled: false,
        data: [e.target.value, ...autocompleteData],
      });
    }
  };

  const updatejobType = (jobName) => {
    const newData = jobType.map((job) => {
      if (job.name === jobName) job.selected = !job.selected;
      if (job.selected === true) setjobType(job.name);

      return job;
    });

    setInputValue("");
    setAutocomplete({
      disabled: true,
      data: [],
    });

    setjobType(newData);
  };

  const handleSaveJobClick = async () => {

    // if curItem is null, then add new job
    if (!curItem || !isEdit) {

      const newJob = {
        jobtitle: jobtitle,
        type: jobType,
        description: description,
        featured: featured,
        companyId: companyDetails._id,
      };

      jobs = jobs === undefined ? [] : jobs;
      jobs.push(newJob);
      setJobs(jobs);

      // add axios call to update company details
      const updatedCompanyDetails = await axios({
        method: "POST",
        data: newJob,
        // withCredentials: true,
        url: `https://hirable-backend-original.vercel.app/create-job`,
      });

      setFeatured(false);
      setShowAddJobModal(0);

    } else {

      // if curItem is not null, then update job
      const updatedJob = {
        jobtitle: jobtitle,
        type: jobType,
        description: description,
        featured: featured,
        companyId: companyDetails._id,
        _id: curItem._id,
      };

      jobs.map((job, index) => {
        if (job._id === curItem._id) {
          job.jobtitle = jobtitle;
          job.type = jobType;
          job.description = description;
          job.featured = featured;
          job.companyId = companyDetails._id;
        }
        return job;
      });
      setJobs(jobs);
      setShowAddJobModal(0);

      // add axios call to update company details
      await axios({
        method: "PUT",
        data: updatedJob,
        // withCredentials: true,
        url: `https://hirable-backend-original.vercel.app/update-job`,
      });
    }

  };
  const handleClose = (e) => {
    if (e.target.id === "container") {
      setShowAddJobModal(false);
    }
  };

  // * Working correctly
  const handleDeleteJobClick = async () => {
    jobs.splice(index, 1);
    setJobs(jobs);
    setCurItem(null);
    setShowAddJobModal(0);

    await axios({
      method: "DELETE",
      data: {
        _id: curItem._id,
      },
      // withCredentials: true,
      url: `https://hirable-backend-original.vercel.app/delete-job`,
    });
  }

  const message = () => {
    return (
      <div className="flex items-center justify-betwen">
        <div className="text-white">
          <AiFillCheckCircle />
        </div>
        <div className=" ml-2 font-inter text-white text-[14px] ">
          Details saved successfully!
        </div>
      </div>
    );
  };

  const notify = () =>
    toast(message, {
      position: "bottom-center",
      style: {
        width: "fit-content",
        borderRadius: "9999px",
        fontFamily: "Inter",
        backgroundColor: "black",
      },
    });
  return (
    <div>
      {showAddJobModal ? (
        <>
          <div
            id="container"
            onClick={handleClose}
            className="bg-black bg-opacity-70 w-full h-full fixed z-50 inset-0 flex items-center justify-center edit-overlay"
          >
            <div className="relative max-h-[784px] flex-col h-[94%] rounded-lg w-[37.5rem] overflow-y-auto bg-white z-10 text-black">
              <div className="top-0 sticky z-50 flex items-center justify-between p-5 bg-[#eff2f6] py-[9px] px-6 rounded-t-lg max-h-[60px] rounded-b-sm my-auto h-[200px]">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  aria-label="Close modal"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute top-5 right-5 w-[32px] h-[32px] pt-0 z-50 text-[#808080] cursor-pointer"
                  onClick={() => setShowAddJobModal(false)}
                >
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
                <h3 className="text-[0.875rem] leading-5 font-semibold m-0">
                  {isEdit ? "Edit Job" : "Add Job"}
                </h3>
              </div>

              <div className="px-10 w-full  mt-[10px]">
                <div className="w-full mt-[15px]">
                  <p className="text-[15px] font-semibold text-[#201e27]">
                    Job Title
                  </p>
                  <input
                    type="text"
                    defaultValue={curItem.jobtitle}
                    onChange={(e) => setjobtitle(e.target.value)}
                    placeholder="Job jobtitle"
                    className="appearance-none px-3 py-2 placeholder-[#6B7280] text-[#030303]  placeholder-opacity-90 relative w-full bg-white rounded text-sm border-[1.5px]  focus:outline-none focus:border-[#2dc5a1] focus:border-2 transition duration-200  ease-in mt-1 bg-transparent"
                  />
                </div>

                <div className="flex w-full h-1/4 mt-4">
                  <input
                    type="checkbox"
                    name="isfeatured"
                    id="isfeatured"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                  />
                  <label className="font-inter text-sm ml-2" htmlFor="">
                    Featured
                  </label>
                </div>

                <div className="w-full mt-[25px]">
                  <p className="text-[15px] font-semibold text-[#201e27]">
                    Type
                  </p>

                  <div
                    className={`${autocomplete.disabled ? "hidden" : ""
                      } ml-[0.5rem] w-[90%] absolute z-10 border rounded-md  py-1 bg-white
                        max-h-60 overflow-y-scroll`}
                  >
                    {autocomplete.data.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="px-3  h-[2rem] flex items-center cursor-pointer 
                            font-medium text-sm hover:bg-gray-100"
                          onClick={() => updatejobType(item)}
                        >
                          {item}
                        </div>
                      );
                    })}
                  </div>

                  <div className="w-full ml-[-10px]">
                    {jobType?.map((job, index) => {
                      return (
                        <span
                          key={index}
                          className="preferred_roles"
                          style={{
                            background: job.selected ? "#61a0ff" : "",
                            color: job.selected ? "#fff" : "",
                          }}
                          onClick={() => updatejobType(job.name)}
                        >
                          {job.name}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <div className="mt-[25px]">
                  <p className="text-[15px] mb-[5px] font-semibold text-[#201e27]">
                    Description
                  </p>
                  <RichEditor
                    htmlContent={description}
                    handleEditorChange={handleDescriptionChange}
                    curItem={curItem}
                    purpose="jobDescription"
                  />
                </div>
              </div>
              <hr />
              <button
                className="save-button float-right m-[20px] py-[10px] "
                onClick={() => {
                  notify();
                  handleSaveJobClick();
                }}
              >
                Save
              </button>

              {isEdit && <button
                className="delete-button float-left m-[20px] py-[10px] "
                onClick={() => {
                  notify();
                  handleDeleteJobClick();
                }} >Delete</button>}
            </div>
            <Toaster />
          </div>
        </>
      ) : null}
    </div>
  );
}

export default AddJobModal;


// if (curItem._id && isEdit) {
//       // update job
//       companyDetails.jobs.map((job, index) => {
//         if (job._id === curItem._id) {
//           job.jobtitle = jobtitle;
//           job.jobType = jobType;
//           job.description = description;
//           job.featured = featured;
//         }
//         return job;
//       });

//       // add axios call to update company details
//       const updatedCompanyDetails = await axios({
//         method: "PUT",
//         data: companyDetails,
//         // withCredentials: true,
//         url: `https://hirable-backend-original.vercel.app/update-company/?_id=${companyDetails._id}`,
//       });

//       // update jobs
//       setJobs(updatedCompanyDetails.data.jobs);
//       setShowAddJobModal(0);
//       setIsEdit(false);
//       return 0;
//     }
//     // add job
//     const newJob = {
//       jobtitle: jobtitle,
//       jobType: jobType,
//       description: description,
//       featured: featured
//     };

//     companyDetails.jobs = companyDetails.jobs === undefined ? [] : companyDetails.jobs;
//     companyDetails.jobs.push(newJob);

//     // add axios call to update company details
//     const updatedCompanyDetails = await axios({
//       method: "put",
//       data: companyDetails,
//       // withCredentials: true,
//       url: `https://hirable-backend-original.vercel.app/update-company/?_id=${companyDetails._id}`,
//     });

//     setJobs(updatedCompanyDetails.data.jobs);
//     setShowAddJobModal(0);
//     setIsEdit(false);