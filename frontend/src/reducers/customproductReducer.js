import {
    ADMIN_PRODUCTS_FAIL,
    ADMIN_PRODUCTS_REQUEST,
    ADMIN_PRODUCTS_SUCCESS,
    CLEAR_ERRORS,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_RESET,
    DELETE_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_RESET,
    NEW_PRODUCT_SUCCESS,
} from "../constants/customproductConstants";

export const customproductsReducer = (state = { products: [] }, { type, payload }) => {

    switch (type) {
        case ADMIN_PRODUCTS_REQUEST:
            return {
                loading: true,
                products: [],
            };
        case ADMIN_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: payload,
            };
        case ADMIN_PRODUCTS_FAIL:
            return {
                loading: false,
                error: payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}

// New Product Reducer
export const newcustomProductReducer = (state = { product: {} }, { type, payload }) => {
    switch (type) {
        case NEW_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NEW_PRODUCT_SUCCESS:
            return {
                loading: false,
                success: payload.success,
                product: payload.product,
            };
        case NEW_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case NEW_PRODUCT_RESET:
            return {
                ...state,
                success: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}

// New Product Reducer
export const customproductReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case DELETE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: payload,
            };
        case DELETE_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case DELETE_PRODUCT_RESET:
            return {
                ...state,
                isDeleted: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}

