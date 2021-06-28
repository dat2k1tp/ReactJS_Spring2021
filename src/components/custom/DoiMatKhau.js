import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import axios from 'axios';
function DoiMatKhau({ formLogin, account, setAccount, setCheckLogin }) {
    var id = "";
    var index="";
    const flag = account.map((val, idx) => {
        if (val.username === formLogin.username) {
            id = val.id;
            index=idx;
        }
    })
    const [open, setOpen] = React.useState(false);
    const [dataf, setData] = React.useState(formLogin.password);
             
    
    const[error,setError]=React.useState("");

    //update&alert
    const handleClick = () => {
        if(dataf.trim().length<1){
            setError("Password tối đa 1 ký tự");
            setOpen(false);
        }else{
            setError("");
            const confirm=window.confirm("Lưu ý đổi mật khẩu sẽ kết thúc phiên đăng nhập !")
            if(confirm===true){
                onUpdateAccount();
                setCheckLogin(false)
    
            }else{
                setOpen(true);
            }
            
        }
       
       
       
    };
    //css
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };


//setdata
    const onChangeHandle = (e) => {
        const {  value } = e.target
        setData(value)
             
    }

    const onUpdateAccount = () => {
        //ham update
        const url = 'https://600e63693bb1d100179def79.mockapi.io/Account/' + id;
        axios({
            url: url,
            method: 'PUT',
            data: {password:dataf}
        })
            .then((response) => {
                const { data } = response;
               
                    setAccount((oldState) => {
                    return oldState.map((val, idx) => {
                        return idx===index? data:val;
                    });
                 }); 
                 

            })
            .catch((error) => {
                console.log(error.response);
            });
    }
    //validateForm
    
    

    return (
        <div>
            <TableContainer component={Paper}>
                <Table aria-label="simple table" style={{ backgroundColor: '#FDF5E6' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Password</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                       
                            <TableRow >

                                <TableCell>
                                    <TextField disabled variant="outlined" value={id} />
                                </TableCell>
                                <TableCell>
                                    <TextField disabled variant="outlined" value={formLogin.username} />
                                </TableCell>
                                <TableCell>
                                    <TextField variant="outlined" name="password" onChange={onChangeHandle} value={dataf} />
                                </TableCell>
    
                            </TableRow>
                       
                    </TableBody>
                </Table>
            </TableContainer>
             <div style={{ fontSize: 13, color: "red",fontStyle: "italic" }}>
                        <span> {error}</span>
            </div> 

            <Button
                style={{marginTop:"20px"}}
                 type="button"
                variant="contained"
                color="primary"
                onClick={handleClick}>Update</Button>
            <Snackbar 
             anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="info" variant="filled" >
                    Mật khẩu chưa được thay đổi !
                </Alert>
            </Snackbar>

        </div>
    )
}
export default DoiMatKhau




