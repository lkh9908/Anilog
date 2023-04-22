import React from 'react'
import Logo from "../img/cat_logo.png"

export const Footer = () => {
  return (
    <footer>
      <img src={Logo} alt="" />
      <span>Made with ❤ and <b>React.js</b></span>
    </footer>
  )
}