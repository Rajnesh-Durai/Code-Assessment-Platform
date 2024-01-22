import React from 'react'
import { classnames } from '../../utils/general'
import '../../css/codeEditor.css'

const CustomInput = ({ customInput, setCustomInput,isActive }) => {
  return (
    <>
      {' '}
      {isActive===true ?(
      <textarea
      rows="5"
      value={customInput}
      onChange={(e) => setCustomInput(e.target.value)}
      placeholder={`Custom Input`}
      className='textbox-input'
    ></textarea>
      ):(
        <textarea
        rows="5"
        value={customInput}
        onChange={(e) => setCustomInput(e.target.value)}
        placeholder={`Custom Input`}
        className='textbox-input2'
      ></textarea>
      )}

    </>
  )
}

export default CustomInput
