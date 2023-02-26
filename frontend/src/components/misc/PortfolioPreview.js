import '../../css/PortfolioPreview.css'

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'

import { useEffect, useState } from 'react'

function PortfolioPreview(props) {

    const [primaryServices, setPrimaryServices] = useState([])
    const [secondaryServices, setSecondaryServices] = useState([])


    useEffect(() => {
        var services = Object.keys(props.portfolio.Services)

        var primaryServicesTemp = []
        var secondaryServicesTemp = []

        for (var service_index in services) {
            var service = services[service_index]
            if (props.portfolio.Services[service] == 'Primary') {
                primaryServicesTemp.push(service)
            } else {
                secondaryServicesTemp.push(service)
            }
        }

        setPrimaryServices(primaryServicesTemp)
        setSecondaryServices(secondaryServicesTemp)
    }, [props.portfolio])

    return (
        <div className='portfolio-preview'>
            
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={6}>
                    <div>
                        <div className='logo'><img className='appear' src={props.portfolio.LogoUrl} /></div>
                        <div className='name'>
                            <h1>{props.portfolio.CompanyName}</h1>
                            <h2>{props.portfolio.Blurb}</h2>
                        </div>
                    </div>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Box sx={{ mb: 2 }}>
                        <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1 }}>
                            <Chip label='Primary services' variant='outlined' color='primary' size='small' />
                            {primaryServices.map((service) => (<Chip key={service} label={service} color='primary' size='small' />))}
                        </Stack>
                    </Box>

                    <Box>
                        <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1 }}>
                            <Chip label='Secondary services' variant='outlined' color='secondary' size='small' />
                            {secondaryServices.map((service) => (<Chip key={service} label={service} color='secondary' size='small' />))}
                        </Stack>
                    </Box>
                </Grid>

            </Grid>

        </div>
    )

}

export default PortfolioPreview
