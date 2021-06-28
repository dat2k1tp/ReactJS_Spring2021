import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
function GioHang({cart,setCart}) {
     //css
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
      console.log(cart)
      //remove
      const removeCart=(productRemove,index)=>{
            setCart(
                cart.filter(product=>product!==productRemove[index])
            )
         
      }
      // total
      const getTotalSum=()=>{
          return cart.reduce((sum,{price,quantity})=>sum+price*quantity,0)
      }
    
   
      //clear
        const btnClearCart=()=>{
            setCart([]);
            
        }

         //onchange
       //gan value tim dc de setCart
       const setQuantity=(product,amount,idx)=>{
          const newCart=[...cart];
         
            newCart.find(
              (item)=>
              product[idx].name===item.name
            ).quantity=amount;
           
          setCart(newCart)  

   }
        
    return(
      <div>
        <TableContainer style={{marginTop:"25px"}} component={Paper}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Id</StyledTableCell>
                            <StyledTableCell align="right">Name</StyledTableCell>
                            <StyledTableCell align="right">Price</StyledTableCell>
                            <StyledTableCell>Count</StyledTableCell>
                            <StyledTableCell >Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cart.map((row,idx) => (
                            <StyledTableRow key={idx}>
                                <StyledTableCell component="th" scope="row">
                                    {row.id}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.name}</StyledTableCell>
                                <StyledTableCell align="right">{row.price}</StyledTableCell>
                                <StyledTableCell>
                          
                                         
                                        <input  value={row.quantity}
                                          type="number"
                                          min="1" max="50"
                                          // variant="outlined"
                                          onChange={(e)=>{
                                          setQuantity(
                                            cart,
                                            e.target.value
                                           ,idx
                                          )}}/>
                                         
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    <button className="btn btn-outline-danger"
                                     onClick={()=>removeCart(cart,idx)}
                                     >
                                        Remove
                                    </button>
                                </StyledTableCell>
                            </StyledTableRow>
                            
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
      
            <div style={{ marginTop:"15px"}}>
                  <h6>Tổng Giá Tiền : <b>{getTotalSum()}</b></h6> 
            </div> 
            <div  style={{ marginTop:"15px"}}>
                  <button className="btn btn-danger" onClick={btnClearCart}>Clear Cart</button>
            </div>
      </div>
    )
}
export default GioHang

 
 