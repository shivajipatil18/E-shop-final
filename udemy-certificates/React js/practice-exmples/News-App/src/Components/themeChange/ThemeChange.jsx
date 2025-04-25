import React, { useContext } from 'react'
import styles from "../../Components/themeChange/ThemeChange.module.css"
import { ThemeContext, TOGGLE } from "../../context/ThemeContext";
import sun from "../../assets/sun.jpg"
import moon from "../../assets/moon.jpg"


const ThemeChange = () => {
    const theme=useContext(ThemeContext)
    console.log(theme)
    const handleClick=()=>{
        theme.dispatch({type:TOGGLE})
    }

  return (
    <div className={styles.toggle}>
        <img src={sun} alt='sun' className={styles.icon}/>
        <img src={moon}  alt='moon' className={styles.icon} />
        <div className={styles.button} onClick={handleClick} style={{left:theme.state.darkmode?0:25}}>

        </div>
    </div>
  )
}

export default ThemeChange