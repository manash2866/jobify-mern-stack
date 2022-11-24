import React, { useContext, useEffect, useReducer} from 'react'
import axios from 'axios'
import reducer from './reducer'
import { 
    DISPLAY_ALERT, 
    CLEAR_ALERT,
    SETUP_USER_BEGIN,
    SETUP_USER_SUCCESS,
    SETUP_USER_ERROR,
    TOGGLE_SIDEBAR,
    LOGOUT_USER,
    UPDATE_USER_BEGIN,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    HANDLE_CHANGE,
    CLEAR_VALUES,
    CREATE_JOB_BEGIN,
    CREATE_JOB_SUCCESS,
    CREATE_JOB_ERROR,
    GET_JOBS_BEGIN,
    GET_JOBS_SUCCESS,
    SET_EDIT_JOB,
    DELETE_JOB_BEGIN,
    EDIT_JOB_BEGIN,
    EDIT_JOB_SUCCESS,
    EDIT_JOB_ERROR,
    SHOW_STATS_BEGIN,
    SHOW_STATS_SUCCESS,
    CLEAR_FILTERS,
    CHANGE_PAGE,
    DELETE_JOB_ERROR,
    GET_CURRENT_USER_BEGIN,
    GET_CURRENT_USER_SUCCESS
        } from "./action"


const initialState = {
    userLoading: true,
    isLoading: false,
    showAlert: false,
    alertText:'',
    alertType:'',
    user: null,
    userLocation: '',
    jobLocation: '',
    showSidebar: false,
    isEditing: false,
    editJobId: '',
    company: '',
    position: '',
    jobTypeOptions: ['full-time', 'part-time', 'internship', 'remote'],
    jobType: 'full-time',
    statusOptions: ['pending','interview', 'declined'],
    status: 'pending',
    jobs: [],
    totalJobs: 0,
    numOfPages: 1,
    page: 1,
    stats: {},
    monthlyApplications: [],
    search: '',
    searchStatus: 'all',
    searchType: 'all',
    sort: 'latest',
    sortOptions: ['latest', 'oldest', 'a-z', 'z-a']
}
const AppContext = React.createContext()

