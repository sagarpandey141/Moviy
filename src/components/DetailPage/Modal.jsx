import React from 'react'

const Modal = ({data,setModal}) => {
  console.log("first")
  return (
    <div className=' absolute inset-0 translate-y-[119%] z-50  flex justify-center items-center  h-screen w-[120rem] -translate-x-72 -ml-28 backdrop-blur-sm  snap-none'>
        <div className=' flex flex-col  ' >
            <p className=' text-white z-50 text-xl mb-1 cursor-pointer' onClick={()=>setModal(null)}>close</p>
            <iframe src={`https://www.youtube.com/embed/${data}`}  className='aspect-video w-[270%] '>
                 
            </iframe>
        </div>
    </div>
  )
}

export default Modal