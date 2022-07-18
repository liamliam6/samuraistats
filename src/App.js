import React, { useState, useEffect } from 'react';
import Nav from './components/nav.js';
import Stats from './components/stats.js';
//import Leaderboard from './components/leaderboard.js';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
//import Typography from '@mui/material/Typography';

const App = () => {

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60vw',
    height: '50vw',
    maxHeight: '800px',
    overflow: 'scroll',
    overflowX: 'hidden',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


  const wallets = localStorage.getItem('wallets');

  const [walletList, setWallets] = useState(null);

  const [open, setOpen] = React.useState(false);
  //const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setWallets()
  }, [walletList])

  let wArr = [];

  if (wallets) {
    wArr = wallets.split(',');
  }

  
  const reset = function () {
    localStorage.removeItem('wallets');
    console.log('reloading');
    window.location.reload(false);
    
  }
  
  const add = function () {
    let curr = localStorage.getItem('wallets');
    if (wallets) {
      const walletInput = document.getElementById('walletInput').value;
      if (walletInput.length === 42 && !curr.split(',').includes(walletInput)) {
        localStorage.setItem('wallets', curr + ',' + document.getElementById('walletInput').value)
      }
    }
    else {
      localStorage.setItem('wallets', document.getElementById('walletInput').value)
    }
    
    window.location.reload(false);
  }
  
  const remove = function (walletToRemove) {
    let curr = localStorage.getItem('wallets');
    console.log(`curr ${JSON.stringify(curr)} | WTR ${walletToRemove}`)
    if (wallets) {
        const newWallets = curr.split(',').filter(w => w !== walletToRemove);
        console.log('newWallets', newWallets);
        localStorage.setItem('wallets', newWallets.join(','))
    }
    
    window.location.reload(false)
  }

  const getStats = wArr.map((w) =>
    <Stats key={w} wallet={w} onRemove={remove} />
  )
  
  if (wallets) {
    return (
      <div>
        <Nav />
        <br></br>
        <Container>
          <Grid container spacing={1}>
            <Grid container item xs={7} md={10} lg={10}>
              <div>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={modalStyle}>
                    Leaderboard
                  </Box>
                </Modal>
              </div>
              <TextField
                id="walletInput"
                label="Wallet Address"
                sx={{
                  background: "#959595",
                  border: "1px solid white",
                  borderRadius: "4px",
                }}
                fullWidth
              />
            </Grid>
            <Grid container item xs={5} md={2} lg={2}>
              <ButtonGroup
                variant="contained"
                aria-label="outlined primary button group"
                sx={{
                  background: "#959595",
                  border: "1px solid white",
                  color: "white",
                }}
              >
                <Button onClick={add}>Add</Button>
                <Button
                  variant="outlined"
                  onClick={reset}
                  sx={{ color: "white" }}
                >
                  Reset
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Container>
        <Container>
          <div>{getStats}</div>
        </Container>
      </div>
    );
  } else {
    return (
      <div>

        <Nav />
        <br></br>
        <Container >
          <Grid container spacing={1}>
            <Grid container item xs={7} md={10} lg={10}>
              <TextField id="walletInput" label="Wallet Address" sx={{
                background: "#959595",
                border: "1px solid white",
                borderRadius: "4px",
              }} fullWidth />
            </Grid>
            <Grid container item xs={5} md={2} lg={2}>
              <ButtonGroup
                variant="contained"
                aria-label="outlined primary button group">
                <Button onClick={add}>Add</Button>
                <Button variant="outlined" onClick={reset}>Reset</Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default App;