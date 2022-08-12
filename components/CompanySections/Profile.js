import { useRef, useState, useEffect } from "react";
import RichEditor from "../General/Editor";
import PrefferedLocation from "./PrefferedLocation";
import Tags from "./Tags";
import TeamSize from "./TeamSize";
import axios from "axios";

import toast, { Toaster } from "react-hot-toast";
import { AiFillCheckCircle, AiOutlinePlus } from "react-icons/ai";

function Profile({ id, companyDetails }) {
  // const [companyDetails, setCompanyDetails] = useState();
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [website, setWebsite] = useState("");
  const [instagram, setInstagram] = useState("");
  const [openings, setOpenings] = useState("");
  const [location, setLocation] = useState();
  const [tags, setTags] = useState();
  const [teamSize, setTeamSize] = useState("");
  const [aboutCompany, setAboutCompany] = useState("");
  const [companyFunding, setCompanyFunding] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const handleEditorChange = (htmlContent) => {
    setCompanyDescription(htmlContent);
  };

  useEffect(() => {
    if (companyDetails) {
      console.log(companyDetails);
      setFacebook(companyDetails.facebook);
      setWebsite(companyDetails.link);
      setInstagram(companyDetails.instagram);
      setTwitter(companyDetails.twitter);
      setOpenings(companyDetails.numberOfOpenings);
      setLocation(companyDetails.locations);
      setTags(companyDetails.tags);
      setTeamSize(companyDetails.teamSize);
      setAboutCompany(companyDetails.about);
      setCompanyFunding(companyDetails.totalFunding);
      setCompanyDescription(companyDetails.description);
    }
  }, [companyDetails]);

  const onSaveClick = async () => {
    const newData = {
      facebook: facebook,
      link: website,
      twitter: twitter,
      instagram: instagram,
      numberOfOpenings: openings,
      about: aboutCompany,
      totalFunding: companyFunding,
      description: companyDescription,
      locations: location,
      tags: tags,
      teamSize: teamSize,
      title: companyDetails.title,
      linkedin: companyDetails.linkedin,
      subtitle: companyDetails.subtitle,
      jobs: companyDetails.jobs,
      keyPeople: companyDetails.keyPeople,
      image: companyDetails.image,
      featured: companyDetails.featured,
    };

    await axios({
      method: "put",
      data: newData,
      // withCredentials: true,
      url: `https://admin-panel-backend.vercel.app/update-company/?_id=${id}`,
    });

    console.log(newData);
  };

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

  return (
    <div className="flex flex-col space-y-6 flex-1 py-10">
      <div className="space-y-4 px-10">
        <div className="flex w-full h-1/4">
          <input
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="www.company-website.com/"
            className="px-1 py-2 placeholder-[#6B7280] text-[#030303]  placeholder-opacity-90 relative bg-white text-sm border rounded-tr-[3.5px] rounded-br-[3.5px]  focus:outline-none focus:border-[#2dc5a1] focus:border-2  w-full  transition duration-200 ease-in"
          />
        </div>
        <div className="flex w-full h-1/4">
          <input
            type="text"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            placeholder="www.instagram.com/your-profile"
            className="px-1 py-2 placeholder-[#6B7280] text-[#030303]  placeholder-opacity-90 relative bg-white text-sm border rounded-tr-[3.5px] rounded-br-[3.5px]  focus:outline-none focus:border-[#2dc5a1] focus:border-2  w-full  transition duration-200 ease-in"
          />
        </div>
        <div className="flex w-full h-1/4">
          <input
            type="text"
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
            placeholder="www.twitter.com/your-profile"
            className="px-1 py-2 placeholder-[#6B7280] text-[#030303]  placeholder-opacity-90 relative bg-white text-sm border rounded-tr-[3.5px] rounded-br-[3.5px]  focus:outline-none focus:border-[#2dc5a1] focus:border-2  w-full  transition duration-200 ease-in"
          />
        </div>
      </div>

      <div className="px-10 flex items-center justify-between w-full space-x-6">
        <div className="w-full">
          <p className="text-[12px] font-semibold text-[#201e27]">
            Number of Jobs and Assignments
          </p>
          <input
            type="text"
            value={openings}
            onChange={(e) => setOpenings(e.target.value)}
            placeholder="Number of Jobs and Assignments"
            className="appearance-none px-3 py-2 placeholder-[#6B7280] text-[#030303]  placeholder-opacity-90 relative w-full bg-white rounded text-sm border-[1.5px]  focus:outline-none focus:border-[#2dc5a1] focus:border-2 transition duration-200  ease-in mt-1 bg-transparent"
          />
        </div>
        {/* <div className="w-1/2">
          <p className="text-[12px] font-semibold text-[#201e27]">
            Number of openings
          </p>
          <input
            type="text"
            value={openings}
            onChange={(e) => setOpenings(e.target.value)}
            placeholder="Number of Openings"
            className="appearance-none px-3 py-2 placeholder-[#6B7280] text-[#030303]  placeholder-opacity-90 relative w-full bg-white rounded text-sm border-[1.5px]  focus:outline-none focus:border-[#2dc5a1] focus:border-2 transition duration-200  ease-in mt-1 bg-transparent"
          />
        </div> */}
      </div>

      <div className="px-10 w-full space-y-2">
        {/* <p className="text-[12px] font-semibold text-[#201e27]">
          Company Location
        </p>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Example: Singapore, Mumbai, New York..."
          className="appearance-none px-3 py-2 placeholder-[#6B7280] text-[#030303]  placeholder-opacity-90 relative w-full bg-white rounded text-sm border-[1.5px]  focus:outline-none focus:border-[#2dc5a1] focus:border-2 transition duration-200  ease-in mt-1 bg-transparent"
        /> */}
        <PrefferedLocation
          companyDetails={companyDetails}
          setLocation={setLocation}
          id={id}
        />
      </div>

      <div className="px-10 w-full space-y-2">
        <p className="text-[12px] font-semibold text-[#201e27]">Tags</p>
        {/* <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="Example: Artifical Intelligence, Machine Learning, Saas..."
                    className="appearance-none px-3 py-2 placeholder-[#6B7280] text-[#030303]  placeholder-opacity-90 relative w-full bg-white rounded text-sm border-[1.5px]  focus:outline-none focus:border-[#2dc5a1] focus:border-2 transition duration-200  ease-in mt-1 bg-transparent"
                /> */}
        <Tags setTags={setTags} id={id} companyDetails={companyDetails} />
      </div>

      <div className="px-10 w-full space-y-2">
        <p className="text-[12px] font-semibold text-[#201e27]">Team Size</p>
        <input
          type="text"
          value={teamSize}
          onChange={(e) => setTeamSize(e.target.value)}
          placeholder="Example: 10-20, 100+, >1000..."
          className="appearance-none px-3 py-2 placeholder-[#6B7280] text-[#030303]  placeholder-opacity-90 relative w-full bg-white rounded text-sm border-[1.5px]  focus:outline-none focus:border-[#2dc5a1] focus:border-2 transition duration-200  ease-in mt-1 bg-transparent"
        />
        {/* <TeamSize
          setTeamSize={setTeamSize}
          id={id}
          companyDetails={companyDetails}
        /> */}
      </div>
      <div className="px-10 w-full space-y-2">
        <p className="text-[12px] font-semibold text-[#201e27]">Funding</p>

        <input
          type="text"
          value={companyFunding}
          onChange={(e) => setCompanyFunding(e.target.value)}
          placeholder="Funding"
          className="appearance-none px-3 py-2 placeholder-[#6B7280] text-[#030303]  placeholder-opacity-90 relative w-full bg-white rounded text-sm border-[1.5px]  focus:outline-none focus:border-[#2dc5a1] focus:border-2 transition duration-200  ease-in mt-1 bg-transparent"
        />
      </div>

      {/* <div className="px-10 w-full space-y-2">
        <p className="text-[12px] font-semibold text-[#201e27]">
          About Company (in Jobs)
        </p>
         <textarea
          type="text"
          value={aboutCompany}
          onChange={(e) => setAboutCompany(e.target.value)}
          placeholder="Give a brief description"
          className="appearance-none px-3 py-2 placeholder-[#6B7280] text-[#030303]  placeholder-opacity-90 relative w-full bg-white rounded text-base border-[1.5px]  focus:outline-none focus:border-[#2dc5a1] focus:border-2 transition duration-200  ease-in mt-1 bg-transparent h-52"
        /> 
        <RichEditor
          htmlContent={aboutCompany}
          setAboutCompany={setAboutCompany}
          handleEditorChange={handleEditorChange}
          purpose="aboutCompany"
          id={id}
          companyDetails={companyDetails}
        />
      </div> 
      */}

      <div className="px-10 w-full space-y-2">
        <p className="text-[12px] font-semibold text-[#201e27]">
          Company Description
        </p>
        {/* <textarea
          type="text"
          value={aboutCompany}
          onChange={(e) => setAboutCompany(e.target.value)}
          placeholder="Give a brief description"
          className="appearance-none px-3 py-2 placeholder-[#6B7280] text-[#030303]  placeholder-opacity-90 relative w-full bg-white rounded text-base border-[1.5px]  focus:outline-none focus:border-[#2dc5a1] focus:border-2 transition duration-200  ease-in mt-1 bg-transparent h-52"
        /> */}
        <RichEditor
          htmlContent={companyDescription}
          setAboutCompany={setCompanyDescription}
          handleEditorChange={handleEditorChange}
          id={id}
          purpose="companyDescription"
          companyDetails={companyDetails}
        />
      </div>

      <div className="flex justify-end mr-10 mt-[1.5rem]">
        <button
          className="ml-[0.9375rem]  outline-none  min-w-[9.0625rem] py-[0.625rem] px-[0.75rem] rounded-[0.3125rem]  font-semibold text-[0.875rem] h-[2.5rem] cursor-pointer text-white bg-[#1a73e8] mb-[20px]  border-none mt-[10px] flex items-center justify-center"
          onClick={() => {
            onSaveClick();
            notify();
          }}
        >
          Save
        </button>
      </div>
      <Toaster />
    </div>
  );
}

export default Profile;
