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

function SearchView(props) {

  const [loading, setLoading] = useState(true)
  const [portfolios, setPortfolios] = useState([])
  const [filteredPortfolios, setFilteredPortfolios] = useState([])
  const [services, setServices] = useState([])
  const [filters, setFilters] = useState({
    'name': '',
    'services': []
  })


  useEffect(() => {
    if (props.filters['services']) {
      
      for (var service in filters.services) {
        if (services.includes(service) == false) {
          var newServices = [...services]
          newServices.push(service)
          setServices(newServices)
        }
      }

      var newFilters = {...filters}
      newFilters['services'] = newFilters['services'].concat(props.filters['services'])
      setFilters(newFilters)
    }
  }, [props.filters])


  useEffect(() => {
    api.getAllPortfolios()
      .then((res) => {

        var portfolios = res.data.res
        var servicesSet = new Set()

        for (var portfolioIndex in portfolios) {
          var portfolio = portfolios[portfolioIndex]
          portfolio.PrimaryServices = []
          portfolio.SecondaryServices = []

          var new_services = Object.keys(portfolio.Services)
          for (var service_index in new_services) {
            var service = new_services[service_index]
            servicesSet.add(service)
            if (portfolio.Services[service] == 'Primary') {
              portfolio.PrimaryServices.push(service)
            } else {
              portfolio.SecondaryServices.push(service)
            }
          }
          for (var service in props.filters['services']) {
            console.log(service)
            servicesSet.add(props.filters['services'][service])
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
    console.log(filters)

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

  }, [filters, portfolios])


  return (
    <div className='search-view'>

      <div className='filters'>

        <TextField
          label='Search by name'
          size='small'
          fullWidth={window.innerWidth<700}
          InputProps={{
            startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
          }}
          onChange={(e) => {setFilters({...filters, 'name': e.target.value})}}
        />

        <Autocomplete
          multiple
          sx={{ 
            display: 'inline-block', 
            ml: (window.innerWidth<700 ? 0 : 2),
            mt: (window.innerWidth<700 ? 2 : 0),
            width: (window.innerWidth<700 ? '100%' : 300) }}
          size='small'
          options={services}
          value={filters.services}
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

      { loading==false && filteredPortfolios.length==0 && <div style={{'textAlign': 'center', 'marginTop': '10%'}}>No results</div> }

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
