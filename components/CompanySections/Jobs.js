import React, { useRef, useState } from 'react'
import AddJobModal from '../Modals/AddJobModal'

function Jobs() {
  
  const [showAddJobModal , setShowAddJobModal] = useState(false)
  const [jobs , setJobs] = useState([]) ;
  const [curItem , setCurItem] = useState({});
  const [isEdit , setIsEdit] = useState(false);
  const [index , setIndex] = useState();
  
  const handleJobClick = (job ,index) =>{
    setCurItem(job)
    setIsEdit(true)
    setIndex(index)
    setShowAddJobModal(true)
  }

  const handleSaveJobClick = () => {
    setCurItem({title : '' , jobType:'',
    description:'' , responsibilities : ''})
    setIsEdit(false)
    setShowAddJobModal(true)
  }

  return (
    <div className='px-20'> 
      <button className="save-button float-right m-[20px] " onClick={handleSaveJobClick}>
          Add Job
      </button>
      <AddJobModal 
        showAddJobModal={showAddJobModal} 
        setShowAddJobModal={setShowAddJobModal} 
        jobs = {jobs}
        curItem ={curItem}
        isEdit = {isEdit}
        index ={index}
      />

    <div className='w-[80%] flex flex-row-rev flex-wrap '>      
        {jobs.map((job , index) => {
          return (
            <div key={index} className='cursor-pointer m-[15px]' onClick={() => handleJobClick(job , index)}>
            <h1>{job.title}</h1>
            </div>
          )
        })}
    </div>

    </div>
  ) 
}

export default Jobs