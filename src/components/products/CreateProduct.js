import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
function CreateProduct({ clicked, formData, setFormData, products, setProducts, danhMucId, setClicked }) {
    // console.log(formData)
    //bat su kien thi thay doi textfeild
    // 

    const onChangeIdHandler = (event) => {
        const { name, value } = event.target;
        //spread  operator
        setFormData({
            ...formData,
            [name]: value,
        });
        console.log(formData)

    }
    //submit set gia tri len table

    const onCreateProduct = () => {
        //ham insert
        const url = 'https://600e63693bb1d100179def79.mockapi.io/categories/' + danhMucId + '/products';
        axios({
            url: url,
            method: 'POST',
            data: formData
        })
            .then((response) => {
                const { data } = response;
                setProducts([
                    ...products,
                    data,
                ]);
            })
            .catch((error) => {
                console.log(error.response);
            });
    }

    const onUpdateProduct = () => {
        //ham update
        const url = `https://600e63693bb1d100179def79.mockapi.io/categories/${danhMucId}/products/${products[clicked].id}`;
        axios({
            url: url,
            method: 'PUT',
            data: formData
        })
            .then((response) => {
                const { data } = response;

                setProducts((oldState) => {
                    return oldState.map((val, idx) => {
                        return idx == clicked ? response.data : val;
                    });
                });

            })
            .catch((error) => {
                console.log(error.response);
            });
    }


    const [error, setError] = useState("");
    const onSubmitHandler = (event) => {

        event.preventDefault();
        let regex = /^\d*(\.\d+)?$/;

        if (clicked == -1) {
            //Tạo mới
            if (formData.name.trim().length === 0) {
                setOpen(false);
                setError("Tên sản phẩm không được trống !");
            } else if (formData.price.trim().length === 0) {
                setOpen(false);
                setError("Giá sản phẩm không được trống !");
            } else if (!formData.price.match(regex)) {
                setOpen(false);
                setError("Giá sản phẩm phải là số !");
            }
            else {
                setError("");
                setOpen(true);
                onCreateProduct();
            }

            console.log(error)

        } else {
            //Cập nhật

            if (formData.name.trim().length === 0) {
                setOpen(false);
                setError("Tên sản phẩm không được trống !");
            } else if (formData.price.trim().length === 0) {
                setOpen(false);
                setError("Giá sản phẩm không được trống !");
            } else if (!formData.price.match(regex)) {
                setOpen(false);
                setError("Giá sản phẩm phải là số !");
            }
            else {
                setError("");
                setOpen(true);
                onUpdateProduct();
            }


        }
        console.log(formData)


    }
    //tạo thông báo
    const [open, setOpen] = React.useState(false);
    let text = "";
    if (clicked === -1) {
        text = "Thêm mới thành công";
    } else if (clicked >= 0) {
        text = "Cập nhật thành công";
    }
    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
   
   


    const btnXoaFormOnClick = (event) => {
        event.preventDefault();
        setFormData({
            id: '',
            name: '',
            price: ''

        })
        setClicked(-1);
    }

    return (
        <form style={{ marginTop: '10px' }} onSubmit={onSubmitHandler}>
            <TextField disabled fullWidth label="Id" variant="filled" value={formData.id} name="id" onChange={onChangeIdHandler}
            />
            <TextField fullWidth label="Name" variant="outlined" value={formData.name} name="name" onChange={onChangeIdHandler}
            />
            <TextField fullWidth label="Price" variant="outlined" value={formData.price} name="price" onChange={onChangeIdHandler} />
            <div style={{ fontSize: 13, color: "red", fontStyle: "italic" }}>
                <span> {error}</span>
            </div>
            <Button 
            style={{ marginTop: '5px' }}
            type="submit"
             variant="contained"
              color="primary"
               onClick={handleClick}>Submit</Button>
            
                <Snackbar 
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    
                    open={open} autoHideDuration={5000} onClose={handleClose}>
                    <Alert onClose={handleClose} variant="filled"  severity="success" >
                        {text}
                    </Alert>
                </Snackbar>
           
            
            <Button style={{ marginLeft: '10px', marginTop: '5px' }} type="reset" onClick={btnXoaFormOnClick}
                variant="contained" color="secondary" >Reset</Button>
        </form>
    );
}
export default CreateProduct;
//clear
 // const onClearHandler=()=>{

    //   setFormData([
    //     formData.id='',
    //     formData.name='',
    //     formData.price=''
    //   ]);

    // }




//set them functional
        // setProducts((oldState)=>{
        //     console.log(oldState);
        //     let newState;
        //     if(clicked!=-1){
        //         //update
        //         newState= oldState.map(function (value,index) {
        //             if(index==clicked){
        //                 return formData;
        //             }
        //                 return value;

        //        });

        //     }else{
        //         newState=[
        //             ...oldState,
        //             formData,
        //         ];
        //     }

        //     return newState;
        // });

        //ham update
        // const id=products[clicked].id;
        // const url='https://600e63693bb1d100179def79.mockapi.io/products'+id;