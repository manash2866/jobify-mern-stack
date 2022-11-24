import React, {useState} from 'react'
import Wrapper from '../assets/wrappers/ChartsContainer'
import BarChart from './BarChart'
import AreaChart from './AreaChart'
import {useAppContext} from '../context/appContext'

const ChartsContainer = () => {
  const {monthlyApplications: data}= useAppContext()
  const [barChart, setBarChart]= useState(true)
  return (
  <Wrapper>
    <h4>monthly applications</h4>
    <button type='button' onClick={()=>setBarChart(!barChart)}>
      {barChart ? 'show AreaChart' : 'show BarChart'}
    </button>
    {barChart ? <BarChart data={data} /> : <AreaChart data={data} />} 
  </Wrapper>
  )
}
export default ChartsContainer