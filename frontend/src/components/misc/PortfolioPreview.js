import '../../css/PortfolioPreview.css'

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
        
            <div className='name'>{props.portfolio.CompanyName}</div>

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

        </div>
    )

}

export default PortfolioPreview
