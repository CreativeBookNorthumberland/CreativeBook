import '../../css/PortfolioView.css'

import { useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom"

import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import AlternateEmail from '@mui/icons-material/AlternateEmail'
import PhoneIcon from '@mui/icons-material/Phone'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import Facebook from '@mui/icons-material/Facebook'
import Instagram from '@mui/icons-material/Instagram'
import Twitter from '@mui/icons-material/Twitter'
import Linkedin from '@mui/icons-material/LinkedIn'
import Link from '@mui/icons-material/Link'

import Loader from '../misc/Loader'

import { Button } from '@mui/material'

import api from '../../services/api'

function PortfolioView(props) {

    var params = useParams()
    const [loading, setLoading] = useState(true)
    const [portfolio, setPortfolio] = useState(null)
    let navigate = useNavigate()


    useEffect(() => {
        if (props.isAdmin == true) {
            props.passwordProtect((password) => {setup(password)})
        } else {
            setup()
        }
    }, [])


    function setup(password='') {
        api.getAllPortfolios(props.isAdmin, password)
        .then((res) => {
            var portfolios = res.data.res
            for (var portfolioIndex in portfolios) {
                var portfolio = portfolios[portfolioIndex]
                portfolio.PrimaryServices = []
                portfolio.SecondaryServices = []
        
                var services = Object.keys(portfolio.Services)
                for (var service_index in services) {
                    var service = services[service_index]
                    if (portfolio.Services[service] == 'Primary') {
                    portfolio.PrimaryServices.push(service)
                    } else {
                    portfolio.SecondaryServices.push(service)
                    }
                }
            }
            setPortfolio(portfolios.filter((el) => {return el.CompanyName == params.CompanyName})[0])
            setLoading(false)
        })
    }


    function adminApprovePortfolio() {
        props.passwordProtect((password) => {
            api.approvePortfolio(portfolio, password)
                .then((res) => {
                    navigate('/admin')
                })
        })
    }


    return (
        <div className='portfolio appear'>

            { props.isAdmin && <div className='admin-bar'>
                <div className='label'>Admin options</div>
                <div className='options'>
                    <Button variant='contained' onClick={adminApprovePortfolio}>Approve</Button>
                </div>
            </div> }

            <div className='portfolio-header'>
                <div className='portfolio-logo'>{ portfolio != null && <img className='appear' src={portfolio.LogoUrl} /> }</div>
                <div className='portfolio-name'>{params.CompanyName}</div>
            </div>

            { loading==true && <div style={{'textAlign': 'center', 'marginTop': '10%'}}><Loader /></div> }

            { portfolio != null && <div className='appear'>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        {portfolio.PhoneNumber!='' && <div className='icon-info icon-text'><PhoneIcon /> <span>{portfolio.PhoneNumber}</span></div>}
                        {portfolio.Email!='' && <div className='icon-info icon-text'><AlternateEmail /> <span>{portfolio.Email}</span></div>}
                        {portfolio.Town!='' && <div className='icon-info icon-text'><LocationOnIcon /> <span>{portfolio.Town}</span></div>}
                        {portfolio.Website!='' && <div className='icon-info icon-text'><Link /> <span>{portfolio.Website}</span></div>}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        {portfolio.Facebook!='' && <div className='icon-info icon-text'><Facebook /> <span>{portfolio.Facebook}</span></div>}
                        {portfolio.Instagram!='' && <div className='icon-info icon-text'><Instagram /> <span>{portfolio.Instagram}</span></div>}
                        {portfolio.Twitter!='' && <div className='icon-info icon-text'><Twitter /> <span>{portfolio.Twitter}</span></div>}
                        {portfolio.Linkedin!='' && <div className='icon-info icon-text'><Linkedin /> <span>{portfolio.Linkedin}</span></div>}
                    </Grid>
                </Grid>

                <Box sx={{ mt: 4, mb: 2 }}>
                    <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1 }}>
                        <Chip label='Primary services' variant='outlined' color='primary' size='small' />
                        {portfolio.PrimaryServices.map((service) => (<Chip key={service} label={service} color='primary' size='small' />))}
                    </Stack>
                </Box>

                <Box>
                    <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1 }}>
                        <Chip label='Secondary services' variant='outlined' color='secondary' size='small' />
                        {portfolio.SecondaryServices.map((service) => (<Chip key={service} label={service} color='secondary' size='small' />))}
                    </Stack>
                </Box>

                <h2>Company description</h2>
                <p>{portfolio.BusinessDescriptionQuestion}</p>

                <h2>Previous work</h2>
                <p>{portfolio.PreviousWorkQuestion}</p>

            </div> }
        </div>
    )

}

export default PortfolioView