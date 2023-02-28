import './App.css'

import { useLocation, useNavigate, NavLink, Routes, Route, Navigate } from "react-router-dom"
import Menu from '@mui/icons-material/Menu'
import Close from '@mui/icons-material/Close'
import { createTheme, ThemeProvider } from '@mui/material/styles'
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
import CBN_logo from './assets/CBN_logo.jpg'
import CBN_text from './assets/CBN_text.jpg'

function App() {

  const theme = createTheme({
    palette: {
      primary: {
        main: '#397A8C'
      },
      secondary: {
        main: '#7A925E'
      },
      // Provide every color token (light, main, dark, and contrastText) when using
      // custom colors for props in Material UI's components.
      // Then you will be able to use it like this: `<Button color="custom">`
      // (For TypeScript, you need to add module augmentation for the `custom` value)
      custom: {
        light: '#ffa726',
        main: '#f57c00',
        dark: '#ef6c00',
        contrastText: 'rgba(0, 0, 0, 0.87)',
      },
      // Used by `getContrastText()` to maximize the contrast between
      // the background and the text.
      contrastThreshold: 3,
      // Used by the functions below to shift a color's luminance by approximately
      // two indexes within its tonal palette.
      // E.g., shift from Red 500 to Red 300 or Red 700.
      tonalOffset: 0.2,
    },
  })

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
    var no_path_match = true

    for(var key of Object.keys(Sections)) {
      if (location.pathname == Sections[key].path) {
        setSection(key)
        no_path_match = false
      }
    }
    
    if (no_path_match) {
      setSection('')
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
    <ThemeProvider theme={theme}>
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

          <div className='header-title'>
            <img className='logo-img' src={CBN_logo} />
            <img className='text-img' src={CBN_text} />
          </div>
          
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
        
        <div className='footer'>
          Illustrations beautifully created by Daniel J Weatheritt <u><a href='http://www.danielweatheritt.com'>www.danielweatheritt.com</a></u>.
          <br /><br />
          The information on this website is for general informational purposes
          only. Creative Book Northumberland makes no representation or warranty
          for those using the website. Work undertaken between a business and
          the creative is done so at your own discretion. This site may contain
          links to third party content, which we do not warrant, endorse, or
          assume liability for.
        </div>

      </div>
    </ThemeProvider>
  )

}

export default App
