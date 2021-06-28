import { useState, useEffect } from 'react';
import axios from 'axios';
import CreateCategory from './CreateCategory';
import ListCategory from './ListCategory.js';
import TaskSearch from './TaskSearch.js';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
function Category() {
    const formDataInitValue = {
        id: "",
        name: "",
    };
    const limit = 3;

    const [clicked, setClicked] = useState(-1);
    const [formData, setFormData] = useState(formDataInitValue)
    const [listCategory, setListCategory] = useState([]);
    const [page, setPage] = useState(1);

    //Phuong thuc ket noi mockAPI tra va promise => resolve or reject
    //useEffect  request data it hon
    useEffect(() => {
        const url = 'https://600e63693bb1d100179def79.mockapi.io/categories?limit=' 
        + limit + '&page=' + page+'&Delete_At=false';
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
    }, [page])





    const trangTruoc = function () {
        if (page === 1) {
            return 1;
        }
        setPage(page - 1);
    }
    const trangSau = function () {
        setPage(page + 1);
    }


    //tim kiem
    const [keyword, setKeyWord] = useState('');
    const [fillter, setFillter] = useState([]);
    useEffect(() => {

        setFillter(
            listCategory.filter((cate) =>
                cate.name.toLowerCase().includes(keyword.toLowerCase())
            ));


    }, [keyword, listCategory]);



    //sort
    
    const [sortValue, setSortValue] = useState('no');

    const onSortHandle = function (event) {
        const {value}=event.target
        setSortValue(value);

        if (value === "asc") {
            setFillter(listCategory.sort((a, b) => a.name.localeCompare(b.name)))
        }
        if (value === "desc") {
            setFillter(listCategory.sort((a, b) => b.name.localeCompare(a.name)))
        }
    }
    return (
        <div>
            <CreateCategory clicked={clicked}
                formData={formData}
                setFormData={setFormData}
                setListCategory={setListCategory}
                listCategory={listCategory}
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

            <div style={{ marginTop: '20px' }}>
                <ListCategory
                    clicked={clicked}
                    data={listCategory}
                    setClicked={setClicked}
                    setFormData={setFormData}
                    setListCategory={setListCategory}
                    fillter={fillter} />

                <div style={{marginTop:"15px"}}>
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
export default Category;