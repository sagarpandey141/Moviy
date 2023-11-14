import React, { useEffect, useState } from 'react'
import {Facebook,Instagram,Twitter,YouTube} from "@mui/icons-material"

const Footer = () => {
    const legalWords = [{
        name: "Term of use"
    },
    {
        name: "Blog"
    },
    {
        name: "About"
    },
    {
        name: "Privacy Policy"
    },
    {
        name: "FAQ"
    },]

    
    
  

    return (
        <div className='bg-[#040c18] text-white'>
         <div className='max-w-4xl mx-auto w-11/12 py-8' >
            <div className='flex flex-col gap-5 items-center mx-auto'>
                <div className='flex gap-5'>
                    { legalWords.map((value,index) => (<div key={index}>
                       {value.name}
                    </div>))}
                </div>
                <div className='text-center text-slate-400'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem nam autem nostrum numquam vitae ipsa quae omnis ut exercitationem. Fugiat sint veritatis deleniti magni incidunt unde minus aliquid, libero accusamus, veniam cumque error quasi cupiditate, quaerat tempora odit. Minus aliquid nobis velit corrupti repudiandae maxime repellat, alias ea illo similique.</div>
                <div className='flex gap-5'>
                    <Facebook />
                    <Instagram />
                    <YouTube/>
                    <Twitter />
                </div>
            </div>
          </div>
        </div>
    )
}

export default Footer