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


function HomeView(props) {

  function serviceShortcut(service) {
    props.goToSearchWithFilter({
      'services': [service]
    })
  }

  return (
    <>

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

      <h3>Search shortcuts:</h3>
      <div className='shortcuts'>
        <div className='service-shortcut' onClick={() => {serviceShortcut("Graphic design")}}><img src={GraphicDesign} /></div>
        <div className='service-shortcut' onClick={() => {serviceShortcut("Social media")}}><img src={SocialMedia} /></div>
        <div className='service-shortcut' onClick={() => {serviceShortcut("Website design")}}><img src={WebsiteDesign} /></div>
        <div className='service-shortcut' onClick={() => {serviceShortcut("Copywriting")}}><img src={Copywriting} /></div>
        <div className='service-shortcut' onClick={() => {serviceShortcut("Dance")}}><img src={Dance} /></div>
        <div className='service-shortcut' onClick={() => {serviceShortcut("Illustration")}}><img src={Illustration} /></div>
        <div className='service-shortcut' onClick={() => {serviceShortcut("Music")}}><img src={Music} /></div>
        <div className='service-shortcut' onClick={() => {serviceShortcut("Photography")}}><img src={Photography} /></div>
      </div>

    </>
  )

}

export default HomeView;
