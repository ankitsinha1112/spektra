import './ItemCard.css';
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { IconButton } from '@mui/material';
import { Button } from '@mui/material';

const ItemCard = (props) => {
    return ( 
        <div className="product__card__card">
            <div className="product__card">
                <div className="product__image" 
                > 
                    {/* {isHovered? <img src={`https://shema-backend.vercel.app/public/${props.item.category}/${props.item.image[1].filename}`} alt="item" className="product__img"/>: <img src= {`https://shema-backend.vercel.app/public/${props.item.category}/${props.item.image[0].filename}`} alt="item" className="product__img"/> } */}
                    <img src={props.data.image} alt="item" className="product__img"/>
                </div>
                <div className="product__card__detail">
                    <div className="product__name">
                        {/* <Link to={`/product`}> */}
                        {/* <Link to={`/item/${props.item.category}/${props.item._id}`}> */}
                           {props.data.name}
                        {/* </Link> */}
                    </div>
                    <div className="product__description">
                        <span>{props.data.desc}</span>
                    </div>
                </div>
                <div className="category__card__action">
                        <Link to={props.data.url}>
                            <Button variant='outlined' sx={[{'&:hover': { backgroundColor: 'none', borderColor: '#FFE26E', color: '#FFE26E'}, borderRadius: '20px' , borderColor: '#FFE26E', backgroundColor: "#FFE26E" , color: "#000", fontWeight: '700'}]}>SHOP NOW</Button>
                        </Link>
                    </div>
            </div>
        </div>
     );
}
 
export default ItemCard;