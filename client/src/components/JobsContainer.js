import Loading from './Loading'
import { useAppContext } from "../context/appContext"
import Wrapper from '../assets/wrappers/JobsContainer'
import Job from './Job'
import Alert from './Alert'
import { useEffect } from 'react'
import PageBtnContainer from './PageBtnContainer'


const JobsContainer = () => {
  const {totalJobs, numOfPages, page, isLoading, jobs, getJobs,
    search, searchStatus, searchType, sort, showAlert} = useAppContext()
  
  useEffect(()=>{
      getJobs()
  },[page, search, searchStatus, searchType, sort])

  if(isLoading){
    return <Loading center />
  }

  if(jobs.length === 0){
    return <Wrapper>
      <h2>no jobs to display..</h2>
    </Wrapper>
  }

  return (
    <Wrapper>
      {showAlert && <Alert/>}
      <h5> {totalJobs} job{jobs.length > 1 && 's'} found</h5>
      <div className='jobs'>
        {jobs.map((job)=>{
          return <Job key={job._id} {...job}/>
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer/>}
    </Wrapper>
  )
}
export default JobsContainer