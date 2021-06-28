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
function ThungRacCate() {
    const [listCategory, setListCategory] = useState([]);
    const [page, setPage] = useState(1);
    const limit=3;
    
    useEffect(() => {
        const url = 'https://600e63693bb1d100179def79.mockapi.io/categories?limit='
            + limit + '&page=' + page + '&Delete_At=true';
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
    }, [page])

    //phan trang
    const trangTruoc = () => {
        if (page === 1) {
            return 1
        }
        setPage(page - 1)
    }
    const trangSau = () => {
        setPage(page + 1)

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
        const id = listCategory[index].id;
        const url ='https://600e63693bb1d100179def79.mockapi.io/categories/'  + id;
        axios({
            url: url,
            method: 'PUT',
            data:{Delete_At:"false"}

        })

            .then((response) => {
                //    console.log(response);
                if (response.status === 200) {
                    setListCategory((oldState) => {
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
            <TableContainer style={{ marginTop: '10px' }} component={Paper}>
                <Table aria-label="simple table" style={{ backgroundColor: '#FDF5E6' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID </TableCell>
                            <TableCell>Name </TableCell>
                            <TableCell>Restore</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            listCategory.map((value, index) => {
                                return (
                                    //arrow function giup gia tri value thành biến toàn cục
                                    <TableRow key={index}>
                                        <TableCell>{value.id}</TableCell>
                                        <TableCell>{value.name}</TableCell>
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
        </div >
    )
}
export default ThungRacCate