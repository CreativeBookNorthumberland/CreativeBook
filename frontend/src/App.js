import './App.css'

import { useLocation, useNavigate, NavLink, Routes, Route, Navigate } from "react-router-dom"

import Menu from '@mui/icons-material/Menu'
import Close from '@mui/icons-material/Close'
import Modal from '@mui/material/Modal'
import IconButton from '@mui/material/IconButton'

import HomeView from './components/views/HomeView'
import PortfolioForm from './components/views/SignUpView'
import SearchView from './components/views/SearchView'
import PortfolioView from './components/views/PortfolioView'
import AboutView from './components/views/AboutView'
import AdminView from './components/views/AdminView'
import PasswordModal from './components/misc/PasswordModal'

import { useEffect, useState } from 'react'

function App() {

  const Sections = {
    About: {
      id: 1,
      name: 'About',
      path: '/about',
      viewComponent: <AboutView />
    },
    ForCreatives: {
      id: 2,
      name: 'Sign up',
      path: '/signup',
      viewComponent: <PortfolioForm />
    },
    ForBusinesses: {
      id: 3,
      name: 'Find creative',
      path: '/search',
      viewComponent: <SearchView />
    },
    Home: {
      id: 4,
      name: 'Home',
      path: '/home',
      viewComponent: <HomeView />
    }
  }


  const [section, setSection] = useState('')
  const [showSections, setShowSections] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [passwordModalCallback, setPasswordModalCallback] = useState({'callback': () => {}})
  let location = useLocation()
  let navigate = useNavigate()


  useEffect(() => {
    for(var key of Object.keys(Sections)) {
      if (location.pathname == Sections[key].path) {
        setSection(key)
      }
    }
  }, [location])


  function passwordProtect(callback) {
    setShowPasswordModal(true)
    setPasswordModalCallback({'callback': callback})
  }
  

  return (
    <div className='app'>

      {/* modals */}
      <PasswordModal show={showPasswordModal} successCallback={passwordModalCallback['callback']} closeModal={() => {setShowPasswordModal(false)}} />

      {/* header */}
      <div className='header'>

        <h1 className='header-title'>Creative Book Northumberland</h1>
        
        {/* Button to open the sections overlay */}
        <div className='open-sections-button'>
          <IconButton onClick={() => {setShowSections(true)}}>
            <Menu fontSize="large"/>
          </IconButton>
        </div>

        <div className={'header-sections' + (showSections==true ? ' open' : ' closed')}>
          
          {/* Button for closing the sections overlay */}
          <div className='close-sections-button'>
            <IconButton onClick={() => {setShowSections(false)}}>
              <Close fontSize="large" sx={{ color: 'white' }} />
            </IconButton>
          </div>

          {Object.keys(Sections).map((key) => (
            <div key={key} className={'section' + (section==key ? ' selected' : '')}>
              <NavLink key={Sections[key].id} to={Sections[key].path}>
                <div onClick={() => {setShowSections(false); setSection(key)}}>{Sections[key].name}</div>
              </NavLink>
            </div>
          ))}

        </div>

      </div>
      
      {/* body of app where views will be displayed */}
      <div className='view-container'>
        <Routes>
          
          {/* Sepcify route for each section */}
          {Object.keys(Sections).map((key) => (
            <Route key={key} path={Sections[key].path} element={<div className='view'>{Sections[key].viewComponent}</div>} />
          ))}

          {/* Route for specific portfolio */}
          <Route path='/search/:CompanyName' element={<div className='view'><PortfolioView isAdmin={false} passwordProtect={passwordProtect} /></div>} />

          {/* Route for admin view */}
          <Route path='/admin' element={<div className='view'><AdminView passwordProtect={passwordProtect} /></div>} />

          {/* Route for admin review of portfolio */}
          <Route path='/admin/:CompanyName' element={<div className='view'><PortfolioView isAdmin={true} passwordProtect={passwordProtect} /></div>} />

          {/* Add catch all route */}
          <Route path='*' element={<Navigate to="/home" />} />

        </Routes>
      </div>
      
    </div>
  )

}

export default App;
