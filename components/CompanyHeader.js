import { AiFillCheckCircle, AiOutlinePlus } from "react-icons/ai";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Router from "next/router";

function CompanyHeader({ id, companyDetails }) {
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

  const notify = () => {
    toast(message, {
      position: "bottom-center",
      style: {
        width: "fit-content",
        borderRadius: "9999px",
        fontFamily: "Inter",
        backgroundColor: "black",
      },
    });
  };
  const fileRef = useRef(null);

  // const [companyDetails, setCompanyDetails] = useState();
  const [companyName, setCompanyName] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");
  const [companyTagline, setCompanyTagline] = useState("");
  const [featured, setFeatured] = useState(false);

  // useEffect(async () => {
  //   if (id) {
  //     await axios({
  //       method: "get",
  //       // withCredentials: true,
  //       url: `https://hirable-backend-original.vercel.app/get-companies/?_id=${id}`,
  //     }).then((data) => {
  //       setCompanyDetails(data.data);
  //       setCompanyName(data.data.title);
  //       setLinkedin(data.data.linkedin);
  //       setCompanyLogo(data.data.image);
  //     });
  //   }
  // }, []);

  useEffect(() => {
    if (companyDetails) {
      setCompanyName(companyDetails.title);
      setLinkedin(companyDetails.linkedin);
      setCompanyLogo(companyDetails.image);
      setCompanyTagline(companyDetails.tagline);
      setFeatured(companyDetails.featured);
    }
  }, [companyDetails]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const company = {
    //   companyName,
    //   linkedin,
    //   companyLogo,
    // };

    await axios({
      method: "put",
      data: {
        title: companyName,
        linkedin: linkedin,
        image: companyLogo,
        tagline: companyTagline,
        featured: featured,
        subtitle: companyDetails.subtitle,
        description: companyDetails.description,
        link: companyDetails.link,
        jobs: companyDetails.jobs,
        locations: companyDetails.locations,
        tags: companyDetails.tags,
        keyPeople: companyDetails.keyPeople,
        teamSize: companyDetails.teamSize,
        facebook: companyDetails.facebook,
        instagram: companyDetails.instagram,
        numberOfOpenings: companyDetails.numberOfOpenings,
        image: companyDetails.image,
      },
      // withCredentials: true,
      url: `https://hirable-backend-original.vercel.app/update-company/?_id=${id}`,
    });

    // setCompanyList((companyList) => [...companyList, company]);
    // setCompanyName("");
    // setLinkedin("");
    // setCompanyLogo(null);
    // setModalOpen(false);
  };

  const handleDelete = async (e) => {
    notify();

    await axios({
      method: "delete",
      // withCredentials: true,
      url: `https://hirable-backend-original.vercel.app/delete-company/${id}`,
    });

    Router.push("/dashboard/companies");
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
  return (
    <div className="w-full bg-white flex flex-col justify-center px-20 pt-10">
      <form className="p-6" onSubmit={handleSubmit}>
        <div className="flex w-full items-center">
          <div className="mr-8">
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
          <div className="flex flex-col space-y-6 flex-1">
            <div className="w-full">
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
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                placeholder="www.linkedin.com/your-profile"
                className="px-1 py-2 placeholder-[#6B7280] text-[#030303]  placeholder-opacity-90 relative bg-white text-sm border rounded-tr-[3.5px] rounded-br-[3.5px]  focus:outline-none focus:border-[#2dc5a1] focus:border-2  w-full  transition duration-200 ease-in"
              />
            </div>
            <div className="flex w-full h-1/4">
              <input
                type="text"
                value={companyTagline}
                onChange={(e) => setCompanyTagline(e.target.value)}
                placeholder="Enter your Company's Tagline"
                className="px-1 py-2 placeholder-[#6B7280] text-[#030303]  placeholder-opacity-90 relative bg-white text-sm border rounded-tr-[3.5px] rounded-br-[3.5px]  focus:outline-none focus:border-[#2dc5a1] focus:border-2  w-full  transition duration-200 ease-in"
              />
            </div>
            <div className="flex w-full h-1/4">
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
          </div>
        </div>
        <input type="file" ref={fileRef} hidden onChange={handleFileChange} />
        <div className="flex justify-between w-full mt-[1.5rem]">
          <div className="flex items-center  justify-between">
            <button
              className="save-button mr-8"
              onClick={() => fileRef.current.click()}
            >
              Edit
            </button>
            <button
              className="delete-button"
              // onClick={() => fileRef.current.click()}
              onClick={() => handleDelete()}
            >
              Delete
            </button>
          </div>
          <button
            onClick={() => notify()}
            className="save-button"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
      <Toaster position="bottom-center" />
    </div>
  );
}

export default CompanyHeader;
