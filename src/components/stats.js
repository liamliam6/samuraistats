import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import './fonts.css';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Stack from "@mui/material/Stack";
import LinearProgress from '@mui/material/LinearProgress';
import Link from '@mui/material/Link';
import { DeleteForever } from '@mui/icons-material';
//import Slider from '@mui/material/Slider';

function Stats({ wallet, onRemove }) {

  const earningsUrl = `https://api.risingsun.finance/earnings/${wallet}`;
  const energyUrl = `https://api.risingsun.finance/energy/${wallet}`;
  const deckUrl = `https://api.risingsun.finance/v2/samurai/deckmetadata/${wallet}`;
  const totalUrl = `https://api.risingsun.finance/earnings/total`;
  const winUrl = `https://samurailegends.dev/game/samurai-rising/game-result/last/${wallet}/7d`;
  const landUrl = `https://api.risingsun.finance/lands/deckmetadata/${wallet}`;
  //const rankUrl       = `https://gameserver.samurairising.app/ranks/${wallet}`;
  //const leaderUrl     = `https://gameserver.samurairising.app/ranks/`;

  const [data, setData] = useState(null);

  let earningId = 'earning' + wallet;
  let earningPop = 'pop' + wallet;
  let earningHolder = document.getElementById(earningId) ? document.getElementById(earningId).innerHTML : 0;

  useEffect(() => {

    const interval = setInterval(() => {

      axios
        .all([axios.get(earningsUrl), axios.get(energyUrl), axios.get(deckUrl), axios.get(totalUrl), axios.get(winUrl), axios.get(landUrl)])//
        .then(res => {
          //console.log('setting data');
          setData(res);
          //console.log(res)
        })
        .catch((errors) => {
          console.log('Error vvv')
          console.log(errors);
        });
    }, 5000);
    return () => clearInterval(interval);

  }, [earningsUrl, energyUrl, deckUrl, totalUrl, winUrl, landUrl])//

  if (data) {
    //console.log(data);

    /*function getSubDiv(s){
      if(s === 'I'){
        return '1';
      }
      if(s === 'II'){
        return '2';
      }
      if(s === 'III'){
        return '3';
      }
      if(s === 'IV'){
        return '4';
      }
      if(s === 'V'){
        return '5';
      }
    }*/

    const todayEarnings = data[0].data.today_earnings;
    const totalEarnings = data[0].data.total_earnings;
    const currentEnergy = data[1].data.current_energy;
    const maxEnergy = data[1].data.max_energy;
    const maxPotential = data[1].data.max_card_energy;
    const minEnergy = data[1].data.min_card_energy;
    const unlocked = maxEnergy - minEnergy;
    const locked = maxPotential - maxEnergy;
    const calculateNrg = (unlocked / (unlocked + locked)) * 100;
    const stakeText = (maxPotential - maxEnergy) === 0 ? 'Fully unlocked!' : 'Stake to unlock more';
    const samurai = data[2].data;
    const totalRes = data[3].data;
    const ratio = totalRes.estimatedPointRatio;
    const winRates = data[4].data;//
    const winTotal = winRates.hasOwnProperty('winner') ? winRates.winner.total : 0;
    const lossTotal = winRates.hasOwnProperty('loser') ? winRates.loser.total : 0;
    const gameTotal = winTotal+lossTotal;
    const winRatio = ((winTotal / gameTotal)*100).toFixed(2) || 0;
    const lands = data[5].data;
    //console.log('Lands...');
    //console.log(lands);
    //console.log('winTotal: '+winTotal);
    //console.log('lossTotal: '+lossTotal);
    //console.log('winRatio: '+winRatio);
    let genCount = 0;
    //const ranks         = data[3].data;
    //const rankImg       = ranks.division.toLowerCase() + getSubDiv(ranks.subdivision) +'.png';
    //const rank          = ranks.rank;
    //const rewards       = ranks.rewards;




    const totalSamurai = samurai.length;
    const walletLink = 'https://bscscan.com/address/' + wallet;
    const walletTrunc = wallet.replace(wallet.substring(6, 38), "...");

    let diff = todayEarnings - earningHolder;
    //let open;
    if (diff === 0) {
      diff = null;
      //open = false
    }

    if (diff !== 0 && diff !== null) {
      //open = true;
      diff = '+' + diff;
    }

    let energyCalc = 0;

    for (var r = 0; r < samurai.length; r++) {
      var tier = samurai[r].image_properties.rare_tier;
      var id = samurai[r].id;

      if (id < 5000) {
        genCount++;
      }

      if (tier === 1) {
        energyCalc = energyCalc + 20;
      }
      if (tier === 2) {
        energyCalc = energyCalc + 30;
      }
      if (tier === 3) {
        energyCalc = energyCalc + 40;
      }
      if (tier === 4) {
        energyCalc = energyCalc + 60;
      }
      if (tier === 5) {
        energyCalc = energyCalc + 80;
      }
    }

    //console.log('Energy Counter')
    //console.log(energyCalc);

    function timeConvert(n) {
      var num = n;
      var hours = (num / 60);
      var rhours = Math.floor(hours);
      var minutes = (hours - rhours) * 60;
      var rminutes = Math.round(minutes);
      return "Next refill: " + rhours + " hour(s) " + rminutes + " minute(s)";
    }

    let d = new Date();
    let yr = d.getUTCFullYear();
    let day = d.getUTCDate();
    let mon = d.getUTCMonth();
    let h = d.getUTCHours();
    let min = d.getUTCMinutes();
    let sec = d.getUTCSeconds();

    let calc = new Date(yr, mon, day, h, min, sec);

    let multiplier = 0;

    let msDiff = 0;

    if (h >= 0 && h < 6) {
      multiplier = 1;
      let m1 = new Date(yr, mon, day, 6, 0, 0);
      msDiff = (m1 - calc);
    }
    else if (h >= 6 && h < 12) {
      multiplier = 2;
      let m2 = new Date(yr, mon, day, 12, 0, 0);
      msDiff = (m2 - calc);
    }
    else if (h >= 12 && h < 18) {
      multiplier = 3;
      let m3 = new Date(yr, mon, day, 18, 0, 0);
      msDiff = (m3 - calc);
    }
    else {
      multiplier = 4;
      let m4 = new Date(yr, mon, day, 0, 0, 0);
      m4 = m4.setDate(m4.getDate() + 1);
      msDiff = (m4 - calc);
    }
    //console.log(multiplier);

    let diffMins = Math.floor(msDiff / 60000);

    let nextRefill = timeConvert(diffMins);

    const checkLand = function (l) {

      if(lands.length > 0){

        for(var i=0;i<lands.length;i++){
          
          document.write
          (`
          <div style="display:inline-grid;min-width:24%">
          <iframe src="https://land.samurairising.app/${lands[i].id}" width="100%" height="700" style="border:1px solid black;">
          </iframe>
          </div>
          `)
        }

        

      }

    }

    const downloadCsv = function (e) {

      let csv = "Id,Available Recruits,Element,Tier,Power,Item Score,Energy\n";

      for (var i = 0; i < samurai.length; i++) {
        var id = samurai[i].id;
        var recruits = samurai[i].image_properties.available_recruits;
        var element = samurai[i].image_properties.element;
        var itemscore = samurai[i].image_properties.rare_power;
        var power = samurai[i].image_properties.power;
        var tier = samurai[i].image_properties.rare_tier;
        var energy = 0;

        if (tier === 1) {
          energy = 20;
        }
        if (tier === 2) {
          energy = 30;
        }
        if (tier === 3) {
          energy = 40;
        }
        if (tier === 4) {
          energy = 60;
        }
        if (tier === 5) {
          energy = 80;
        }

        if (id < 5000) {
          energy = energy * 1.5;
        }

        csv +=
          id +
          "," +
          recruits +
          "," +
          element +
          "," +
          tier +
          "," +
          power +
          "," +
          itemscore +
          "," +
          energy +
          "\n";

      }

      var csvBtn = document.createElement('a');
      var csvContent = csv;
      var blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      var url = URL.createObjectURL(blob);

      csvBtn.href = url;
      csvBtn.setAttribute("download", "data.csv");
      csvBtn.click();

    }


    return (
      <Box
        sx={{
          border: "2px solid #bfc1d0;",
          borderRadius: "4px;",
          marginTop: "10px",
          marginBottom: "10px",
          padding: "16px;",
        }}
      >
        <Grid container spacing={0} justify="flex-end" alignItems="center">
          <Grid item xs={12} lg={4}>
            <Typography variant="caption" display="block">
              <Link href={walletLink} target="_blank" rel="noopener">{walletTrunc} (view on bscscan)</Link>
            </Typography>
          </Grid>
          <Grid item xs={8} lg={4} >
            <Typography variant="h6" align="center" sx={{ 'fontWeight': '600' }}>
              Samurai: {totalSamurai - genCount} Generals: {genCount} ({totalSamurai})
            </Typography>
          </Grid>
          <Grid item xs={4} lg={4}>
            <Stack direction="row" justifyContent="end">
              <ButtonGroup
                variant="contained"
                size="small"
              >
                <Button color='error' sx={{ backgroundColor: 'red' }} onClick={() => onRemove(wallet)}><DeleteForever /></Button>
                <Button id={wallet} sx={{ 'backgroundColor': '#28a745' }} onClick={downloadCsv}>Export .csv</Button>
                <Button id={wallet} sx={{ 'backgroundColor': '#b256ff' }} onClick={checkLand}>Check Land</Button>
              </ButtonGroup>
            </Stack>
          </Grid>
        </Grid>
        <br></br>
        <Grid container spacing={1} alignItems="center">


          <Grid item xs={12} lg={6} >
            <Typography variant="h6" align="center" sx={{ 'fontWeight': '600' }}>
              KOKU Earnings
              <Typography variant="body1" align="center" sx={{ 'marginBottom': '5px' }} >
                (~${(ratio * 0.004).toFixed(5)}/KOKU Point)
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={5} lg={5}>

                  <Grid container spacing={0} >
                    <Grid item xs={6} lg={6}>

                      <div id={earningPop} style={{ 'animation': 'shrinkjump 5s ease-in-out', 'animationIterationCount': 'infinite', 'transformOrigin': 'bottom right', 'display': 'inline', 'position': 'fixed', 'color': '#28a745' }}>{diff}</div>


                      <Typography id={earningId} variant="h6" align="right" sx={{ 'fontWeight': '600' }}>
                        {todayEarnings}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} lg={6}>
                      <Typography variant="h6" align="left" sx={{ 'fontWeight': '600', 'color': '#28a745' }}>
                        (${((todayEarnings * 0.004) * ratio).toFixed(2)})
                      </Typography>
                    </Grid>
                  </Grid>

                  <Typography variant="h6" align="center" sx={{ 'fontWeight': '600' }}>
                    This Week
                  </Typography>
                </Grid>
                <Grid item xs={7} lg={7}>
                  <Grid container spacing={0}>
                    <Grid item xs={12} lg={12}>
                      <Typography variant="h6" align="center" sx={{ 'fontWeight': '600' }}>
                        {totalEarnings}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} lg={6}>
                      <Typography variant="h6" align="left" sx={{ 'fontWeight': '600', 'color': '#28a745' }}>

                      </Typography>
                    </Grid>
                  </Grid>

                  <Typography variant="h6" align="center" sx={{ 'fontWeight': '600' }}>
                    Lifetime
                  </Typography>
                </Grid>
              </Grid>
            </Typography>
            <Typography variant="body1" align="center" sx={{ 'marginBottom': '5px' }} >
              Next payout @ Friday 08:00 UTC<br />
              $ Values are estimated and subject to change<br />
              Estimated KOKU pending: <b>{(todayEarnings * ratio).toFixed(0)}</b>
            </Typography>
          </Grid>


          <Grid item xs={12} lg={6}>
            <Typography variant="h6" align="center" sx={{ 'fontWeight': '600' }}>
              Energy
              <Typography variant="body1" align="center" sx={{ 'marginBottom': '5px' }} >
                {nextRefill}
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={6} lg={6}>
                  <Typography id={earningId} variant="h6" align="center" sx={{ 'fontWeight': '600' }}>
                    {currentEnergy}
                  </Typography>
                  <Typography variant="h6" align="center" sx={{ 'fontWeight': '600' }}>
                    Current
                  </Typography>
                </Grid>
                <Grid item xs={6} lg={6}>
                  <Typography variant="h6" align="center" sx={{ 'fontWeight': '600' }}>
                    {maxEnergy}
                  </Typography>
                  <Typography variant="h6" align="center" sx={{ 'fontWeight': '600' }}>
                    Max
                  </Typography>
                </Grid>
              </Grid>
            </Typography>
            <LinearProgress variant="determinate" value={parseFloat(((currentEnergy / maxEnergy) * 100).toFixed(0))} />

            <Grid container spacing={2}>
              <Grid item xs={6} lg={6}>
                <Typography id={earningId} variant="body1" align="center" sx={{ 'fontWeight': '600' }}>
                  {maxEnergy - minEnergy}
                </Typography>
                <Typography variant="body1" align="center" sx={{ 'fontWeight': '600' }}>
                  Unlocked
                </Typography>
              </Grid>
              <Grid item xs={6} lg={6}>
                <Typography variant="body1" align="center" sx={{ 'fontWeight': '600' }}>
                  {maxPotential - maxEnergy}
                </Typography>
                <Typography variant="body1" align="center" sx={{ 'fontWeight': '600' }}>
                  Locked
                </Typography>
              </Grid>
            </Grid>
            <LinearProgress variant="determinate" color="success" sx={{ backgroundColor: 'red' }} value={parseFloat(calculateNrg.toFixed(0))} />
            <Typography variant="body1" align="center" sx={{ 'fontWeight': '600' }}><Link href="https://dashboard.samurailegends.io/smgstaking" target="_blank" rel="noopener">{stakeText}</Link></Typography>
          </Grid>
        </Grid>
        <br></br>
        <Grid container spacing={1} alignItems="center">
        <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={4} lg={4}>
                <Typography id={earningId} variant="body1" align="center" sx={{ 'fontWeight': '600' }}>
                  {winTotal}
                </Typography>
                <Typography variant="body1" align="center" sx={{ 'fontWeight': '600' }}>
                  Wins
                </Typography>
              </Grid>
              <Grid item xs={4} lg={4}>
                <Typography id={earningId} variant="body1" align="center" sx={{ 'fontWeight': '600' }}>
                  {winRatio+'%'}
                </Typography>
                <Typography variant="body1" align="center" sx={{ 'fontWeight': '600' }}>
                  WinRate
                </Typography>
              </Grid>
              <Grid item xs={4} lg={4}>
                <Typography variant="body1" align="center" sx={{ 'fontWeight': '600' }}>
                  {lossTotal}
                </Typography>
                <Typography variant="body1" align="center" sx={{ 'fontWeight': '600' }}>
                  Losses
                </Typography>
              </Grid>
            </Grid>
            <LinearProgress variant="determinate" color="success" sx={{ backgroundColor: 'red' }} value={parseFloat(winRatio)} />
        </Grid>
        </Grid>
      </Box>
    );

  } else {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }
}

export default Stats;