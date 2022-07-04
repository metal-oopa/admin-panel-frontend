import { AiOutlinePlus } from "react-icons/ai";
import { useRef, useState } from "react";
function CompanyHeader() {
    const fileRef = useRef(null);

    const [companyName, setCompanyName] = useState("");
    const [linkedIn, setLinkedIn] = useState("");
    const [companyLogo, setCompanyLogo] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const company = {
            companyName,
            linkedIn,
            companyLogo,
        };
        // setCompanyList((companyList) => [...companyList, company]);
        setCompanyName("");
        setLinkedIn("");
        setCompanyLogo(null);
        // setModalOpen(false);
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
                            onChange={(e) =>
                                setCompanyName(e.target.value)
                            }
                            className="px-3 py-2 placeholder-[#6B7280] text-[#030303] placeholder-opacity-90 relative bg-white rounded text-sm border-[1.5px] focus:outline-none focus:border-[#2dc5a1] focus:border-2  w-full transition duration-200 ease-in"
                        />
                    </div>
                    <div className="flex w-full h-1/4">
                        <span className="text-[12px] bg-gray-200 rounded-tl-[3.5px] rounded-bl-[3.5px] flex items-center justify-center px-2 text-gray-500 border">
                            https://
                        </span>
                        <input
                            type="text"
                            value={linkedIn}
                            onChange={(e) =>
                                setLinkedIn(e.target.value)
                            }
                            placeholder="www.linkedin.com/your-profile"
                            className="px-1 py-2 placeholder-[#6B7280] text-[#030303]  placeholder-opacity-90 relative bg-white text-sm border rounded-tr-[3.5px] rounded-br-[3.5px]  focus:outline-none focus:border-[#2dc5a1] focus:border-2  w-full  transition duration-200 ease-in"
                        />
                    </div>
                </div>
            </div>
            <input
                type="file"
                ref={fileRef}
                hidden
                onChange={handleFileChange}
            />
            <div className="flex justify-between w-full mt-[1.5rem]">
                <button className="save-button" onClick={()=>fileRef.current.click()}>
                    Edit
                </button>
                <button className="save-button" type="submit">
                    Save
                </button>
            </div>
        </form>
    </div>
  )
}

export default CompanyHeader