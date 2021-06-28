function Student({data}){
    // console.log(props);
    // return <h1>hello world</h1>
    
    
     const listSuject=data.subject.map(function (value,index){
      const element=(
        <li key={index}>
          
           {value.code}  -{value.name}
          
        </li>
         
      );
      return element;
    });
     
      const element =(//Day la JSX
          <ul>
            <li>Họ Tên: {data.name}</li>
            <li>Ngày Sinh: {data.birthday}</li>
            <li>Địa chỉ: {data.address}</li>
            <li>
              Trạng thái: {
                data.graduated==true?
                "Tốt nghiệp":"Không tốt nghiệp"
                
            }
            </li>
          <li>
              <ul>
                
                {listSuject}
                
              </ul>
          </li>
    
          </ul>
     
      );
      return element
}
export default Student;