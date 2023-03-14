import '../../css/HomeView.css'

import { useLocation, useNavigate, NavLink, Routes, Route, Navigate } from "react-router-dom"
import { Button } from '@mui/material'
import ArrowForward from '@mui/icons-material/ArrowForward'

import { useEffect, useState } from 'react'
import LogoAnim from '../../assets/logo_anim.gif'
import Copywriting from '../../assets/icons/Copywriting.jpg'
import Dance from '../../assets/icons/Dance.jpg'
import GraphicDesign from '../../assets/icons/GraphicDesign.jpg'
import Illustration from '../../assets/icons/Illustration.jpg'
import Music from '../../assets/icons/Music.jpg'
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

      <div className="home-section-1">
        <div className='big-text'>
          <div><span className='t1'>Welcome to</span><br /><span className='t2'>Creative Book</span><br /><span className='t3'>Northumberland</span></div>
          <NavLink to='/search'>
            <div className='arrow-link'>
              <div className='arrow-link-text'>Find Creative</div> 
              <div className='arrow-link-arrow'><ArrowForward className="icon" fontSize='small'/></div>
            </div>
          </NavLink>
        </div>
        <div className='big-img'>
          <img src={LogoAnim} />
        </div>
      </div>

      <div className='home-section-2'>

        <div className='home-box b1'>
          Creative Book Northumberland aims to connect freelance creatives across Northumberland, 
          with businesses who are looking to hire a certain skill set. It offers a way of matching 
          up creatives with marketeers and businesses, creating opportunities for growth for both
          parties.
        </div>

        <div className='home-box b2'>
            <div>If you're looking for a talented photographer, website designer, copywriter, marketeer or even 
            a dancer in Northumberland you've come to the right place.</div>

          <NavLink to='/search'>
            <div className='arrow-link'>
              <div className='arrow-link-text'>Find Creative</div> 
              <div className='arrow-link-arrow'><ArrowForward className="icon" fontSize='small'/></div>
            </div>
          </NavLink>
        </div>

        <div className='home-box b3'>
            <div>If you are a talented photographer, website designer, copywriter, marketeer or even a dancer 
            who lives or works in Northumberland make sure your details are on the site.</div>

          <NavLink to='/signup'>
            <div className='arrow-link'>
              <div className='arrow-link-text'>Sign Up</div> 
              <div className='arrow-link-arrow'><ArrowForward className="icon" fontSize='small'/></div>
            </div>
          </NavLink>
        </div>

        <div className='home-box b4'>
          Thanks to funding from North of Tyne Culture and Investment Programme: Creative UK, Creative 
          Book Northumberland is able to offer free listings to freelance creatives across Northumberland 
          as well as offering free access to businesses who are looking to collaborate.
        </div>
      </div>

      <div className='home-section-3'>
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
      </div>

    </>
  )

}

export default HomeView;
