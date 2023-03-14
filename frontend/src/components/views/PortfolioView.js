import '../../css/PortfolioView.css'

import { useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom"

import { Button } from '@mui/material'
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
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'

import Loader from '../misc/Loader'
import EditPortfolioValueModal from '../misc/EditPortfolioValueModal'

import api from '../../services/api'

function PortfolioView(props) {

    var params = useParams()
    const [loading, setLoading] = useState(true)
    const [portfolio, setPortfolio] = useState(null)
    const [showEditPortfolioValueModal, setShowEditPortfolioValueModal] = useState(false)
    const [editPortfolioAttribute, setEditPortfolioAttribute] = useState('')
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

    function showEditModal(key) {
        setEditPortfolioAttribute(key)
        setShowEditPortfolioValueModal(true)
    }

    function updatePortfolioValue(newValue) {
        var newPortfolio = {...portfolio}
        newPortfolio[editPortfolioAttribute] = newValue
        setPortfolio(newPortfolio)
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

            <EditPortfolioValueModal show={showEditPortfolioValueModal} closeModal={() => {setShowEditPortfolioValueModal(false)}} 
                updateCallback={updatePortfolioValue} initialValue={portfolio ? portfolio[editPortfolioAttribute] : ''} />


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

                <Grid container spacing={0}>
                    <Grid item xs={12} sm={6}>
                        {(props.isAdmin || portfolio.PhoneNumber!='') && <div className='icon-info icon-text'>
                            <PhoneIcon /> <span>{portfolio.PhoneNumber}</span> 
                            {props.isAdmin && <Button size='small' sx={{ml: 2}} onClick={() => {showEditModal('PhoneNumber')}}>Edit</Button>}
                        </div>}

                        {(props.isAdmin || portfolio.Email!='') && <div className='icon-info icon-text'>
                            <AlternateEmail /> <span>{portfolio.Email}</span>
                            {props.isAdmin && <Button size='small' sx={{ml: 2}} onClick={() => {showEditModal('Email')}}>Edit</Button>}
                        </div>}

                        {(props.isAdmin || portfolio.Town!='') && <div className='icon-info icon-text'>
                            <LocationOnIcon /> <span>{portfolio.Town}</span>
                            {props.isAdmin && <Button size='small' sx={{ml: 2}} onClick={() => {showEditModal('Town')}}>Edit</Button>}
                        </div>}

                        {(props.isAdmin || portfolio.Website!='') && <div className='icon-info icon-text'>
                            <Link /> <span><u><a href={portfolio.Website}>{portfolio.Website}</a></u></span>
                            {props.isAdmin && <Button size='small' sx={{ml: 2}} onClick={() => {showEditModal('Website')}}>Edit</Button>}
                        </div>}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        {(props.isAdmin || portfolio.Facebook!='') && <div className='icon-info icon-text'>
                            <Facebook /> <span><u><a href={portfolio.Facebook}>{portfolio.Facebook}</a></u></span>
                            {props.isAdmin && <Button size='small' sx={{ml: 2}} onClick={() => {showEditModal('Facebook')}}>Edit</Button>}
                        </div>}
                        
                        {(props.isAdmin || portfolio.Instagram!='') && <div className='icon-info icon-text'>
                            <Instagram /> <span><u><a href={portfolio.Instagram}>{portfolio.Instagram}</a></u></span>
                            {props.isAdmin && <Button size='small' sx={{ml: 2}} onClick={() => {showEditModal('Instagram')}}>Edit</Button>}
                        </div>}
                        
                        {(props.isAdmin || portfolio.Twitter!='') && <div className='icon-info icon-text'>
                            <Twitter /> <span><u><a href={portfolio.Twitter}>{portfolio.Twitter}</a></u></span>
                            {props.isAdmin && <Button size='small' sx={{ml: 2}} onClick={() => {showEditModal('Twitter')}}>Edit</Button>}
                        </div>}
                        
                        {(props.isAdmin || portfolio.Linkedin!='') && <div className='icon-info icon-text'>
                            <Linkedin /> <span><u><a href={portfolio.Linkedin}>{portfolio.Linkedin}</a></u></span>
                            {props.isAdmin && <Button size='small' sx={{ml: 2}} onClick={() => {showEditModal('Linkedin')}}>Edit</Button>}
                        </div>}
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

                {(props.isAdmin || portfolio.BusinessDescriptionQuestion != '') && <>
                    <h2>Company description</h2>
                    <p>{portfolio.BusinessDescriptionQuestion}</p>
                    {props.isAdmin && <Button size='small' sx={{ml: 2}} onClick={() => {showEditModal('BusinessDescriptionQuestion')}}>Edit</Button>}
                </>}

                {(props.isAdmin || portfolio.PreviousWorkQuestion != '') && <>
                    <h2>Previous work</h2>
                    <p>{portfolio.PreviousWorkQuestion}</p>
                    {props.isAdmin && <Button size='small' sx={{ml: 2}} onClick={() => {showEditModal('PreviousWorkQuestion')}}>Edit</Button>}
                </>}

                {portfolio.WorkSampleNames.length > 0 && <>
                    <h2>Work samples</h2>
                    { portfolio.WorkSampleNames.map((WorkSampleName, index) => (
                        <a className='work-sample' href={portfolio.WorkSampleLinks[index]}>
                            <div className='work-sample-icon'><InsertDriveFileIcon /></div>
                            <div className='work-sample-name'>{WorkSampleName}</div>
                        </a>
                    )) }
                </>}


            </div> }
        </div>
    )

}

export default PortfolioView