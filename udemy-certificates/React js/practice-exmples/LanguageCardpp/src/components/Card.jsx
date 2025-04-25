import React from 'react'
import Language from '../components/Language';
import {data} from "../data/data"


function Card() {
  return (
    <div className='card'> 
    <div className='langwrapper'>
        {data.map((lang,index)=>(
             <div>
                 <Language {...lang} key={index}/>
            </div>
        ))}
    </div>
    </div>
  )
}

export default Card