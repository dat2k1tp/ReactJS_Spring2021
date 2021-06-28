import React from 'react';
import { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
function DangKy({account,setAccount}) {
    const[formLogin,setFormLogin]=useState({
        username:"",
        password:"",
        confirm:""
    })
    const onChangeHandle=(e)=>{
        const{value,name}=e.target;
        setFormLogin({
            ...formLogin,
            [name]:value
        })
    }
    
    // đẩy thông báo css
    const [open, setOpen] = React.useState(false);
    const [text, setText] = React.useState("");
    const[color,setColor]= React.useState("error");
    // const [check, setCheck] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const onCreateAccount=()=>{
        const url="https://600e63693bb1d100179def79.mockapi.io/Account"
        axios({
            url:url,
            method:'POST',
            data:{username:formLogin.username,
                 password:formLogin.password
            }
        })
            .then((response)=>{
                const {data}=response;
                setAccount([
                    ...account,
                     data
                ])
   
            })
            .catch((error)=>{
                console.log(error.response);
            })
            
    }
    //clear
    const onClearForm =()=>{
        setFormLogin({
            username:"",
            password:"",
            confirm:""});
    }
   //submit
    const onSubmitHandle = (event) => {
        event.preventDefault();
        var flag=0;
        setOpen(true);
        
        for (let i = 0; i < account.length; i++) {
            if (account[i].username === formLogin.username.trim()) {
                flag=1;
            } 
        }
        
        if(formLogin.username.trim().length===0){
            setColor("error");
            setText("Username không được trống!");

        }else if(flag===1){
            setColor("error");
            setText("Username không được trùng  !");
        }
        else if(formLogin.password.trim().length===0){
            setColor("error");
            setText("Password không được trống!");

        }
        else if(formLogin.password.trim()!==formLogin.confirm.trim()){
            setColor("error");
            setText("Password phải trùng với xác nhận password !");
        } else {
            onCreateAccount();
            setColor("success");
            setText("Đăng ký thành công !");
            onClearForm();
        }
       


    }
    return(
        <div className="container" className="p-3 mb-2 bg-secondary text-white">
            <h3>Đăng Ký</h3>
        <form onSubmit={onSubmitHandle} >
            <div className="form-group">
                <label>Tên đăng nhập</label>
                <input
                    name='username'
                    type="text" 
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Nhập tài khoản"
                    value={formLogin.username}
                    onChange={onChangeHandle} />
            </div>

            <div className="form-group">
                <label >Mật khẩu</label>
                <input
                    name='password'
                    type="password"
                    className="form-control"
                    placeholder="Nhập mật khẩu"
                    value={formLogin.password}
                    onChange={onChangeHandle} />
            </div>
            <div className="form-group">
                <label >Xác nhận lại mật khẩu</label>
                <input
                    name='confirm'
                    type="password"
                    className="form-control"
                    placeholder="Xác nhận mật khẩu"
                    value={formLogin.confirm}
                    onChange={onChangeHandle} />
            </div>

            

            <div style={{ marginTop: "10px" }}>
                <button type="submit" className="btn btn-success" >
                    Đăng ký
                </button>
                <button className="btn btn-danger" style={{ marginLeft: "15px" }}>
                    <a href="http://localhost:3000/" style={{color:"white",textDecoration:"none"}}>Đóng form</a>
                </button>
            </div>

            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}

                open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} variant="filled"  severity={color} >
                    {text}
                </Alert>
            </Snackbar>


        </form>
    </div>
    )
}
export default DangKy