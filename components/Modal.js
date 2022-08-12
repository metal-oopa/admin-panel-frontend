import { GrClose } from "react-icons/gr";
import { useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { AiFillCheckCircle } from "react-icons/ai";
import Router from "next/router";

function Modal({ modalOpen, companyList, setCompanyList, setModalOpen }) {
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

  const fileRef = useRef(null);

  const [companyName, setCompanyName] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const company = {
      companyName,
      linkedIn,
      companyLogo,
    };

    const response = await axios({
      method: "post",
      data: {
        title: companyName,
        linkedin: linkedIn,
        image: companyLogo,
      },
      // withCredentials: true,
      url: "https://admin-panel-backend.vercel.app/create-company",
    });

    if (response.status === 201) {
      Router.push(
        "/dashboard/companies/[id]",
        `/dashboard/companies/${response.data._id}`
      );
    }

    setCompanyList((companyList) => [...companyList, response.data]);
    setCompanyName("");
    setLinkedIn("");
    setCompanyLogo(null);
    setModalOpen(false);
  };

  const handleFileChange = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setCompanyLogo(readerEvent.target.result);
    };
  };
  const removeImage = () => {
    setCompanyLogo(null);
  };

  const handleClose = (e) => {
    if (e.target.id === "container") {
      setModalOpen(false);
    }
  };
  return (
    <div
      id="container"
      onClick={handleClose}
      className={`${
        !modalOpen ? "hidden" : "fixed"
      } top-0 left-0 z-50 overflow-auto bg-smoke-light flex w-[100vw] h-[100vh]`}
    >
      <div className="relative bg-white m-auto flex rounded-lg flex-col">
        <div className="bg-[#eff2f6] flex justify-between p-6 rounded-t-lg">
          <p className="text-[0.875rem] leading-5 font-semibold m-0">
            Add Company
          </p>
          <GrClose
            className="w-5 h-5 pt-0 z-50 text-[#808080] cursor-pointer"
            onClick={() => setModalOpen(false)}
          />
        </div>
        <form className="p-6" onSubmit={handleSubmit}>
          <div className="flex w-full items-center">
            <div className="mr-8">
              <p className="text-[12px] font-semibold p-1 mt-1">Company Logo</p>
              <div
                className="h-28 w-28 border-dotted border-2 border-gray-300 bg-gray-100 flex items-center justify-center cursor-pointer"
                onClick={() => fileRef.current.click()}
              >
                {companyLogo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={companyLogo}
                    alt=""
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <span className="text-[2.5rem] text-gray-500">
                    <AiOutlinePlus />
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col space-y-6">
              <div className="w-full">
                <p className="text-[12px] font-semibold p-1 mt-1">
                  Company Name
                </p>
                <input
                  type="text"
                  placeholder="Enter Company Name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="px-3 py-2 placeholder-[#6B7280] text-[#030303] placeholder-opacity-90 relative bg-white rounded text-sm border-[1.5px] focus:outline-none focus:border-[#2dc5a1] focus:border-2  w-full transition duration-200 ease-in"
                />
              </div>
              <div className="flex w-full h-1/4">
                <input
                  type="text"
                  value={linkedIn}
                  onChange={(e) => setLinkedIn(e.target.value)}
                  placeholder="www.linkedin.com/your-profile"
                  className="px-1 py-2 placeholder-[#6B7280] text-[#030303]  placeholder-opacity-90 relative bg-white text-sm border rounded-tr-[3.5px] rounded-br-[3.5px]  focus:outline-none focus:border-[#2dc5a1] focus:border-2  w-full  transition duration-200 ease-in"
                />
              </div>
            </div>
          </div>
          <input type="file" ref={fileRef} hidden onChange={handleFileChange} />
          <div className="float-right ml-[0.75rem] mt-[1.5rem]">
            <button
              onClick={() => {
                notify();
                setTimeout(() => {
                  setModalOpen(false);
                }, 2000);
              }}
              className="ml-[0.9375rem]  outline-none  min-w-[9.0625rem] py-[0.625rem] px-[0.75rem] rounded-[0.3125rem]  font-semibold text-[0.875rem] h-[2.5rem] cursor-pointer text-white bg-[#1a73e8] mb-[20px]  border-none mt-[10px] flex items-center justify-center"
            >
              Save
            </button>
          </div>
        </form>
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
}

export default Modal;
