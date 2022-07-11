import React, {useState, useEffect } from 'react';

/*import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';*/

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

/*import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';*/

import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

/*import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';*/

import TableHead from '@mui/material/TableHead';
import axios from 'axios';


/*
function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
*/


const columns = [
    { id: 'position', label: 'Position', align: 'center' },
    { id: 'userAddress', label: 'User Address', align: 'center', },
    { id: 'rank', label: 'Rank', align: 'center' },
    { id: 'div', label: 'Division', align: 'center' },
  ];

export default function CustomPaginationActionsTable() {

    const leaderUrl     = `https://gameserver.samurairising.app/ranks/`;
    const [rows, setData] = useState([{userAddress:'',rank:null, position:null, division:null}]);
    
    useEffect(() => {
    
    axios.get(leaderUrl).then(res => {
        //console.log('setting data');
        setData(res.data.sort(function(obj1, obj2) {
            return  obj2.rank - obj1.rank;
        }));
        //console.log(res)
    })
    .catch((errors) => {
      console.log('Error vvv')
      console.log(errors);
    });
    
    }, [leaderUrl]);

    function getDivision(rank){
        if(rank<21){
            return 'wood1.png';
        }
        else if(rank<41){
            return 'wood2.png';
        }
        else if(rank<61){
            return 'wood3.png';
        }
        else if(rank<81){
            return 'wood4.png';
        }
        else if(rank<101){
            return 'wood5.png';
        }
        else if(rank<121){
            return 'stone1.png';
        }
        else if(rank<141){
            return 'stone2.png';
        }
        else if(rank<161){
            return 'stone3.png';
        }
        else if(rank<181){
            return 'stone4.png';
        }
        else if(rank<201){
            return 'stone5.png';
        }
        else if(rank<221){
            return 'iron1.png';
        }
        else if(rank<241){
            return 'iron2.png';
        }
        else if(rank<261){
            return 'iron3.png';
        }
        else if(rank<281){
            return 'iron4.png';
        }
        else if(rank<301){
            return 'iron5.png';
        }
        else if(rank<321){
            return 'silver1.png';
        }
        else if(rank<341){
            return 'silver2.png';
        }
        else if(rank<361){
            return 'silver3.png';
        }
        else if(rank<381){
            return 'silver4.png';
        }
        else if(rank<401){
            return 'silver5.png';
        }
        else if(rank<421){
            return 'gold1.png';
        }
        else if(rank<441){
            return 'gold2.png';
        }
        else if(rank<461){
            return 'gold3.png';
        }
        else if(rank<481){
            return 'gold4.png';
        }
        else{
            return 'gold5.png';
        }
    }

    for(var c=0;c<rows.length;c++){
        rows[c].position = c+1;
        rows[c].division = getDivision(rows[c].rank);
    }

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(-1);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
/*
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
*/
  return (
    <TableContainer component={Paper}>
      <Table stickyHeader aria-label="sticky table" sx={{ minWidth: 400, maxHeight: 500 }} >
      <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow key={row.userAddress}>
              <TableCell align="center">
                {row.position}
              </TableCell>
              <TableCell align="center">
                {row.userAddress}
              </TableCell>
              <TableCell align="center">
                {row.rank}
              </TableCell>
              <TableCell align="center">
              <img src={row.division} alt="rank" height="25" />
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}