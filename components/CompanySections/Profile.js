import { useRef, useState } from "react";
import RichEditor from '../General/Editor'
import PrefferedLocation from "./PrefferedLocation";
import Tags from "./Tags";
import TeamSize from "./TeamSize";
function Profile() {
    const [facebook, setFacebook] = useState("");
    const [website, setWebsite] = useState("");
    const [instagram, setInstagram] = useState("");
    const [openings, setOpenings] = useState();
    const [assignments, setAssignments] = useState();
    const [location, setLocation] = useState();
    const [tags, setTags] = useState();
    const [teamSize, setTeamSize] = useState();
    const [aboutCompany, setAboutCompany] = useState("");
    const handleEditorChange = (htmlContent) => {
        setAboutCompany(htmlContent);
      };
    
    const onSaveClick = () =>{
        const newData = {
            facebook : facebook ,
            website : website,
            instagram : instagram,
            openings : openings,
            assignments : assignments,
            location : location,
            tags : tags,
            teamSize : teamSize,
            aboutCompany : aboutCompany,
        }
        console.log(newData)
    }

    return (
        <div className="flex flex-col space-y-6 flex-1 py-10">
            <div className="space-y-4 px-10">
                <div className="flex w-full h-1/4">
                    <span className="text-[12px] bg-gray-200 rounded-tl-[3.5px] rounded-bl-[3.5px] flex items-center justify-center px-2 text-gray-500 border">
                        https://
                    </span>
                    <input
                        type="text"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="www.company-website.com/"
                        className="px-1 py-2 placeholder-[#6B7280] text-[#030303]  placeholder-opacity-90 relative bg-white text-sm border rounded-tr-[3.5px] rounded-br-[3.5px]  focus:outline-none focus:border-[#2dc5a1] focus:border-2  w-full  transition duration-200 ease-in"
                    />
                </div>
                <div className="flex w-full h-1/4">
                    <span className="text-[12px] bg-gray-200 rounded-tl-[3.5px] rounded-bl-[3.5px] flex items-center justify-center px-2 text-gray-500 border">
                        https://
                    </span>
                    <input
                        type="text"
                        value={facebook}
                        onChange={(e) => setFacebook(e.target.value)}
                        placeholder="www.facebook.com/your-profile"
                        className="px-1 py-2 placeholder-[#6B7280] text-[#030303]  placeholder-opacity-90 relative bg-white text-sm border rounded-tr-[3.5px] rounded-br-[3.5px]  focus:outline-none focus:border-[#2dc5a1] focus:border-2  w-full  transition duration-200 ease-in"
                    />
                </div>
                <div className="flex w-full h-1/4">
                    <span className="text-[12px] bg-gray-200 rounded-tl-[3.5px] rounded-bl-[3.5px] flex items-center justify-center px-2 text-gray-500 border">
                        https://
                    </span>
                    <input
                        type="text"
                        value={instagram}
                        onChange={(e) => setInstagram(e.target.value)}
                        placeholder="www.instagram.com/your-profile"
                        className="px-1 py-2 placeholder-[#6B7280] text-[#030303]  placeholder-opacity-90 relative bg-white text-sm border rounded-tr-[3.5px] rounded-br-[3.5px]  focus:outline-none focus:border-[#2dc5a1] focus:border-2  w-full  transition duration-200 ease-in"
                    />
                </div>
            </div>

            <div className="px-10 flex items-center justify-between w-full space-x-6">
                <div className="w-1/2">
                    <p className="text-[12px] font-semibold text-[#201e27]">
                        Number of Assignments
                    </p>
                    <input
                        type="text"
                        value={assignments}
                        onChange={(e) => setAssignments(e.target.value)}
                        placeholder="Number of Assignments"
                        className="appearance-none px-3 py-2 placeholder-[#6B7280] text-[#030303]  placeholder-opacity-90 relative w-full bg-white rounded text-sm border-[1.5px]  focus:outline-none focus:border-[#2dc5a1] focus:border-2 transition duration-200  ease-in mt-1 bg-transparent"
                    />
                </div>
                <div className="w-1/2">
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
                </div>
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
                <PrefferedLocation setLocation = {setLocation} />
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
                <Tags setTags = {setTags} />
            </div>

            <div className="px-10 w-full space-y-2">
                <p className="text-[12px] font-semibold text-[#201e27]">
                    Team Size
                </p>
                {/* <input
                    type="text"
                    value={teamSize}
                    onChange={(e) => setTeamSize(e.target.value)}
                    placeholder="Example: Artifical Intelligence, Machine Learning, Saas..."
                    className="appearance-none px-3 py-2 placeholder-[#6B7280] text-[#030303]  placeholder-opacity-90 relative w-full bg-white rounded text-sm border-[1.5px]  focus:outline-none focus:border-[#2dc5a1] focus:border-2 transition duration-200  ease-in mt-1 bg-transparent"
                /> */}
                <TeamSize setTeamSize ={setTeamSize}/>
            </div>

            <div className="px-10 w-full space-y-2">
                <p className="text-[12px] font-semibold text-[#201e27]">
                    About Company
                </p>
                {/* <textarea
                    type="text"
                    value={aboutCompany}
                    onChange={(e) => setAboutCompany(e.target.value)}
                    placeholder="Give a brief description"
                    className="appearance-none px-3 py-2 placeholder-[#6B7280] text-[#030303]  placeholder-opacity-90 relative w-full bg-white rounded text-sm border-[1.5px]  focus:outline-none focus:border-[#2dc5a1] focus:border-2 transition duration-200  ease-in mt-1 bg-transparent h-52"
                /> */}
                <RichEditor
                    htmlContent={aboutCompany}
                    // setAboutCompany ={setAboutCompany}
                    handleEditorChange={handleEditorChange}
                />
            </div>

            <div className="flex justify-end mr-10 mt-[1.5rem]">
                <button className="ml-[0.9375rem]  outline-none  min-w-[9.0625rem] py-[0.625rem] px-[0.75rem] rounded-[0.3125rem]  font-semibold text-[0.875rem] h-[2.5rem] cursor-pointer text-white bg-[#1a73e8] mb-[20px]  border-none mt-[10px] flex items-center justify-center" onClick={onSaveClick}>
                    Save
                </button>
            </div>
        </div>
    );
}

export default Profile;
