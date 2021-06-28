import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';



function ListProducts({ data, setClicked, setFormData, setProducts, clicked, danhMucId }) {


    const onClickHandler = (event, value, index) => {
        // console.log(index)
        setClicked(index);
        setFormData(value);
    }


    //goi btndeleteonclick de thuc thi nhiem  vu delete

    const onDeleteProduct = (index) => {
        //data la products
        const id = data[index].id;
        const url = 'https://600e63693bb1d100179def79.mockapi.io/categories/' + danhMucId + '/products/' + id;
        axios({
            url: url,
            method: 'DELETE',

        })

            .then((response) => {
                //    console.log(response);
                if (response.status == 200) {
                    setProducts((oldState) => {
                        return oldState.filter((val, idx) => {
                            return idx == index ? false : true;
                        });
                    });
                }
            })

            .catch((error) => {
                console.log(error.response);
            });

    }

    const btnDeleteOnClick = (index) => {
        const confirmResult = window.confirm("Bạn muốn xóa không ?");
        if (confirmResult == true) {
            onDeleteProduct(index);
        }
    }

    //soft delete
    const btnSofmDelete=(index)=>{
        const confirmResult = window.confirm("Bạn muốn xóa không ?");
        if (confirmResult == true) {
            onSofmDelete(index);
        }
       
    }
    const onSofmDelete = (index) => {
        //data la products
        const id = data[index].id;
        const url = 'https://600e63693bb1d100179def79.mockapi.io/categories/' + danhMucId + '/products/' + id;
        axios({
            url: url,
            method: 'PUT',
            data:{Delete_At:"true"}

        })

            .then((response) => {
                //    console.log(response);
                if (response.status == 200) {
                    setProducts((oldState) => {
                        return oldState.filter((val, idx) => {
                            return idx == index ? false : true;
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
            <TableContainer component={Paper}>
                <Table aria-label="simple table"  style={{ backgroundColor: '#FDF5E6'}}>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID </TableCell>
                            <TableCell>Name </TableCell>
                            <TableCell>Price </TableCell>
                            <TableCell>Action</TableCell>
                            <TableCell>Soft Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            data.map((value, index) => {
                                return (
                                    //arrow function giup gia tri value thành biến toàn cục
                                    <TableRow onClick={event => onClickHandler(event, value, index)} key={index}>
                                        <TableCell>{value.id}</TableCell>
                                        <TableCell>{value.name}</TableCell>
                                        <TableCell>{value.price}</TableCell>
                                        <TableCell>
                                            <Button variant="contained" color="secondary"
                                                onClick={() => btnDeleteOnClick(index)}>
                                                Delete
                                          </Button>
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="outlined" color="secondary"
                                                 onClick={() => btnSofmDelete(index)}>
                                                 Delete
                                            </Button>
                                         </TableCell>
                                    </TableRow>
                                );

                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );

}
export default ListProducts






