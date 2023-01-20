import '../../css/SearchView.css'

import { NavLink } from "react-router-dom"

import Loader from '../misc/Loader'
import PortfolioPreview from '../misc/PortfolioPreview'

import { useEffect, useState } from 'react'

import api from '../../services/api'

function AdminView(props) {

  const [portfolios, setPortfolios] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    props.passwordProtect((password) => {
      api.getAllPortfolios(true, password)
        .then((res) => {
          var portfolios = res.data.res
          setPortfolios(portfolios)
          setLoading(false)
        })
    })
  }, [])


  return (
    <div className='search-view'>

      <h1 className='appear'>Admin panel</h1>

      { loading==true && <div style={{'textAlign': 'center', 'marginTop': '10%'}}><Loader /></div> }

      {portfolios.map((portfolio, index) => (
        <NavLink key={portfolio.CompanyName} to={'/admin/'+portfolio.CompanyName}>
          <div className='appear' style={{'animationDelay': 0.2 + index*0.03 + 's'}}>
            <PortfolioPreview portfolio={portfolio} />
          </div>
        </NavLink>
      ))}

    </div>
  )

}

export default AdminView
