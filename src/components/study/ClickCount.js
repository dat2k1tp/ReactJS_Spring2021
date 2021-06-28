import {useState} from 'react';
function ClickCount(){//component
    // let count=0;
    const[count,setCount]=useState(0);//state
    
    const onClickHandler=function(){
        //ko dung count++
        setCount(count+1);
    }
    //retun trong div la return toan bo
    return(
        <div>
            <button onClick={onClickHandler}>Click me</button>
            <label>Click {count} times</label>
        </div>
    )
}
export default ClickCount;