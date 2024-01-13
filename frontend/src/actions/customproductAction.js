import axios from "axios";
import {
    ADMIN_PRODUCTS_REQUEST,
    ADMIN_PRODUCTS_SUCCESS,
    ADMIN_PRODUCTS_FAIL,
    CLEAR_ERRORS,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
} from "../constants/customproductConstants";


// Get All Products ---ADMIN
export const getAdmincustomProducts = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_PRODUCTS_REQUEST });

        const { data } = await axios.get('/api/v1/admin/customproducts');

        dispatch({
            type: ADMIN_PRODUCTS_SUCCESS,
            payload: data.products,
        });
    } catch (error) {
        dispatch({
            type: ADMIN_PRODUCTS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// New Product ---ADMIN
export const createcustomProduct = (productData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_PRODUCT_REQUEST });
        const config = { header: { "Content-Type": "application/json" } }
        const { data } = await axios.post("/api/v1/admin/customproduct/new", productData, config);

        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
}

// Update Product ---ADMIN
// export const updateProduct = (id, productData) => async (dispatch) => {
//     try {
//         dispatch({ type: UPDATE_PRODUCT_REQUEST });
//         const config = { header: { "Content-Type": "application/json" } }
//         const { data } = await axios.put(`/api/v1/admin/product/${id}`, productData, config);

//         dispatch({
//             type: UPDATE_PRODUCT_SUCCESS,
//             payload: data.success,
//         });
//     } catch (error) {
//         dispatch({
//             type: UPDATE_PRODUCT_FAIL,
//             payload: error.response.data.message,
//         });
//     }
// }

// Delete Product ---ADMIN
export const deletecustomProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_PRODUCT_REQUEST });
        const { data } = await axios.delete(`/api/v1/admin/customproduct/${id}`);

        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
}

// Clear All Errors
export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}