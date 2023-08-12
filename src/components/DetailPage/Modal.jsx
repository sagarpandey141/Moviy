import React from 'react'

const Modal = ({data,setModal}) => {
  console.log("first")
  return (
    <div className=' absolute inset-0 translate-y-[120%] z-50  flex justify-center items-center border h-screen w-[120rem] -translate-x-72 -ml-20  backdrop-blur-sm  snap-none'>
        <div className=' flex flex-col  ' >
            <p className='self-end text-white z-50' onClick={()=>setModal(null)}>close</p>
            <iframe src={`https://www.youtube.com/embed/${data}`}  className='aspect-video w-[280%] '>
                 
            </iframe>
        </div>
    </div>
  )
}

export default Modal