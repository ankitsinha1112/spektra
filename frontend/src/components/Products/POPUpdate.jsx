import './POPUpdate.css'
import { Button } from '@mui/material'
import React,{ useEffect, useState } from 'react';
// Components
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FlashOnIcon from '@mui/icons-material/FlashOn';
// ICONs & SVGs
// import { useHistory } from 'react-router';
import { useSnackbar } from "notistack";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import MDBox from "../../components/MDBox";
import DialogTitle from "@mui/material/DialogTitle";
import MDBackdrop from "../../components/MDBackdrop";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import StarIcon from '@mui/icons-material/Star';
import { addItemsToCart } from '../../actions/cartAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { getDiscount } from '../../utils/functions';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../../actions/wishlistAction';
function POPUpdate(props) {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const getValues = () => {
        return {
          inspectionComplete: props.data.inspectionComplete,
          isFlagged: props.data.isFlagged,
          techComplete: props.data.techComplete,
          notes: props.data.notes,
        };
      };
      const [values, setValues] = useState(getValues());
      const [isBackdrop, setIsBackdrop] = useState(false);
      const [opendialog, setOpendialog] = React.useState(false);
      const { onClose } = props;
      
    const { cartItems } = useSelector((state) => state.cart);
    const itemInCart = cartItems.some((i) => i.product === props.data._id);
      const dispatch = useDispatch();
  
      const { wishlistItems } = useSelector((state) => state.wishlist);
  
      const itemInWishlist = wishlistItems.some((i) => i.product === props.data._id);
  
      const addToWishlistHandler = () => {
          if (itemInWishlist) {
              dispatch(removeFromWishlist(props.data._id));
              enqueueSnackbar("Remove From Wishlist", { variant: "success" });
          } else {
              dispatch(addToWishlist(props.data._id));
              enqueueSnackbar("Added To Wishlist", { variant: "success" });
          }
      }
    //   const UpdateTask = async(e) => {
    //     // e.preventDefault();
    //     console.log(e);
    //     const type = props.data.type;
    //     try {
    //     if(type==='work'){
    //       const workOrderKey = props.data.workOrderKey;
    //       let payload = {
    //         type: type,
    //         id: workOrderKey,
    //         ikey: props.data.ikey,
    //         techComplete: e.techComplete,
    //         isFlagged: e.isFlagged,
    //         notes: e.notes,
    //         inspectionComplete: e.inspectionComplete

    //     };
    //     const res = await axios.put(
    //             `${process.env.REACT_APP_BASE_URL}/api/v1/update/${type}/${workOrderKey}`,payload
    //         );
    //         console.log(res);
    //         if (res.data) {
    //                 // history.push('/dashboard');
    //                 window.location.reload();
    //                 enqueueSnackbar('Updated Successfully !!!', { variant: 'success' });
    //         } else {
    //             enqueueSnackbar("Error occurred while Updating the task. Please try again.", { variant: "error" });
    //             // enqueueSnackbar(res.data.message, { variant: "error" });
    //         }
    //     }
    //     else{
    //         const workOrderKey = props.data.formattedPONumber;
    //         let payload = {
    //           type: type,
    //           id: workOrderKey,
    //           ikey: props.data.ikey,
    //           techComplete: e.techComplete,
    //           isFlagged: e.isFlagged,
    //           notes: e.notes,
    //           inspectionComplete: e.inspectionComplete
  
    //       };
    //       const res = await axios.put(
    //               `${process.env.REACT_APP_BASE_URL}/api/v1/update/${type}/${workOrderKey}`,payload
    //           );
    //           console.log(res);
    //           if (res.data) {
    //                   window.location.reload();
    //                   enqueueSnackbar('Updated Successfully !!!', { variant: 'success' });
    //           } else {
    //               enqueueSnackbar("Error occurred while Updating the task. Please try again.", { variant: "error" });
    //           }
    //     }
       
    //     } catch (error) {
    //         console.log(error);
    //         enqueueSnackbar(
    //             "Error occurred while Updating the task. Please try again.",
    //             { variant: "error" }
    //         );
    //     } finally {
    //         setIsBackdrop(false);
    //     }
    //   };
    
      useEffect(() => {
        console.log(props.data);
      }, []);
    
      const handleChange = (event) => {
        const { name, checked, value } = event.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: checked, // Use checked for checkboxes, value for other inputs
        }));
    };
      const handleChange1 = (event) => {
        setValues((prevValues) => ({
          ...prevValues,
          [event.target.name]: event.target.value,
        }));
    };
    
      const handleClose = () => {
        onClose(false);
      };
    
      const handleSubmit = () => {
        setIsBackdrop(true);
        console.log(values);
        // UpdateTask(values);
      };
      const goToCart = () => {
        navigate('/cart');
    }

    const buyNow = () => {
        addToCartHandler();
        navigate('/shipping');
    }
    const addToCartHandler = () => {
        dispatch(addItemsToCart(props.data._id));
        enqueueSnackbar("Product Added To Cart", { variant: "success" });
    }
    return (
            <div id="POPUpdateControl">
      <MDBackdrop isBackdrop={isBackdrop} />
      <Dialog open={props.isDialog} onClose={handleClose} fullWidth >
      {/* {props.data.name !== null ? (
                    <DialogTitle className='titleforpopup'>{props.data.name}</DialogTitle>
                ) : null} */}
        <DialogContent>
          <MDBox pt={2} pb={3} px={3}>
            <MDBox pt={2}>
            <div className="flex flex-col items-start gap-2 px-4 py-6 relative hover:shadow-lg rounded-sm">
            {/* <!-- image & product title --> */}
            <Link to={`/product/${props.data._id}`} className="flex flex-col items-center text-center group" style={{width:'100%'}}>
                <div className="w-44 h-48">
                    <img draggable="false" className="w-full h-full object-contain" src={props.data.images && props.data.images[0].url} alt="" />
                </div>
                <h2 className="text-sm mt-4 group-hover:text-primary-blue text-left">{props.data.name.length > 85 ? `${props.data.name.substring(0, 85)}...` : props.data.name}</h2>
            </Link>
            {/* <!-- image & product title --> */}

            {/* <!-- product description --> */}
            <div className="flex flex-col gap-2 items-start" style={{width:'100%',display:'flex',alignItems:'center'}}>
                {/* <!-- rating badge --> */}
                <span className="text-sm text-gray-500 font-medium flex gap-2 items-center">
                    <span className="text-xs px-1.5 py-0.5 bg-primary-green rounded-sm text-white flex items-center gap-0.5">{props.data.ratings.toFixed(1)} <StarIcon sx={{ fontSize: "14px" }} /></span>
                    <span>({props.data.numOfReviews})</span>
                </span>
                {/* <!-- rating badge --> */}

                {/* <!-- price container --> */}
                <div className="flex items-center gap-1.5 text-md font-medium">
                    <span>₹{props.data.price.toLocaleString()}</span>
                    <span className="text-gray-500 line-through text-xs">₹{props.data.cuttedPrice.toLocaleString()}</span>
                    <span className="text-xs text-primary-green">{getDiscount(props.data.price, props.data.cuttedPrice)}%&nbsp;off</span>
                </div>
                {/* <!-- price container --> */}
            </div>
            {/* <!-- product description --> */}

            {/* <!-- wishlist badge --> */}
            <span onClick={addToWishlistHandler} className={`${props.data.itemInWishlist ? "text-red-500" : "hover:text-red-500 text-gray-300"} absolute top-6 right-6 cursor-pointer`}><FavoriteIcon sx={{ fontSize: "18px" }} /></span>
            {/* <!-- wishlist badge --> */}

        </div>
            </MDBox>
          </MDBox>
        </DialogContent>
        <DialogActions>
        <div className="w-full flex gap-3">
                                        {/* <!-- add to cart btn --> */}
                                        {props.data.stock > 0 && (
                                            <button onClick={itemInCart ? goToCart : addToCartHandler} className="p-4 w-1/2 flex items-center justify-center gap-2 text-white bg-primary-yellow rounded-sm shadow hover:shadow-lg">
                                                <ShoppingCartIcon />
                                                {itemInCart ? "GO TO CART" : "ADD TO CART"}
                                            </button>
                                        )}
                                        <button onClick={buyNow} disabled={props.data.stock < 1 ? true : false} className={props.data.stock < 1 ? "p-4 w-full flex items-center justify-center gap-2 text-white bg-red-600 cursor-not-allowed rounded-sm shadow hover:shadow-lg" : "p-4 w-1/2 flex items-center justify-center gap-2 text-white bg-primary-orange rounded-sm shadow hover:shadow-lg"}>
                                            <FlashOnIcon />
                                            {props.data.stock < 1 ? "OUT OF STOCK" : "BUY NOW"}
                                        </button>
                                        {/* <!-- add to cart btn --> */}
                                    </div>
        </DialogActions>
      </Dialog>
            </div>
    )
}

export default POPUpdate