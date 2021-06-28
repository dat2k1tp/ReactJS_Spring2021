import {useState} from 'react';
function Input() {
    const[name,setName]=useState("");
    const onChangeHanlder=function (event) {
        // setName(text);
        setName(event.target.value);
        console.log(event);
    }
    return (
        <div>
            <input type="text" onChange={onChangeHanlder}/>
            <p>Họ tên : {name}</p>
        </div>

    );
}
export default Input;