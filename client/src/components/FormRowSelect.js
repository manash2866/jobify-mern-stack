const FormRowSelect = ({labelText, name, value, list, handleChange}) => {
  return (
    <div className='form-row' >
        <label htmlFor={name} className='form-label' >{labelText || name}</label>
        <select name={name} onChange={handleChange} value={value}
        className='form-select'>
            {list.map((itemValue, index)=>{
            return <option key={index} value={itemValue}>
                {itemValue}
                </option>
            })}
        </select>
    </div>
  )
}
export default FormRowSelect