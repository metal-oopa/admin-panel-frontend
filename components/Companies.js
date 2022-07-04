import Link from "next/link";
import { useState, useEffect } from "react";
import Modal from "./Modal";

function Companies() {
    const [companyList, setCompanyList] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div className="main">
            <div className="min-h-screen pb-[20px] bg-[#f8f8f8]">
                {/* top */}
                <div className="w-full h-[133px] bg-white flex flex-col items-center justify-center"></div>
                <Modal
                    companyList={companyList}
                    setCompanyList={setCompanyList}
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                />
                {/* bottom */}
                <div className="text-[#033443] max-w-[968px] mx-auto pt-5 my-0">
                    <div>
                        <div className="flex justify-end">
                            <input
                                type="text"
                                placeholder="Search Company Name"
                                className="px-3 py-2 placeholder-[#6B7280] text-[#030303]  placeholder-opacity-90 relative bg-white rounded-md text-sm border-[1.5px]  focus:outline-none focus:border-[#2dc5a1] focus:border-2 w-56 transition duration-200 ease-in mr-8"
                            />
                            <input
                                type="text"
                                placeholder="Search Company Location"
                                className="px-3 py-2 placeholder-[#6B7280] text-[#030303]  placeholder-opacity-90 relative bg-white rounded-md text-sm border-[1.5px]  focus:outline-none focus:border-[#2dc5a1] focus:border-2 w-56 transition duration-200 ease-in mr-8"
                            />
                            <button
                                className="bg-collabi-green px-2 text-white h-9 w-32 rounded-md text-sm font-medium"
                                onClick={() => setModalOpen(true)}
                            >
                                Add Company
                            </button>
                        </div>
                    </div>
                </div>

                {/* companies */}
                <div className="columns-3 mx-5">
                    {companyList.map((element) => (
                        <Link
                            key={element.companyName}
                            href={`/dashboard/companies/${element.companyName}`}
                            passHref
                        >
                            <p className="cursor-pointer">
                                {element.companyName}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Companies;
