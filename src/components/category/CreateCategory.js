import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { useState, useEffect } from 'react';
import ListCategory from './ListCategory';
function CreateCategory({ clicked, formData, setFormData,listCategory, setListCategory, setClicked }) {

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
        const url = 'https://600e63693bb1d100179def79.mockapi.io/categories';
        axios({
            url: url,
            method: 'POST',
            data: formData
        })
            .then((response) => {
                const { data } = response;
                setListCategory([
                    ...listCategory,
                    data,
                ]);
            })
            .catch((error) => {
                console.log(error.response);
            });
    }
 
    const onUpdateProduct = () => {
        //ham update
        const url = `https://600e63693bb1d100179def79.mockapi.io/categories/${listCategory[clicked].id}`;
        axios({
            url: url,
            method: 'PUT',
            data: formData
        })
            .then((response) => {
                const { data } = response;

                setListCategory((oldState) => {
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
        let regex =/^\d*(\.\d+)?$/;

        if (clicked == -1) {
            //T???o m???i
            if (formData.name.trim().length===0) {
                setOpen(false);
                setError ("T??n danh m???c kh??ng ???????c tr???ng !") ;
            } 
             else {
                setError("");
                setOpen(true);
                onCreateProduct();
            }

            console.log(error)

        } else {
            //C???p nh???t
           
            if (formData.name.trim().length===0) {
                setOpen(false);
                setError ("T??n danh m???c kh??ng ???????c tr???ng !") ;
            } 
             else {
                setError("");
                setOpen(true);
                onUpdateProduct();
            }

        }


    }
    //t???o th??ng b??o
    const [open, setOpen] = React.useState(false);
    let text = "";
    if (clicked === -1) {
        text = "Th??m m???i th??nh c??ng";
    } else if (clicked >= 0) {
        text = "C???p nh???t th??nh c??ng";
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
    //xoa form
    const btnXoaFormOnClick = (event) => {
        event.preventDefault();
        setFormData({
            id: '',
            name: '',

        })
        setClicked(-1);
    }

    return (
        <form style={{ marginTop: '10px' }} onSubmit={onSubmitHandler}>
            <TextField disabled fullWidth label="Id" variant="filled" value={formData.id} name="id" onChange={onChangeIdHandler}
            />
            <TextField fullWidth label="Name" variant="outlined" value={formData.name} name="name" onChange={onChangeIdHandler}
            />
            <div style={{ fontSize: 13, color: "red",fontStyle: "italic" }}>
                        <span> {error}</span>
            </div>
            <div style={{ marginTop: '10px' }} >
                <Button type="submit" variant="contained" color="primary" onClick={handleClick}>Submit</Button>
                <Snackbar  anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }} open={open} autoHideDuration={5000} onClose={handleClose}>
                        
                    <Alert onClose={handleClose} severity="success" variant="filled" >
                        {text}
                    </Alert>
                </Snackbar>
                <Button style={{ marginLeft: '10px' }} type="reset" onClick={btnXoaFormOnClick}
                    variant="contained" color="secondary" >Reset</Button>
            </div>
            
        </form>
    );
}
export default CreateCategory;
