import {FormRow, Alert, FormRowSelect} from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'

const AddJob = () => {
  const { showAlert, displayAlert, position, company, status, statusOptions, jobType,
  jobTypeOptions, jobLocation, isEditing, handleChange, clearValues,
  isLoading, createJob, editJob } = useAppContext()

  const handleSubmit = e =>{
    e.preventDefault()

    if(!position || !company || !jobLocation){
      displayAlert()
      return
    }
    if(isEditing){
      editJob()
      return
    }
    createJob()
  }

  const handleJobInput = (e)=>{
    const name = e.target.name
    const value = e.target.value
    handleChange({name, value})
  }

  return (
    <Wrapper>
      <form className='form'>
        <h3> { isEditing ? 'edit job' : 'add job' } </h3>
        {showAlert && <Alert/>}
        <div className='form-center'>
          <FormRow type='text' name='position' value={position} 
          handleChange={handleJobInput} />
          <FormRow type='text' name='company' value={company} 
          handleChange={handleJobInput} />
          <FormRow type='text' name='jobLocation' value={jobLocation} 
          handleChange={handleJobInput } labelText='job location' />
          <FormRowSelect name='status' value={status} list={statusOptions}
          handleChange={handleJobInput}/>
          <FormRowSelect name='jobType' value={jobType} list={jobTypeOptions}
          handleChange={handleJobInput} labelText='job type'/>
          <div className='btn-container'>
            <button type='submit' className='btn btn-block submit-btn' 
            onClick={handleSubmit} disabled={isLoading} >
              submit
            </button>
            <button className='btn btn-block clear-btn' onClick={(e)=>{
              e.preventDefault()
              clearValues()
            }} >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}
export default AddJob