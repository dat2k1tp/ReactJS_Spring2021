import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

function Home({cart,setCart}) {
    const [listCategory, setListCategory] = useState([]);
    const [products, setProducts] = useState([]);
    const [danhMucId, setDanhMucId] = useState(1);
    const [page, setPage] = useState(1);
    const [keyword, setKeyWord] = useState('');
    const [fillter, setFillter] = useState([]);
    const limit = 5;
    useEffect(() => {
        const url = 'https://600e63693bb1d100179def79.mockapi.io/categories';
        axios({
            url: url,
            method: 'GET',
        })

            .then((response) => {
                const { data } = response;
                setListCategory(data);
            })

            .catch((error) => {
                console.log(error, error.response);
            });
    }, [])


    useEffect(() => {
        const url = 'https://600e63693bb1d100179def79.mockapi.io/categories/'
            + danhMucId + '/products?limit=' + limit + '&page=' + page;
        axios({
            url: url,
            method: 'GET',
        })

            .then((response) => {
                const { data } = response;
                setProducts(data);
            })

            .catch((error) => {
                console.log(error, error.response);
            });
    }, [
        danhMucId, page
    ]);


    const danhMucOnChange = function (event) {
        const { value } = event.target;
        setDanhMucId(value);
        setPage(1);
    }
    const trangTruoc = function () {
        if (page == 1) {
            return 1;
        }
        setPage(page - 1);
    }
    const trangSau = function () {
        setPage(page + 1);
    }
    //csss
    const StyledTableCell = withStyles((theme) => ({
        head: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        body: {
          fontSize: 14,
        },
      }))(TableCell);
      
      const StyledTableRow = withStyles((theme) => ({
        root: {
          '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
          },
        },
      }))(TableRow);
      //search
      useEffect(() => {

        setFillter(
            products.filter((product) =>
                product.name.toLowerCase().includes(keyword.toLowerCase())
            ));

    }, [keyword, products]);
//gio hang   
    const addToCart =(product,idx)=>{
        let newCart=[...cart];
        let itemInCart=newCart.find(
            (item)=>product[idx].name===item.name
        );
        if(itemInCart){
            itemInCart.quantity++;
        }else{
            itemInCart={
                ...product[idx],
                quantity:1,
            }
            newCart.push(itemInCart)
        }
        setCart(newCart)
        setOpen(true);

    }
    //alert
    const [open, setOpen] = React.useState(false);
   
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    return (
        <div>
            <div style={{ marginTop: '10px' }}>
                <h4>Danh Mục</h4>
                <select className="custom-select" name="category_id" onChange={danhMucOnChange}>
                    {
                        listCategory.map(function (val, idx) {
                            return (
                                <option key={idx} value={val.id} >{val.name}</option>
                            );
                        })
                    }
                </select>
            </div>
            <div style={{ marginTop: '20px' }}>
                    <input 
                    value={keyword}
                    name="keyword"
                    className="form-control mr-sm-2" 
                    type="search" 
                    placeholder="Tìm tên sản phẩm" 
                    aria-label="Search"
                    onChange={(event)=>setKeyWord(event.target.value)}
                    />
            </div>
            <TableContainer style={{marginTop:"25px"}} component={Paper}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Id</StyledTableCell>
                            <StyledTableCell align="right">Name</StyledTableCell>
                            <StyledTableCell align="right">Price</StyledTableCell>
                            <StyledTableCell align="right">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {fillter.map((row,idx) => (
                            <StyledTableRow key={row.id}>
                                <StyledTableCell component="th" scope="row">
                                    {row.id}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.name}</StyledTableCell>
                                <StyledTableCell align="right">{row.price}</StyledTableCell>
                               
                                <StyledTableCell align="right">
                                    <button className="btn btn-outline-dark" onClick={()=>addToCart(fillter,idx)}>
                                        Thêm giỏ hàng
                                    </button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div style={{marginTop:"20px"}}>
                <ul className="pagination justify-content-center">
                    <li className="page-item" onClick={trangTruoc}>
                        <a className="page-link">Trang trước</a>
                    </li>
                    <li className="page-item">
                        <a className="page-link">{page}</a>
                    </li>
                    <li className="page-item" onClick={trangSau}>
                        <a className="page-link">Trang sau</a>
                    </li>
                </ul>
            </div>
                            
                <Snackbar 
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    
                    open={open} autoHideDuration={2000} onClose={handleClose}>
                    <Alert onClose={handleClose} variant="filled"  severity="success" >
                        Đã thêm vào giỏ hàng !
                    </Alert>
                </Snackbar>



        </div>



    )

}
export default Home