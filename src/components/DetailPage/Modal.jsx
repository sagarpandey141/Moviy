import React from 'react'
import "./Modalcss.css"
import {AiFillCloseCircle} from "react-icons/ai"
const Modal = ({data,setModal}) => {
  
  return (
    <div class="modal-background">
    <div class="modal gap-2">
    <div className=' mt-[-1rem] mb-2 cursor-pointer' onClick={()=>{setModal(null)}} >
       CLOSE
    </div>
      <iframe src={`https://www.youtube.com/embed/${data}`} class="video"></iframe>
    </div>
</div>

  )
}

export default Modal