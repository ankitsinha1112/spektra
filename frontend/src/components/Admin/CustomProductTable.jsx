import { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Link } from 'react-router-dom';
import { clearErrors, deletecustomProduct, getAdmincustomProducts } from '../../actions/customproductAction';
import Rating from '@mui/material/Rating';
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants';
import Actions from './Actions';
import MetaData from '../Layouts/MetaData';
import BackdropLoader from '../Layouts/BackdropLoader';

const CustomProductTable = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { products, error } = useSelector((state) => state.products);
    const { loading, isDeleted, error: deleteError } = useSelector((state) => state.product);

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (deleteError) {
            enqueueSnackbar(deleteError, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isDeleted) {
            enqueueSnackbar("Product Deleted Successfully", { variant: "success" });
            dispatch({ type: DELETE_PRODUCT_RESET });
        }
        dispatch(getAdmincustomProducts());
    }, [dispatch, error, deleteError, isDeleted, enqueueSnackbar]);

    const deleteProductHandler = (id) => {
        dispatch(deletecustomProduct(id));
    }

    const columns = [
        {
            field: "id",
            headerName: "Product ID",
            minWidth: 100,
            flex: 0.5,
        },
        {
            field: "size",
            headerName: "Size",
            minWidth: 100,
            flex: 0.5,
        },
        {
            field: "image",
            headerName: "Images",
            minWidth: 100,
            flex: 1,
            renderCell: (params) => {
                return (
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full">
                            <img draggable="false" src={params.row.image} alt='img' className="w-full h-full rounded-full object-cover" />
                        </div>
                        {/* {params.row.name} */}
                    </div>
                )
            },
        },
        {
            field: "price",
            headerName: "Price",
            type: "number",
            minWidth: 100,
            headerAlign: "left",
            align: "left",
            flex: 0.2,
            renderCell: (params) => {
                return (
                    <span>₹{params.row.price.toLocaleString()}</span>
                );
            },
        },
        {
            field: "desired_body_part",
            headerName: "Desired Body Part",
            minWidth: 100,
            flex: 0.1,
        },
        {
            field: "description",
            headerName: "Description",
            minWidth: 100,
            flex: 0.1,
        },
        {
            field: "actions",
            headerName: "Actions",
            minWidth: 100,
            flex: 0.3,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Actions editRoute={"review"} deleteHandler={deleteProductHandler} id={params.row.id} />
                );
            },
        },
    ];

    const rows = [];

    products && products.forEach((item) => {
        rows.unshift({
            id: item._id,
            size: item.size,
            image: item.images[0].url,
            price: item.price,
            desired_body_part: item.desired_body_part,
            description: item.description,
        });
    });

    return (
        <>
            <MetaData title="Admin Custom Products " />

            {loading && <BackdropLoader />}

            <div className="flex justify-between items-center">
                <h1 className="text-lg font-medium uppercase">Custom products</h1>
                {/* <Link to="/admin/new_product" className="py-2 px-4 rounded shadow font-medium text-white bg-primary-blue hover:shadow-lg">New Product</Link> */}
            </div>
            <div className="bg-white rounded-xl shadow-lg w-full" style={{ height: 470 }}>

                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectIconOnClick
                    sx={{
                        boxShadow: 0,
                        border: 0,
                    }}
                />
            </div>
        </>
    );
};

export default CustomProductTable;