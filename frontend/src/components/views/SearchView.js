import '../../css/SearchView.css'

import { NavLink } from "react-router-dom"
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import SearchIcon from '@mui/icons-material/Search'
import FilterAlt from '@mui/icons-material/FilterAlt'

import Loader from '../misc/Loader'
import PortfolioPreview from '../misc/PortfolioPreview'

import { useEffect, useState } from 'react'

import api from '../../services/api'

function SearchView() {

  const [loading, setLoading] = useState(true)
  const [portfolios, setPortfolios] = useState([])
  const [filteredPortfolios, setFilteredPortfolios] = useState([])
  const [services, setServices] = useState([])
  const [filters, setFilters] = useState({
    'name': '',
    'services': []
  })


  useEffect(() => {
    api.getAllPortfolios()
      .then((res) => {

        var portfolios = res.data.res
        var servicesSet = new Set()

        for (var portfolioIndex in portfolios) {
          var portfolio = portfolios[portfolioIndex]
          portfolio.PrimaryServices = []
          portfolio.SecondaryServices = []

          var services = Object.keys(portfolio.Services)
          for (var service_index in services) {
            var service = services[service_index]
            servicesSet.add(service)
            if (portfolio.Services[service] == 'Primary') {
              portfolio.PrimaryServices.push(service)
            } else {
              portfolio.SecondaryServices.push(service)
            }
          }

        }

        setPortfolios(portfolios)
        setFilteredPortfolios(portfolios)
        setServices(Array.from(servicesSet))
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    
    var newFilteredPortfolios = [...portfolios]

    // filter by name
    if (filters.name != '') {
      newFilteredPortfolios = newFilteredPortfolios.filter((portfolio) => {
        return portfolio.CompanyName.toLowerCase().includes(filters.name.toLowerCase())
      })
    }

    // filter by service
    for (var filterService of filters.services) {
      newFilteredPortfolios = newFilteredPortfolios.filter((portfolio) => {
        return Object.keys(portfolio.Services).includes(filterService)
      })
    }

    setFilteredPortfolios(newFilteredPortfolios)

  }, [filters])


  return (
    <div className='search-view'>

      <div className='filters'>

        <TextField
          label='Search by name'
          size='small'
          InputProps={{
            startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
          }}
          onChange={(e) => {setFilters({...filters, 'name': e.target.value})}}
        />

        <Autocomplete
          multiple
          sx={{ display: 'inline-block', ml: 2, width: 300 }}
          size='small'
          options={services}
          getOptionLabel={option => option}
          onChange={(event, newServices) => {
            setFilters({...filters, 'services': newServices})
          }}
          renderInput={params => {
            return (
              <TextField
                {...params}
                label="Filter by service"
                fullWidth
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <>
                      <InputAdornment position="start">
                        <FilterAlt />
                      </InputAdornment>
                      {params.InputProps.startAdornment}
                    </>
                  )
                }}
              />
            );
          }}
        />

      </div>

      { loading==true && <div style={{'textAlign': 'center', 'marginTop': '10%'}}><Loader /></div> }

      {filteredPortfolios.map((portfolio, index) => (
        <NavLink key={portfolio.CompanyName} to={'/search/'+portfolio.CompanyName}>
          <div className='appear' style={{'animationDelay': 0.2 + index*0.03 + 's'}}>
            <PortfolioPreview portfolio={portfolio} />
          </div>
        </NavLink>
      ))}

    </div>
  )

}

export default SearchView;
