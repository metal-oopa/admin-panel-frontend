import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import CompanyHeader from "../../../components/CompanyHeader";
import Jobs from "../../../components/CompanySections/Jobs";
import KeyPeople from "../../../components/CompanySections/KeyPeople";
import Profile from "../../../components/CompanySections/Profile";
import Sidebar from "../../../components/Sidebar/Sidebar";
import axios from "axios";

function Company() {
  const router = useRouter();
  const { id } = router.query;
  // console.log(id);

  const [currentSection, setCurrentSection] = useState("Profile");
  const [companyDetails, setCompanyDetails] = useState();
  const [jobs, setJobs] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    if (router.isReady) {
      await axios({
        method: "get",
        // withCredentials: true,
        url: `https://hirable-backend-original.vercel.app/get-company/?_id=${id}`,
      })
        .then((data) => {
          console.log(data.data);
          setCompanyDetails(data.data);
        })
        .catch((err) => {
          console.log(err);
        });

      await axios({
        method: "get",
        // withCredentials: true,
        url: `http://localhost:3001/get-jobs/?companyId=${id}`,
        data: {
          companyId: id,
        },
      })
        .then((data) => {
          console.log(data.data);
          setJobs(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [router.isReady, id]);

  return (
    <div>
      <Sidebar />
      <div className="main">
        <div className="min-h-screen pb-[20px] bg-[#f8f8f8]">
          <CompanyHeader id={id} companyDetails={companyDetails} />

          <ul className="flex justify-between w-full px-20 text-lg pt-5 border-b">
            <li
              onClick={() => setCurrentSection("Profile")}
              className={`current-section-option ${
                currentSection === "Profile" && "border-b-2 border-[#2dc5a1]"
              }`}
            >
              Profile
            </li>
            <li
              onClick={() => setCurrentSection("Jobs")}
              className={`current-section-option ${
                currentSection === "Jobs" && "border-b-2 border-[#2dc5a1]"
              }`}
            >
              Jobs
            </li>
            <li
              onClick={() => setCurrentSection("KeyPeople")}
              className={`current-section-option ${
                currentSection === "KeyPeople" && "border-b-2 border-[#2dc5a1]"
              }`}
            >
              Key People
            </li>
          </ul>

          {currentSection === "Profile" ? (
            <Profile id={id} companyDetails={companyDetails} />
          ) : currentSection === "Jobs" ? (
            <Jobs
              id={id}
              companyDetails={companyDetails}
              companyJobs={jobs}
              setCompanyJobs={setJobs}
            />
          ) : (
            <KeyPeople id={id} companyDetails={companyDetails} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Company;
