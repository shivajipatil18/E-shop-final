import React, { useContext } from 'react'
import LangContext from '../context/LangContext'

const Footer = () => {
    const {lang,ChangeLang}=useContext(LangContext)
    console.log(lang)
  return (
    <div>
         
         <hr/>
         <h1>Footer</h1>
        <h1>Language is  {lang }</h1>
       <button onClick={ChangeLang}>Change Lang</button>
        </div>
  )
}

export default Footer