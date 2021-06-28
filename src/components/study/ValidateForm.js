import React from "react";
import useState from 'react';
function ValidateForm() {
    const valueForm = {
        name: "",
        price: "",
        nameError: "",
        priceError: "",

    }
    const [form, setForm] = useState(valueForm);
   const handleChange = event => {
        const isCheck = event.target.type === "checkbox";
        setForm({
            [event.target.name]: isCheck
                ? event.target.checked
                : event.target.value
        });
    }
   const handleSubmit = event => {
        event.preventDefault();
        const isVaild=validate();
        if(isVaild){
            setForm(valueForm);
        }
    }
    const validate = () => {
        let nameError = "";
        let priceError = "";
        if (!form.name||!form.price) {
            nameError = "Tên không được để trống";
            priceError = "Giá tiền không được để trống";
        }
        if (priceError || nameError) {
            setForm({ priceError, nameError });
            return false;
        }
        return true;
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <input name="name" placeholder="name" value={form.name} onChange={handleChange} />
                    <div style={{ fontSize: 12, color: "red" }}>
                        {form.nameError}
                    </div>
                </div>
                <div>
                    <input name="price" placeholder="price" value={form.price} onChange={handleChange} />
                    <div style={{ fontSize: 12, color: "red" }}>
                        {form.priceError}
                    </div>
                </div>
                <button type="submit">submit</button>
            </form>

        </div>
    )
}
export default ValidateForm