import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import { useState, useEffect } from 'react';
function ThungRac() {
    let limit = 5;
    const [page, setPage] = useState(1);
    const [listCategory, setListCategory] = useState([]);
    const [danhMucId, setDanhMucId] = useState(1);
    const [products, setProducts] = useState([]);
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
            + danhMucId + '/products?limit=' + limit + '&page=' + page + '&Delete_At=true';
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
    }, [page, danhMucId]);
    //setUp select danh muc
    const danhMucOnChange = (event) => {
        const { value } = event.target;
        setDanhMucId(value)
        setPage(1)
    }
    //phan trang
    const trangTruoc=()=>{
            if(page===1){
                return 1
            }
            setPage(page-1)
    }
    const trangSau=()=>{
        setPage(page+1)
        
    }
    //restore
    const btnRestore=(index)=>{
        const confirmResult = window.confirm("Bạn muốn khôi phục không ?");
        if (confirmResult === true) {
            onRestore(index);
        }
       
    }
    const onRestore = (index) => {
        //data la products
        const id = products[index].id;
        const url = 'https://600e63693bb1d100179def79.mockapi.io/categories/' + danhMucId + '/products/' + id;
        axios({
            url: url,
            method: 'PUT',
            data:{Delete_At:"false"}

        })

            .then((response) => {
                //    console.log(response);
                if (response.status === 200) {
                    setProducts((oldState) => {
                        return oldState.filter((val, idx) => {
                            return idx === index ? false : true;
                        });
                    });
                }
            })

            .catch((error) => {
                console.log(error.response);
            });

    }
    return (
        <div>

            <div style={{ marginTop: '4px' }}>
                <label>Danh Mục</label>
                <select className="custom-select" name="category_id" onChange={danhMucOnChange}>
                    {
                        listCategory.map((val, idx) => {
                            return (
                                <option key={idx} value={val.id} >{val.name}</option>
                            );
                        })
                    }
                </select>
            </div>
            <TableContainer style={{ marginTop: '10px' }} component={Paper}>
                <Table aria-label="simple table" style={{ backgroundColor: '#FDF5E6' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID </TableCell>
                            <TableCell>Name </TableCell>
                            <TableCell>Price </TableCell>
                            <TableCell>Restore</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            products.map((value, index) => {
                                return (
                                    //arrow function giup gia tri value thành biến toàn cục
                                    <TableRow key={index}>
                                        <TableCell>{value.id}</TableCell>
                                        <TableCell>{value.name}</TableCell>
                                        <TableCell>{value.price}</TableCell>
                                        <TableCell>
                                            <button type="button" className="btn btn-success"
                                                onClick={() => btnRestore(index)}>
                                                Khôi Phục
                                            </button>
                                        </TableCell>
                                       
                                    </TableRow>
                                );

                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>

            <div style={{marginTop:"10px"}}>
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
        </div>
    );
}
export default ThungRac