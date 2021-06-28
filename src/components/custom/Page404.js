import React from "react";
function Page404() {

    return (
        <div>
            <h1 style={{ marginLeft: "10px" }}>404 Page</h1>
            <p>
                Vui lòng đăng nhập
                        <span style={{ marginLeft: "10px", color: "dodgerblue", cursor: "pointer" }} >  
                               <a href="http://localhost:3000/">Please Login</a>
                        </span>
            </p>
        </div>
    )
}
export default Page404