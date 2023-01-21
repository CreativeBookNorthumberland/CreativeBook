import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import { useEffect, useState } from 'react'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  pt: 1,
  px: 5,
  pb: 4,
};

export default function EditPortfolioValueModal(props) {

    const [newValue, setNewValue] = useState('')


    useEffect(() => {
        setNewValue(props.initialValue)
    }, [props.initialValue])


    function submit() {
        props.updateCallback(newValue)
        props.closeModal()
    }


    return (
        <div>
            <Modal
                open={props.show}
                onClose={props.closeModal}
            >
                <Box sx={{ ...style, width: 400 }}>
                    <h2 id="modal-title">Edit value</h2>

                    <TextField fullWidth autoFocus value={newValue} size='small' onChange={(e) => {setNewValue(e.target.value)}} />

                    <Button variant='contained' style={{marginTop: '20px'}} onClick={submit}>Submit</Button>
                </Box>
            </Modal>
        </div>
    )
}