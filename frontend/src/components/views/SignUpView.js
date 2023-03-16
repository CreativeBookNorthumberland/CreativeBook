import '../../css/SignUpView.css'

import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Radio from '@mui/material/Radio'
import Button from '@mui/material/Button'
import Upload from '@mui/icons-material/Upload'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import Clear from '@mui/icons-material/Clear'

import Loader from '../misc/Loader'

import { useEffect, useState } from 'react'

import formValidator from '../../services/formValidator'
import api from '../../services/api'

function PortfolioForm(props) {

  const ServiceLevels = {
    Primary: 'Primary',
    Secondary: 'Secondary'
  }
  var formSchema = new formValidator({
    CompanyName: {
      label: 'Company name',
      initialValue: '',
      validation: notEmpty,
      errorMessage: 'Cannot be empty'
    },
    Email: {
      label: 'Email',
      initialValue: '',
      validation: notEmpty,
      errorMessage: 'Cannot be empty'
    },
    PhoneNumber: {
      label: 'Phone Number',
      initialValue: ''
    },
    Town: {
      label: 'Town',
      initialValue: '',
      validation: notEmpty,
      errorMessage: 'Cannot be empty'
    },
    Blurb: {
      label: 'Blurb (max 15 words)',
      initialValue: '',
      validation: (value) => {return value!='' && value.split(' ').length <= 15},
      errorMessage: 'Cannot be empty and must be less than 15 words'
    },
    Website: {
      label: 'Website',
      initialValue: ''
    },
    Facebook: {
      label: 'Facebook',
      initialValue: ''
    },
    Twitter: {
      label: 'Twitter',
      initialValue: ''
    },
    Instagram: {
      label: 'Instagram',
      initialValue: ''
    },
    Linkedin: {
      label: 'Linkedin',
      initialValue: ''
    },
    Services: {
      label: 'Services',
      initialValue: {},
      validation: validateServices,
      errorMessage: 'Must have at least one primary service and cannot have more than 5 of each'
    },
    BusinessDescriptionQuestion: {
      label: 'Business description',
      initialValue: '',
      validation: (value) => {return value.length <= 1500},
      errorMessage: 'Cannot be more than 1500 characters'
    },
    PreviousWorkQuestion: {
      label: 'Previous work',
      initialValue: '',
      validation: (value) => {return value.length <= 1500},
      errorMessage: 'Cannot be more than 1500 characters'
    }
  })


  const [portfolioForm, setPortfolioForm] = useState(formSchema.generateInitialForm())
  const [logoFile, setLogoFile] = useState(null)
  const [services, setServices] = useState([
    'Graphic design', 'Social media', 'Website design',
    'Copywriting', 'Dance', 'Illustration', 'Music', 'Photography'
  ])
  const [newService, setNewService] = useState('')
  const [workSampleFiles, setWorkSampleFiles] = useState([])
  const [dragActive, setDragActive] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)


  function notEmpty(input) {
    if (input == '' || input == [] || input == null || Object.keys(input).length == 0) {
      return false
    }
    return true
  }

  function validateServices(services) {
    var primaryCount = 0
    var secondayCount = 0
    for (const key in services){
      if (services[key] == 'Primary') {
        primaryCount += 1
      } else {
        secondayCount += 1
      }
    }

    if (primaryCount == 0) {
      return false
    }

    if (primaryCount > 5 || secondayCount > 5) {
      return false
    } else {
      return true
    }
  }

  function generateTextInput(formElementKey, useMultiline=false, rows=4) {
    var formElement = portfolioForm[formElementKey]
    if (!formElement) {
      return
    }

    function updateValue(e) {
      var newValue = e.target.value
      var portfolioFormCopy = {...portfolioForm}
      portfolioFormCopy[formElementKey].value = newValue
      setPortfolioForm(portfolioFormCopy)
    }

    return <TextField
              value={formElement.value}
              error={formElement.isValid==false} 
              id="outlined-basic" 
              fullWidth 
              label={formElement.label} 
              onChange={(e) => {updateValue(e)}}
              multiline={useMultiline}
              rows={rows}
              helperText={formElement.isValid==false ? formElement.errorMessage : ''} />
  }

  function isValidFileSize(file) {
    const fileSize = file.size / 1024 / 1024
    return fileSize <= 3
  }

  function updateLogo(e) {
    var file = e.target.files[0]

    if (!isValidFileSize(file)) {
      props.showSnack('File cannot be more than 3Mb')
      return
    }

    setLogoFile(e.target.files[0])
  }

  function addWorkSample(e) {
    var file = e.target.files[0]

    if (workSampleFiles.length >= 4) {
      props.showSnack('Cannot upload more than 4 work samples')
      return
    }

    if (!isValidFileSize(file)) {
      props.showSnack('File cannot be more than 3Mb')
      return
    }

    setDragActive(false)
    console.log(workSampleFiles)
    setWorkSampleFiles([...workSampleFiles, e.target.files[0]])
  }

  function updateService(service, level) {
    var portfolioFormCopy = {...portfolioForm}
    portfolioFormCopy.Services.value[service] = level
    console.log(portfolioFormCopy)
    setPortfolioForm(portfolioFormCopy)
  }

  function addNewService() {
    if (newService == '') {
      return
    }
    setServices([...services, newService])
    setNewService('')
  }

  function submit() {
    setSubmitLoading(true)

    try {
      var [formValid, portfolioFormCopy] = formSchema.validate(portfolioForm)
      setPortfolioForm(portfolioFormCopy)
      
      if (formValid == false) {
        setSubmitLoading(false)
        return
      }

      const portfolioFormData = new FormData()
      portfolioFormData.append('logo', logoFile)
      for (var file_index in workSampleFiles) {
        portfolioFormData.append(workSampleFiles[file_index].name, workSampleFiles[file_index])
      }
      var portfolioString = JSON.stringify(formSchema.generateValuesDict(portfolioFormCopy))
      portfolioFormData.append('portfolio', portfolioString)
      
      api.postPortfolio(portfolioFormData)
        .then(() => {
          setSubmitted(true)
        })
        .catch((e) => {
          try {
            props.showSnack(e.response.data)
          }
          catch {
            props.showSnack('There was an issue while uploading your portfolio')
          }
        })
        .finally(() => {
          setSubmitLoading(false)
        })
    }
    catch(e) {
      props.showSnack('There was an issue while submitting')
      setSubmitLoading(false)
    }
  }


  return (
    <div className='portfolio-form'>

      {submitted == true && <>
        <h2>Submitted</h2>
        <p>Thank you for signing up! We will review your profile shortly and if there are no 
          issues we will approve it and display it on our search page.</p>
      </>}

      {submitted == false && <>

        <h1>Sign up to have your creative business listed</h1>
        <p className='edit-notice'>If you wish to make amends to an existing portofolio, 
          please contact info@creativebooknorthumberland.com</p>

        <h2>Basic info</h2>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div className='logo-upload'>
              <div className='logo-preview-container'>
                <div className='logo-preview-container-inner'>
                  <img className='logo-preview' src={logoFile==null ? '' : URL.createObjectURL(logoFile)} />
                </div>
                {logoFile!=null && <div className='logo-remove' onClick={() => {setLogoFile(null)}}><Clear /></div>}
              </div>
              <Button className='upload-button' variant='contained'>
                <input type="file" accept='.png,.jpg,.jpeg' onChange={(e) => {updateLogo(e)}}/>
                <Upload /> <span>Upload logo</span>
              </Button>
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            {generateTextInput('CompanyName')}
          </Grid>
          <Grid item xs={12} sm={6}>
            {generateTextInput('Email')}
          </Grid>
          <Grid item xs={12} sm={6}>
            {generateTextInput('PhoneNumber')}
          </Grid>
          <Grid item xs={12} sm={6}>
            {generateTextInput('Town')}
          </Grid>
          <Grid item xs={12} sm={12}>
            {generateTextInput('Blurb', true, 2)}
          </Grid>
        </Grid>

        <h2>Social links</h2>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            {generateTextInput('Website')}
          </Grid>
          <Grid item xs={12} sm={6}>
            {generateTextInput('Facebook')}
          </Grid>
          <Grid item xs={12} sm={6}>
            {generateTextInput('Twitter')}
          </Grid>
          <Grid item xs={12} sm={6}>
            {generateTextInput('Instagram')}
          </Grid>
          <Grid item xs={12} sm={6}>
            {generateTextInput('Linkedin')}
          </Grid>
        </Grid>

        <h2>Services</h2>
        {portfolioForm['Services'].isValid==false && <div className='error-msg'>{portfolioForm['Services'].errorMessage}</div>}
        <Grid container spacing={2} sx={{marginLeft: '0px'}}>

          <Grid container>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>Primary</Grid>
            <Grid item xs={4}>Secondary</Grid>
          </Grid>

          {services.map((service, index) => (
            <Grid key={service} container sx={{backgroundColor: index%2==0 ? 'rgba(var(--secondary-color), 0.2)' : 'transparent'}}>
              <Grid item xs={4} sx={{paddingTop: '10px', paddingLeft: '10px'}}>{service}</Grid>
              <Grid item xs={4}><Radio checked={portfolioForm.Services.value[service] == ServiceLevels.Primary} onClick={() => {updateService(service, ServiceLevels.Primary)}} /></Grid>
              <Grid item xs={4}><Radio checked={portfolioForm.Services.value[service] == ServiceLevels.Secondary} onClick={() => {updateService(service, ServiceLevels.Secondary)}}/></Grid>
            </Grid>
          ))}
          
          <Grid item xs={12}></Grid>
          <Grid container>
            <Grid item xs={12}>
              <span><b>Add a service:</b></span>
              <TextField value={newService} id="outlined-basic" style={{'margin': '0px 20px 0px 20px'}} size='small' onChange={(e) => {setNewService(e.target.value)}} />
              <Button variant='contained' onClick={addNewService}>Add</Button>
            </Grid>
          </Grid>

        </Grid>

        <h2>Business info</h2>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h3>Tell us about yourself and your business (max 1500 characters)</h3>
            {generateTextInput('BusinessDescriptionQuestion', true)}
          </Grid>
          <Grid item xs={12}>
            <h3>Please let us know who you've previously worked with or what types of businesses you've worked with (max 1500 characters)</h3>
            {generateTextInput('PreviousWorkQuestion', true)}
          </Grid>
        </Grid>

        <h2>Work samples</h2>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div className={'document-upload' + (dragActive ? ' drag-active' : '') }
              onDragEnter={() => {setDragActive(true)}} 
              onDragExit={() => {setDragActive(false)}}
              onDragEnd={() => {setDragActive(false)}}>
              <input type="file" onChange={(e) => {addWorkSample(e)}}/>
              <div className='form-upload icon-text'><Upload /> <span>Upload any work samples</span></div>
            </div>
            { workSampleFiles.length > 0 && <div className='files-preview'>
              {workSampleFiles.map((file) => (
                <div key={file.name} className='file-container'>
                  <div className='file'>
                    <div className='file-icon'><InsertDriveFileIcon fontSize='large' /></div>
                    <div className='file-name'>{file.name}</div>
                  </div>
                </div>
              ))}
            </div> }
          </Grid>
        </Grid>

        <Button style={{'marginTop': '60px'}} variant='contained' disabled={submitted || submitLoading} onClick={submit} disableElevation>
          { submitLoading==true ? <Loader color='white' /> : 'Submit' }
        </Button>

      </> }

    </div>
  )

}

export default PortfolioForm