const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const authFetch = axios.create({
        baseURL: '/api/v1'
    })

    authFetch.interceptors.response.use((response)=>{
        return response
    }, (error)=>{
        // console.log(error.response)
        if(error.response.status === 401){
            logoutUser()
        }
        return Promise.reject(error)
    })

    const displayAlert = () => {
        dispatch({type:DISPLAY_ALERT})
        clearAlert()
    }

    const clearAlert=()=>{
        setTimeout(()=>{dispatch({type:CLEAR_ALERT})},3000)
    }

    const setupUser = async ({currentUser, endPoint, alertText}) => {
        dispatch({type: SETUP_USER_BEGIN})
        try{
            const {data} = await axios.post(`/api/v1/auth/${endPoint}`, currentUser)
            const {user, location} = data
            dispatch({type: SETUP_USER_SUCCESS, 
            payload: {user, location, alertText}})
        }catch(err){
            dispatch({type: SETUP_USER_ERROR, payload: {msg: err.response.data.msg}})
        }
        clearAlert()
    }

    const toggleSidebar =()=>{
        dispatch({type:TOGGLE_SIDEBAR})
    }

    const logoutUser =async()=>{
        await authFetch('/auth/logout')
        dispatch({type : LOGOUT_USER})
    }

    const updateUser = async(currentUser)=>{
        dispatch({type: UPDATE_USER_BEGIN})
        try{
            const {data} = await authFetch.patch('/auth/updateUser', currentUser)
            const {user, location} = data
            dispatch({type: UPDATE_USER_SUCCESS, payload:{user, location}})
        }catch(err){
            if(err.response.status !== 401) {
                dispatch({type: UPDATE_USER_ERROR, payload: {msg: err.response.data.msg}})
            }
        }
        clearAlert()
    }

    const handleChange=({name, value})=>{
        dispatch({type: HANDLE_CHANGE, payload: {name, value}})
    }

    const clearValues =()=>{
        dispatch({type: CLEAR_VALUES})
    }

    const createJob = async ()=>{
        dispatch({type: CREATE_JOB_BEGIN})
        try{
            const {position, company, jobLocation, status, jobType} = state
            await authFetch.post('/jobs', {position, company, jobLocation, status, jobType})
            dispatch({type: CREATE_JOB_SUCCESS})
            dispatch({type: CLEAR_VALUES})
        } catch(error){
            if(error.response.status === 401) return
            dispatch({type: CREATE_JOB_ERROR, payload: {msg : error.response.data.msg}})
        }
        clearAlert()
    }

    const getJobs= async ()=>{
        const {page, search, searchStatus, searchType, sort} = state
        
        let url=`/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`
        if(search){
            url = url + `&search=${search}`
        }

        dispatch({type: GET_JOBS_BEGIN})
        try{
            const {data} = await authFetch(url);
            const {jobs, numOfPages, totalJobs} = data
            dispatch({type: GET_JOBS_SUCCESS, 
            payload: {jobs, numOfPages, totalJobs}})
        } catch(error){
            logoutUser()
        }
        clearAlert()
    }

    const setEditJob=(id)=>{
       dispatch({type: SET_EDIT_JOB, payload: { id}})
    }
    
    const editJob=async()=>{
        dispatch({type: EDIT_JOB_BEGIN})
        try{
            const {company, position, jobType, status, jobLocation} = state

            await authFetch.patch(`/jobs/${state.editJobId}`,
            {company, position, jobType, status, jobLocation})

            dispatch({type: EDIT_JOB_SUCCESS})
            dispatch({type: CLEAR_VALUES})
        }catch(error){
            if(error.response.status === 401) return
            dispatch({type: EDIT_JOB_ERROR, payload:{msg: error.response.data.msg}})
        }
        clearAlert()
    }

    const deleteJob=async (jobId)=>{
        dispatch({type: DELETE_JOB_BEGIN})
        try{
            await authFetch.delete(`/jobs/${jobId}`)
            getJobs()
        } catch(error){
            if(error.response.status === 401) return
            dispatch({type: DELETE_JOB_ERROR, payload:{msg: error.response.data.msg}})
        }
        clearAlert()
    }

    const showStats = async()=>{
        dispatch({type: SHOW_STATS_BEGIN})
        try{
            const {data} = await authFetch('/jobs/stats')
            const {monthlyApplications, defaultStats} = data
            dispatch({type: SHOW_STATS_SUCCESS,
                payload:{defaultStats, monthlyApplications}})
        }catch(error){
            logoutUser()
        }
    }

    const clearFilters=()=>{
        dispatch({type: CLEAR_FILTERS})
    }

    const changePage=(page)=>{
        dispatch({type: CHANGE_PAGE, payload:{page}})
    }

    const getCurrentUser = async()=>{
        dispatch({type: GET_CURRENT_USER_BEGIN})
        try{
            const {data} = await authFetch('/auth/getCurrentUser')
            const {user, location} = data
            dispatch({type: GET_CURRENT_USER_SUCCESS, payload: {user, location}})
        } catch(error){
            if(error.response.status === 401) return;
            logoutUser()
        }
    }

    useEffect(()=>{
        getCurrentUser()
    },[])

    return (
        <AppContext.Provider value={{...state, displayAlert, setupUser,
         toggleSidebar, logoutUser, updateUser, handleChange, clearValues, createJob,
         getJobs, setEditJob, deleteJob, editJob, showStats, clearFilters, changePage }}>
            {children}
        </AppContext.Provider>
    )
}


const useAppContext = () => {
    return useContext(AppContext)
}

export {AppProvider, initialState, useAppContext}