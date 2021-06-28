function TaskSearch({setKeyWord,keyword}) {
    
    return (
        <div>
            <nav className="navbar navbar-light bg-light">
             
             <div className="input-group" > 
                

                   <input 
                   value={keyword}
                   name="keyword"
                   style={{marginLeft:"-15px"}}
                   className="form-control mr-sm-2" 
                   type="search" 
                   placeholder="Nhập tên danh mục" 
                   aria-label="Search"
                   onChange={(event)=>setKeyWord(event.target.value)}
                   />
                           
               </div>

           </nav>

        </div>
    );
}
export default TaskSearch;


           