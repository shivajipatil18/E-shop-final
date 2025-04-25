import React from 'react'

const Test = ({text,children}) => {
  return (
    <div>
        <p>{text}</p>
        <p>{children}</p>
    </div>
  )
}

export default Test