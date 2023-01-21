import './App.css'

import { useLocation, useNavigate, NavLink, Routes, Route, Navigate } from "react-router-dom"
import Menu from '@mui/icons-material/Menu'
import Close from '@mui/icons-material/Close'
import Snackbar from '@mui/material/Snackbar'
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
      viewComponent: <AboutView showSnack={showSnack} />
    },
    ForCreatives: {
      id: 2,
      name: 'Sign up',
      path: '/signup',
      viewComponent: <PortfolioForm showSnack={showSnack} />
    },
    ForBusinesses: {
      id: 3,
      name: 'Find creative',
      path: '/search',
      viewComponent: <SearchView showSnack={showSnack} />
    },
    Home: {
      id: 4,
      name: 'Home',
      path: '/home',
      viewComponent: <HomeView showSnack={showSnack} />
    }
  }


  const [snackData, setSnackData] = useState({show: false, text: ''})
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


  function showSnack(message) {
    setSnackData({show: true, text: message})
  }

  function passwordProtect(callback) {
    setShowPasswordModal(true)
    setPasswordModalCallback({'callback': callback})
  }
  

  return (
    <div className='app'>

      <Snackbar
        open={snackData.show}
        autoHideDuration={6000}
        onClose={() => {setSnackData({...snackData, show: false})}}
        message={snackData.text}
      />

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
              <NavLink key={Sections[key].id} to={Sections[key].path}>
                <div key={key} className={'section' + (section==key ? ' selected' : '')}>
                  <div onClick={() => {setShowSections(false); setSection(key)}}>{Sections[key].name}</div>
                </div>
              </NavLink>
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
          <Route path='/search/:CompanyName' element={<div className='view'><PortfolioView isAdmin={false} showSnack={showSnack} passwordProtect={passwordProtect} /></div>} />

          {/* Route for admin view */}
          <Route path='/admin' element={<div className='view'><AdminView showSnack={showSnack} passwordProtect={passwordProtect} /></div>} />

          {/* Route for admin review of portfolio */}
          <Route path='/admin/:CompanyName' element={<div className='view'><PortfolioView isAdmin={true} showSnack={showSnack} passwordProtect={passwordProtect} /></div>} />

          {/* Add catch all route */}
          <Route path='*' element={<Navigate to="/home" />} />

        </Routes>
      </div>
      
    </div>
  )

}

export default App;
