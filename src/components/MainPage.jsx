import { useEffect, useState } from "react";
import Pagination from "./pagination";
import axios from 'axios';
import './mycss.css';
import PopUp from "./Popup";
import 'bootstrap/dist/css/bootstrap.min.css';

const MainPage = () => {
    const showperPage = 10;
    const [pagination, setPagination] = useState({
        start:0,
        end:showperPage
    })
    const onPaginationChange = (start,end) => {
        setPagination({start:start, end:end})
    }
    const [alldata, setAlldata] = useState([])
    const [data, setData] = useState([])
    const [get, setGet ] = useState(true);
    const [popData, setPopData] = useState([]);
    const [popShow, setPopShow] = useState(false);

    const handleSelect = (e) => {
        if(e.target.value === 'allproducts') setGet(!get);
        else{
            const resdata = alldata.filter((item) => {
                return item.category.includes(e.target.value);
            })
            setData(resdata)
        }
    }
    useEffect(()=>{
        axios.get('https://fakestoreapi.com/products')
        .then((fakedata)=>{
            setData(fakedata.data);
            setAlldata(fakedata.data);
            console.log(fakedata.data);
        })
    }, [get]);

    // popup 
    const handlePopup = (description, category, image)=>{
        let popData = [description, category, image];
        setPopData(item => [1, ...popData]);
        setPopShow(true);
    }
    const handlePopupHover = (description, category, image)=>{
        let popData = [description, category, image];
        setPopData(item => [1, ...popData]);
        setTimeout(()=>{
            setPopShow(true);
        }, 800);
    }

    return(
        <div className="outer-Container">
            <div className="header">
                <h1>Available Products</h1>
            </div>
            <div className="listCategory">
                <select onChange={(e)=>{handleSelect(e)}}>
                    <option value="allproducts">All Products</option>
                    <option value="electronics">Electronics</option>
                    <option value="men">Men's Clothes</option>
                    <option value="women">Women's Clothes</option>
                </select>
            </div> 
            <div className="products">
                 {
                    data.slice(pagination.start, pagination.end).map((item, i) =>{
                        return(
                            <div key={i} className="productsection">
                                <img src={item.image} 
                                onClick={()=> handlePopup(item.description, item.category, item.image)}
                                onMouseOver={()=> handlePopupHover(item.description, item.category, item.image)} />
                            </div>
                        )
                    })
                 }
            </div>
            <div>
                <Pagination showperPage={showperPage} total={data.length} onPaginationChange={onPaginationChange}/>
            </div>
            {
                popShow===true ? <PopUp image={popData[3]} description={popData[1]}  category={popData[2]} popShow={popShow} setPopShow={setPopShow} /> : ""
            }
        </div>
    )
}
export default MainPage;