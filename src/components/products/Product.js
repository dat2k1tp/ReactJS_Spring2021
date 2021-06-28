import { useState, useEffect } from 'react';
import axios from 'axios';
import CreateProduct from './CreateProduct';
import ListProducts from './ListProducts';
import TaskSearch from './TaskSearch';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
function Product() {
    const formDataInitValue = {
        id: "",
        name: "",
        price: "",
    };
    const limit = 3;


    const [clicked, setClicked] = useState(-1);
    const [formData, setFormData] = useState(formDataInitValue)
    const [listCategory, setListCategory] = useState([]);
    const [danhMucId, setDanhMucId] = useState(1);
    const [page, setPage] = useState(1);
    const [keyword, setKeyWord] = useState('');
    const [fillter, setFillter] = useState([]);
    const [products, setProducts] = useState([]);

    //Phuong thuc ket noi mockAPI tra va promise => resolve or reject
    //useEffect  request data it hon
    useEffect(() => {
        const url = 'https://600e63693bb1d100179def79.mockapi.io/categories';
        axios({
            url: url,
            method: 'GET',
        })

            .then((response) => {
                const { data } = response;
                setListCategory(data);
            })

            .catch((error) => {
                console.log(error, error.response);
            });
    }, [])


    useEffect(() => {
        const url = 'https://600e63693bb1d100179def79.mockapi.io/categories/' 
        + danhMucId + '/products?limit=' + limit + '&page=' + page+'&Delete_At=false';
        axios({
            url: url,
            method: 'GET',
        })

            .then((response) => {
                const { data } = response;
                setProducts(data);
            })

            .catch((error) => {
                console.log(error, error.response);
            });
    }, [
        danhMucId, page
    ]);




    const danhMucOnChange = function (event) {
        const { value } = event.target;
        setDanhMucId(value);
        setPage(1);
    }
    const trangTruoc = function () {
        if (page == 1) {
            return 1;
        }
        setPage(page - 1);
    }
    const trangSau = function () {
        setPage(page + 1);
    }

    //tim kiem

    useEffect(() => {

        setFillter(
            products.filter((product) =>
                product.name.toLowerCase().includes(keyword.toLowerCase())
            ));


    }, [keyword, products]);



    //sort
    
    const [sortValue, setSortValue] = useState('no');

    const onSortHandle = function (event) {
        const {value}=event.target
        setSortValue(value);
        // console.log("VALUE " + value)
        // console.log("STATE " + sort)

        if (value === "asc") {
            setFillter(products.sort((a, b) => a.name.localeCompare(b.name)))
        }
        if (value === "desc") {
            setFillter(products.sort((a, b) => b.name.localeCompare(a.name)))
        }
    }

    return (
        <div>
             <div style={{ marginTop: '4px' }}>
                <label>Danh Mục</label>
                <select className="custom-select" name="category_id" onChange={danhMucOnChange}>
                    {
                        listCategory.map(function (val, idx) {
                            return (
                                <option key={idx} value={val.id} >{val.name}</option>
                            );
                        })
                    }
                </select>
            </div>
            <CreateProduct clicked={clicked}
                formData={formData}
                setFormData={setFormData}
                setProducts={setProducts}
                products={products}
                danhMucId={danhMucId}
                setClicked={setClicked} />

           

            <div >
                <TaskSearch
                    setKeyWord={setKeyWord}
                    keyword={keyword}
                />

            </div>
            

            <div style={{ marginLeft: '330px' }}>
                <FormControl>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={sortValue}
                        onChange={onSortHandle}
                        name='sort'
                    >
                        <MenuItem name='0' value="no">---Sắp xếp---</MenuItem>
                        <MenuItem name='1' value='asc' >Sắp xếp A-Z</MenuItem>
                        <MenuItem name='2' value='desc'>Sắp xếp từ Z-A</MenuItem>
                    </Select>
                </FormControl>
            </div>

           



            <div style={{ marginTop: '10px' }}>
                <ListProducts
                    clicked={clicked}
                    data={fillter}
                    setClicked={setClicked}
                    setFormData={setFormData}
                    setProducts={setProducts}
                    danhMucId={danhMucId} />
                <div style={{marginTop:"10px"}}>
                    <ul className="pagination justify-content-center">
                        <li className="page-item" onClick={trangTruoc}>
                            <a className="page-link">Trang trước</a>
                        </li>
                        <li className="page-item">
                            <a className="page-link">{page}</a>
                        </li>
                        <li className="page-item" onClick={trangSau}>
                            <a className="page-link">Trang sau</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Product












/* <div >
                <TaskSort
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                />

            </div> */
 //     //

//  const [sortBy, setSortBy] = useState("");

//     useEffect(() => {
//         if (sortBy === "asc") {
//             setFillter(products.sort((a, b) => a.name.localeCompare(b.name)))
//         }
//         if (sortBy === "desc") {
//             setFillter(products.sort((a, b) => b.name.localeCompare(a.name)))
//         }

//     }, [sortBy, fillter]);