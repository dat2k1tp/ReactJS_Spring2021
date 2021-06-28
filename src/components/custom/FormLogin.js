import React from 'react';
import { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    BrowserRouter
} from "react-router-dom";
import DangKy from './DangKy';
function FormLogin({ setCheckLogin, account, formLogin, setFormLogin,setAccount }) {


    const onChangeHandle = (event) => {
        const { name, value } = event.target;
        setFormLogin({
            ...formLogin,
            [name]: value
        })


        // console.log(formLogin)

    }

    // đẩy thông báo
    const [open, setOpen] = React.useState(false);
    const [text, setText] = React.useState("");

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const onSubmitHandle = (event) => {
        event.preventDefault();
        let flag = false;
        console.log(formLogin.username)
        for (let i = 0; i < account.length; i++) {
            // console.log(formLogin.username+formLogin.password)
            // console.log(account[i].username+formLogin.password)
            if (account[i].username === formLogin.username
                && account[i].password === formLogin.password) {
                setText("Đăng nhập thành công");
                setOpen(true);
                flag = true;
                break;
            } else {
                setText("Đăng nhập thất bại");
                setOpen(true);
                flag = false;
            }
        }
        console.log(flag)
        setCheckLogin(flag)





    }

    return (

        <BrowserRouter>
            <div className="container" className="p-3 mb-2 bg-info text-white">
            <h3>Đăng Nhập</h3>
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
                    <label >Mật Khẩu</label>
                    <input
                        name='password'
                        type="password"
                        className="form-control"
                        placeholder="Nhập mật khẩu"
                        value={formLogin.password}
                        onChange={onChangeHandle} />
                </div>

                <div className="form-check">
                    <input type="checkbox" className="form-check-input" />
                    <label className="form-check-label" >Nhớ mật khẩu</label>
                </div>

                <div style={{ marginTop: "10px" }}>
                    <button type="submit" 
                            onClick={onSubmitHandle}
                            className="btn btn-success" >
                             Đăng nhập
                    </button>

                    <button type="button"
                        className="btn btn-dark"
                        style={{ marginLeft: "10px" }}>
                        <Link to="/dangky" style={{color:"white",textDecoration:"none"}}>
                            Đăng ký
                        </Link>
                    </button>



                </div>

                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}

                    open={open} autoHideDuration={5000} onClose={handleClose}>
                    <Alert onClose={handleClose} variant="filled" severity="error" >
                        {text}
                    </Alert>
                </Snackbar>


            </div>

            <Switch>
                <Route path="/dangky">
                    <DangKy account={account} setAccount={setAccount} />
                </Route>
            </Switch>

        </BrowserRouter>
    )

}
export default FormLogin



//  //reset form
//  const OnResetForm =()=>{
//     setFormLogin({
//         username: "",
//         password: ""
//     })
// }


{/* <button type="button"
className="btn btn-danger"
style={{ marginLeft: "10px" }}
onClick={OnResetForm}>Reset</button> */}