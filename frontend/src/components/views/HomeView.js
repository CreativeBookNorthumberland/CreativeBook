import '../../css/HomeView.css'

import { useLocation, useNavigate, NavLink, Routes, Route, Navigate } from "react-router-dom"
import { Button } from '@mui/material'

import { useEffect, useState } from 'react'
import Copywriting from '../../assets/icons/Copywriting.jpg'
import Dance from '../../assets/icons/Dance.jpg'
import GraphicDesign from '../../assets/icons/GraphicDesign.jpg'
import Illustration from '../../assets/icons/Illustration.jpg'
import Music from '../../assets/icons/Music.jpg'
import Other from '../../assets/icons/Other.jpg'
import Photography from '../../assets/icons/Photography.jpg'
import SocialMedia from '../../assets/icons/SocialMedia.jpg'
import WebsiteDesign from '../../assets/icons/WebsiteDesign.jpg'


function HomeView() {

  return (
    <>
      <div class='shortcuts'>
        <div class='service-shortcut'><img src={GraphicDesign} /></div>
        <div class='service-shortcut'><img src={SocialMedia} /></div>
        <div class='service-shortcut'><img src={WebsiteDesign} /></div>
        <div class='service-shortcut'><img src={Copywriting} /></div>
        <div class='service-shortcut'><img src={Dance} /></div>
        <div class='service-shortcut'><img src={Illustration} /></div>
        <div class='service-shortcut'><img src={Music} /></div>
        <div class='service-shortcut'><img src={Photography} /></div>
        <div class='service-shortcut'><img src={Other} /></div>
      </div>

      <p>Welcome to Creative Book Northumberland. The home of creative talent in Northumberland.</p>

      <p>Creative Book Northumberland aims to connect freelance creatives across Northumberland, 
        with businesses who are looking to hire a certain skill set. It offers a way of matching 
        up creatives with marketeers and businesses, creating opportunities for growth for both
        parties.</p>

      <p>If you're looking for a talented photographer, website designer, copywriter, marketeer or even 
        a dancer in Northumberland you've come to the right place.</p>

      <NavLink to='/search'>
        <Button variant='contained'>Find Creative</Button>
      </NavLink>

      <p>If you are a talented photographer, website designer, copywriter, marketeer or even a dancer 
        who lives or works in Northumberland make sure your details are on the site.</p>

      <NavLink to='/signup'>
        <Button variant='contained'>Sign up</Button>
      </NavLink>

      <p>Thanks to funding from North of Tyne Culture and Investment Programme: Creative UK, Creative 
        Book Northumberland is able to offer free listings to freelance creatives across Northumberland 
        as well as offering free access to businesses who are looking to collaborate.</p>

    </>
  )

}

export default HomeView;
