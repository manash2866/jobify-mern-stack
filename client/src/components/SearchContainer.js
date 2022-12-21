import {FormRow, FormRowSelect} from '.'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/SearchContainer'
import {useState, useMemo} from 'react'

const SearchContainer = () => {
  const [localSearch, setLocalSearch] = useState('')
  const {statusOptions, search, isLoading, searchType, searchStatus, sort, sortOptions,
    clearFilters, handleChange, jobTypeOptions} = useAppContext()
    const handleSearch=(e)=>{
      handleChange({name: e.target.name, value: e.target.value})
    }
    const handleSubmit=(e)=>{
      e.preventDefault()
      clearFilters()
      setLocalSearch('')
    }
    const debounce=()=>{
      let timeoutId;
      return (e)=>{
        setLocalSearch(e.target.value)
        clearTimeout(timeoutId)
        timeoutId = setTimeout(()=>{
          handleChange({name: e.target.name, value: e.target.value})
        },1000)
      }
    }
    const optimizedDebounce = useMemo(()=>debounce(), [])

  return (
    <Wrapper>
      <form className='form'>
        <h4>search form</h4>
        <div className='form-center'>
          <FormRow type='text' name='search' value={localSearch} 
            handleChange={optimizedDebounce}/>
          <FormRowSelect labelText='status' name='searchStatus' value={searchStatus}
            handleChange={handleSearch} list={['all', ...statusOptions]} />
          <FormRowSelect labelText='type' name='searchType' value={searchType}
            handleChange={handleSearch} list={['all', ...jobTypeOptions]} />
          <FormRowSelect name='sort' value={sort}
            handleChange={handleSearch} list={sortOptions} />
          <button className='btn btn-block btn-danger' disabled={isLoading} 
            onClick={handleSubmit}> clear filters </button>
        </div>
      </form>
    </Wrapper>
  )
}
export default SearchContainer
