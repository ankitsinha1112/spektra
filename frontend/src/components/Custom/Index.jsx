import { useEffect } from 'react';
import Categories from '../Layouts/Categories';
// import Banner from './Banner/Banner';
// import DealSlider from './DealSlider/DealSlider';
// import { DropzoneArea } from 'material-ui-dropzone';
import ProductSlider from '../Home/ProductSlider/ProductSlider';
import { useCallback, useState } from 'react';
import { Box, Paper, Typography, IconButton, Grid, CircularProgress } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getSliderProducts } from '../../actions/productAction';
import { useSnackbar } from 'notistack';
import MetaData from '../Layouts/MetaData';
import BannerTitle from '../Home/BannerTitle/BannerTitle';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import './custom.css';

const Home = () => {
  // custom drop down start
  const [dragOver, setDragOver] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((event) => {
    event.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (event) => {
      event.preventDefault();
      setDragOver(false);
      const files = event.dataTransfer.files;
      if (files && files[0]) {
        handleFileChange(files[0]);
      }
    },
    []
  );
  const onFileUpload = (file) => {
    console.log(file);
  };
  const handleFileChange = (file) => {
    setLoading1(true);
    onFileUpload(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setLoading1(false);
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleChange = useCallback(
    (event) => {
      const files = event.target.files;
      if (files && files[0]) {
        handleFileChange(files[0]);
      }
    },
    []
  );


  // custom drop down end

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { error, loading } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
    dispatch(getSliderProducts());
  }, [dispatch, error, enqueueSnackbar]);

  return (
    <>
      <MetaData title="Spektra | Custom" />
      <Categories />
      <main className="flex flex-col gap-3 px-2 mt-16 sm:mt-2">
        <BannerTitle title={"Create Your Own Tattoo Masterpiece "} custom={true} para={"Don't settle for ordinary. With our options to create custom temporary tattoos, you become the artist! Design a unique masterpiece using AI, that perfectly captures your personality and makes a bold statement. Be the envy of your friends with a custom creation that's as epic as you are."} />
        <div className='customcards'>
          <Flippy
            flipOnHover={true}
            flipDirection="horizontal"
            className="cardddd"
            style={{ width: '300px', height: '300px' }}
          >
            <FrontSide className="frontcaard">
                 <h1>A.	Pinterest</h1>
            </FrontSide>
            <BackSide className="bacckkcard">
                  <h1></h1>
                  <p className='flipbackpara'>
                    Tips To find the tattoo and download the pictures from Pinterest and upload in the website.<br />
                    •	Type in the search bar of Pinterest:   “Tattoo Type” Tattoo designs on paper<br />
                    •	Click on the 3 dots seen on the image – Download the image from Pinterest. <br />
                    •	Once downloaded - Upload/Drag and drop the image on the custom create section of this website.
                  </p>
            </BackSide>
          </Flippy>
          <Flippy
            flipOnHover={true}
            flipDirection="horizontal"
            className="cardddd"
            style={{ width: '300px', height: '300px' }}
          >
            <FrontSide className="frontcaard1">
                 <h1>B.	AI Tattoo Creator</h1>
            </FrontSide>
            <BackSide className="bacckkcard1">
                  <h1></h1>
                  <p className='flipbackpara'>
                  Tips to find the tattoo and download from AI Tattoo Creator. <br />
                •	From the Tattoo ideas (https://blackink.ai/tattoo-ideas) - Choose any kind of tattoo from the category. <br />
                •	A new page opens with a collection of different designs from the same category. - Click on any design style you are interested in.<br />
                •	A group of 4 images appears - Right click on the interested image - Click on “save image as” option (NOTE - do not use the download button available on the image).<br />
                •	Give a file name for the design and click on Save button. (While saving , check the file type available – Always go for PNG Image type)<br />
                •	Once saved – upload/drag & drop the saved image into the custom create section of this website.
                  </p>
            </BackSide>
          </Flippy>
        </div>
        <Paper
          variant="outlined"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className='dragndrop'
          style={{
            border: dragOver ? '2px dashed #000' : '2px dashed #aaa',
            padding: 20,
            textAlign: 'center',
            cursor: 'pointer',
            background: dragOver ? '#eee' : '#fafafa',
            position: 'relative',
          }}
        >
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="raised-button-file"
            //   multiple
            type="file"
            onChange={handleChange}
          />
          <label htmlFor="raised-button-file">
            <Box display="flex" flexDirection="column" alignItems="center">
              <IconButton color="primary" aria-label="upload picture" component="span">
                <CloudUploadIcon style={{ fontSize: 60 }} />
              </IconButton>
              <Typography>Drag and drop files here or click to select file</Typography>
            </Box>
          </label>
          {loading1 && (
            <CircularProgress
              size={24}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-12px',
                marginLeft: '-12px',
              }}
            />
          )}
        </Paper>
        {imagePreview && (
          <Grid container justifyContent="center" style={{ marginTop: 16 }}>
            <Grid item xs={12} sm={6} md={4}>
              <Box
                component="img"
                src={imagePreview}
                alt="Image Preview"
                sx={{ width: '100%', height: 'auto' }}
              />
            </Grid>
          </Grid>
        )}
        

        {!loading && <ProductSlider title={"Our Gallery"} tagline={"Explore tattoos worn by our amazing customers. "} />}
        {/* <DropzoneArea
  acceptedFiles={['image/*']}
  dropzoneText={"Drag and drop an image here or click"}
  onChange={(files) => console.log('Files:', files)}
/> */}
        {/* <Banner />
        <DealSlider title={"Featured Categories"} />
        {!loading && <ProductSlider title={"Suggested for You"} tagline={"Based on Your Activity"} />}
        {!loading && <ProductSlider title={"You May Also Like..."} tagline={"Based on Your Interest"} />}
        {!loading && <ProductSlider title={"Don't Miss These!"} tagline={"Inspired by your order"} />} */}
      </main>
    </>
  );
};

export default Home;
