import { useEffect } from 'react';
import Categories from '../Layouts/Categories';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FlashOnIcon from '@mui/icons-material/FlashOn';
// import Banner from './Banner/Banner';
// import DealSlider from './DealSlider/DealSlider';
// import { DropzoneArea } from 'material-ui-dropzone';
import ProductSlider from '../Home/ProductSlider/ProductSlider';
import { useCallback, useState } from 'react';
import { Box, Paper, Typography, IconButton, Grid, CircularProgress, TextField } from '@mui/material';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from '@mui/material/FormControl';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getSliderProducts } from '../../actions/productAction';
import { useSnackbar } from 'notistack';
import MetaData from '../Layouts/MetaData';
import BannerTitle from '../Home/BannerTitle/BannerTitle';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import './custom.css';
import simg1 from '../../assets/custom/1 inch x 1 inch.jpg'
import simg2 from '../../assets/custom/1.5 inch x 1.5 inch.jpg'
import simg3 from '../../assets/custom/2 inch x 2 inch.jpg'
import simg4 from '../../assets/custom/2.5 inch x 2.5 inch.png'
import simg5 from '../../assets/custom/3 inch x 3 inch.png'
import simg6 from '../../assets/custom/4 inch x 4 inch.jpg'
import simg7 from '../../assets/custom/5 inch x 3 inch.png'
import simg8 from '../../assets/custom/6 inch x 3 inch.jpg'
import simg9 from '../../assets/custom/7 inch x 4 inch.png'
import simg10 from '../../assets/custom/8 inch x 4 inch.png'
import { Input } from '@mui/material';
import MDBox from '../MDBox';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const Index = () => {
  const navigate = useNavigate();
  const getValues = () => {
    return {
      size: "",
      length: "",
      breadth: "",
      bodypart: '',
      description: ''
    };
  };
  const [values, setValues] = useState(getValues);

  const handleChange1 = (event) => {
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  };
  const [hoveredSize, setHoveredSize] = useState(null);

  // const handleSizeHover = (size) => {
  //   setHoveredSize(size);
  // };
  const handleSizeHover = (size) => {
    // if (!values.size) {
    setHoveredSize(size);
    console.log("Hovered Size:", size);
    // }
  };
  const handleSizeLeave = () => {
    // if (!values.size) {
    setHoveredSize(null);
    console.log("Hovered Size Cleared");
    // }
  };

  // const handleSizeLeave = () => {
  //   setHoveredSize(null);
  // };
  const details = [
    {
      title: '1 inch x 1 inch',
      area: '1',
      img: simg1,
    },
    {
      title: '1.5 inch x 1.5 inch',
      area: '2.25',
      img: simg2,
    },
    {
      title: '2 inch x 2 inch',
      area: '4',
      img: simg3,
    },
    {
      title: '2.5 inch x 2.5 inch',
      area: '6.25',
      img: simg4,
    },
    {
      title: '3 inch x 3 inch',
      area: '9',
      img: simg5,
    },
    {
      title: '4 inch x 4 inch',
      area: '16',
      img: simg6,
    },
    {
      title: '5 inch x 3 inch',
      area: '15',
      img: simg7,
    },
    {
      title: '6 inch x 3 inch',
      area: '18',
      img: simg8,
    },
    {
      title: '7 inch x 4 inch',
      area: '28',
      img: simg9,
    },
    {
      title: '8 inch x 4 inch',
      area: '32',
      img: simg10,
    },
  ]
  const getSelectedImage = (selectedSize) => {
    switch (selectedSize) {
      case '1':
        return simg1;
      case '2.25':
        return simg2;
      case '4':
        return simg3;
      case '6.25':
        return simg4;
      case '9':
        return simg5;
      case '16':
        return simg6;
      case '15':
        return simg7;
      case '18':
        return simg8;
      case '28':
        return simg9;
      case '32':
        return simg10;
      default:
        return ''; // Add a default image or handle it as needed
    }
  };
  const getPrice = () => {
    let area;
    if (values.size === 'Add specific Size...') {
      area = values.length * values.breadth;
    }
    else {
      area = values.size;
    }
    area = Number(area)
    console.log(area);
    if (area > 0 && area < 2.5) {
      return '150';
    } else if (area >= 2.5 && area <= 5) {
      return '200';
    } else if (area > 5 && area <= 10) {
      return '250';
    }
    else if (area > 10 && area <= 20) {
      return '300';
    }
    else if (area > 20 && area <= 30) {
      return '350';
    }
    else if (area > 30 && area <= 40) {
      return '400';
    }
    else if (area > 40 && area <= 50) {
      return '450';
    }
    else if (area > 50 && area <= 60) {
      return '500';
    }
    else if (area > 60 && area <= 70) {
      return '550';
    }
    else if (area > 70 && area <= 85) {
      return '600';
    }
    else {
      return 'Please Insert Size To Get Price'; // Add a default value or handle it as needed
    }
  };
  // custom drop down start
  const [dragOver, setDragOver] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(false);
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
  const handleChange2 = useCallback(
    (event) => {
      const files = event.target.files;
      if (files && files[0]) {
        console.log(files[0])
        // handleFileChange(files[0]);
      }
    },
    []
  );

  const buyNow = () => {
    // addToCartHandler();
    navigate('/shipping');
  }
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
      {/* <Categories /> */}
      <main className="flex flex-col gap-3 px-2 mt-16 sm:mt-2">
        <BannerTitle title={"Create Your Own Tattoo Masterpiece "} custom={true} para={"Don't settle for ordinary. With our options to create custom temporary tattoos, you become the artist! Design a unique masterpiece using AI, that perfectly captures your personality and makes a bold statement. Be the envy of your friends with a custom creation that's as epic as you are."} />
        {/* <BannerTitle title={"Note : - Please add your Temperory and Semi permanent Tatoos to your cart before you create a custom Tatoo."} 
        custom={true} para={"Don't worry if you don't have a tattoo design ready. Use any of the options below to find your tattoo idea & share us the same. Find tattoo using Pinterest - steps to 
        find and share us your tattoo idea. ⏬ Find tattoo using AI tattoo generator - steps to find and share us your Tattoo idea ⏬"} /> */}
        {/* <MDBox> */}
        <Card >
        {/* <Card sx={{ minWidth: 275 }}> */}
      <CardContent>
        {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography> */}
        <Typography variant="h5" component="div">
        Note : - Please add your Temperory and Semi permanent Tatoos to your cart before you create a custom Tatoo.
        </Typography>
        {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography> */}
      </CardContent>
    </Card>
        <Card >
      <CardContent>
        <Typography variant="h5" component="div" >
        Don't worry if you don't have a tattoo design ready.<br/> Use any of the options below to find your tattoo idea & share us the same.<br/><br/> Find tattoo using Pinterest - steps to 
        find and share us your tattoo idea. 
        <IconButton color="primary" onClick={() => setToggle1(!toggle1)} aria-label="click1" component="span">
                {/* <CloudUploadIcon style={{ fontSize: 60 }} /> */}
                ⏬
        </IconButton>
        </Typography>
        {
          (toggle1)?
          <Typography variant="h6" component="div" >
        Tips To find the tattoo and download the pictures from Pinterest and upload in the website.<br />
                •	Type in the search bar of Pinterest:   “Tattoo Type” Tattoo designs on paper<br />
                •	Click on the 3 dots seen on the image – Download the image from Pinterest. <br />
                •	Once downloaded - Upload/Drag and drop the image on the custom create section of this website.
         <br/><br/>
        </Typography>:null
        }
        <Typography variant="h5" component="div" >
        Find tattoo using AI tattoo generator - steps to find and share us your Tattoo idea 
        <IconButton color="primary" onClick={() => setToggle2(!toggle2)} aria-label="click2" component="span">
                {/* <CloudUploadIcon style={{ fontSize: 60 }} /> */}
                ⏬
        </IconButton>
         <br/>
        </Typography>
        {
          (toggle2)?
          <Typography variant="h6" component="div" >
        Tips to find the tattoo and download from AI Tattoo Creator. <br />
                •	From the Tattoo ideas (https://blackink.ai/tattoo-ideas) - Choose any kind of tattoo from the category. <br />
                •	A new page opens with a collection of different designs from the same category. - Click on any design style you are interested in.<br />
                •	A group of 4 images appears - Right click on the interested image - Click on “save image as” option (NOTE - do not use the download button available on the image).<br />
                •	Give a file name for the design and click on Save button. (While saving , check the file type available – Always go for PNG Image type)<br />
                •	Once saved – upload/drag & drop the saved image into the custom create section of this website.
         <br/><br/>
        </Typography>:null
        }
        {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography> */}
      </CardContent>
    </Card>
        {/* </MDBox> */}
        {/* <div className='customcards'>
          <Flippy
            flipOnHover={false}
            flipOnClick={false}
            flipDirection="horizontal"
            className="cardddd"
            style={{ width: '450px', height: '300px' }}
          >
            <FrontSide className="frontcaard">
              <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
              <h1 style={{marginBottom:'2rem',fontSize:'24px'}}>A.	Pinterest</h1>
              <p className='flipbackpara'>
                Tips To find the tattoo and download the pictures from Pinterest and upload in the website.<br />
                •	Type in the search bar of Pinterest:   “Tattoo Type” Tattoo designs on paper<br />
                •	Click on the 3 dots seen on the image – Download the image from Pinterest. <br />
                •	Once downloaded - Upload/Drag and drop the image on the custom create section of this website.
              </p>
              </div>
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
            flipOnHover={false}
            flipOnClick={false}
            flipDirection="horizontal"
            className="cardddd"
            style={{ width: '450px', height: '300px' }}
          >
            <FrontSide className="frontcaard1">
              <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
              <h1 style={{marginBottom:'2rem',fontSize:'24px'}}>B.	AI Tattoo Creator</h1>
              <p className='flipbackpara'>
                Tips To find the tattoo and download the pictures from Pinterest and upload in the website.<br />
                •	Type in the search bar of Pinterest:   “Tattoo Type” Tattoo designs on paper<br />
                •	Click on the 3 dots seen on the image – Download the image from Pinterest. <br />
                •	Once downloaded - Upload/Drag and drop the image on the custom create section of this website.
              </p>
              </div>
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
        </div> */}
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
          <Grid container justifyContent="space-evenly" style={{ marginTop: 16 }}>
            <Grid item xs={12} sm={6} md={4}>
              <Box
                component="img"
                src={imagePreview}
                alt="Image Preview"
                sx={{ width: '100%', height: 'auto' }}
              />
            </Grid>
            <Grid container justifyContent="space-evenly" alignItems="stretch" style={{ marginTop: 16 }} className='customgriidd'>
            {/* <Grid container justifyContent="space-evenly" alignItems="stretch" style={{ marginTop: 16, backgroundColor:'#ff5757' }} className='customgriidd'> */}
            {/* <Grid container justifyContent="space-evenly" alignItems="center"  style={{ marginTop: 16 }} className='customgriidd'> */}
              <Box p={3} component="form" role="form" style={{ backgroundColor: 'white', width: '33%', display: 'flex', flexDirection: 'column', justifyContent: "center" }} className='customgriidd1'>
                <h3 className="head1 text-xl font-medium" style={{ fontSize: '48px' }}>Custom Size</h3>
                <Box p={1}>
                  <FormControl fullWidth required>
                    <InputLabel id="demo-simple-select-label">Size</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      defaultValue={values.size}
                      name="size"
                      label="Size"
                      onChange={handleChange1}
                      // disabled={isDisabled}
                      fullWidth
                      sx={{ height: 45 }}
                      required
                    >
                      {details.map((detail) => (
                        <MenuItem
                          key={detail.title}
                          value={detail.area}
                          // onMouseEnter={() => handleSizeHover(values.size || detail.title)}
                          onMouseEnter={() => handleSizeHover(detail.area)}
                          onMouseLeave={handleSizeLeave}
                        >
                          {detail.title}
                        </MenuItem>
                      ))}
                      {/* <MenuItem value={"1 inch x 1 inch"}>1 inch x 1 inch</MenuItem>
                      <MenuItem value={"1.5 inch x 1.5 inch"}>1.5 inch x 1.5 inch</MenuItem>
                      <MenuItem value={"2 inch x 2 inch"}>2 inch x 2 inch</MenuItem>
                      <MenuItem value={"2.5 inch x 2.5 inch"}>2.5 inch x 2.5 inch</MenuItem>
                      <MenuItem value={"3 inch x 3 inch"}>3 inch x 3 inch</MenuItem>
                      <MenuItem value={"4 inch x 4 inch"}>4 inch x 4 inch</MenuItem>
                      <MenuItem value={"5 inch x 3 inch"}>5 inch x 3 inch</MenuItem>
                      <MenuItem value={"6 inch x 3 inch"}>6 inch x 3 inch</MenuItem>
                      <MenuItem value={"7 inch x 4 inch"}>7 inch x 4 inch</MenuItem>
                      <MenuItem value={"8 inch x 4 inch"}>8 inch x 4 inch</MenuItem> */}
                      <MenuItem value={"Add specific Size..."}>Add specific Size...</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                {values.size === 'Add specific Size...' &&
                  (
                    <>
                      <Box p={1}>
                        <FormControl fullWidth required>
                          <InputLabel id="demo-simple-select-label">Length</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            defaultValue={values.length}
                            name="length"
                            label="Length"
                            onChange={handleChange1}
                            // disabled={isDisabled}
                            fullWidth
                            sx={{ height: 45 }}
                            required
                          >
                            <MenuItem value={"1"}>1 inch</MenuItem>
                            <MenuItem value={"1.5"}>1.5 inch</MenuItem>
                            <MenuItem value={"2"}>2 inch</MenuItem>
                            <MenuItem value={"2.5"}>2.5 inch</MenuItem>
                            <MenuItem value={"3"}>3 inch</MenuItem>
                            <MenuItem value={"3.5"}>3.5 inch</MenuItem>
                            <MenuItem value={"4"}>4 inch</MenuItem>
                            <MenuItem value={"4.5"}>4.5 inch</MenuItem>
                            <MenuItem value={"5"}>5 inch</MenuItem>
                            <MenuItem value={"5.5"}>5.5 inch</MenuItem>
                            <MenuItem value={"6"}>6 inch</MenuItem>
                            <MenuItem value={"6.5"}>6.5 inch</MenuItem>
                            <MenuItem value={"7"}>7 inch</MenuItem>
                            <MenuItem value={"7.5"}>7.5 inch</MenuItem>
                            <MenuItem value={"8"}>8 inch</MenuItem>
                            <MenuItem value={"8.5"}>8.5 inch</MenuItem>
                            <MenuItem value={"9"}>9 inch</MenuItem>
                            <MenuItem value={"9.5"}>9.5 inch</MenuItem>
                            <MenuItem value={"10"}>10 inch</MenuItem>
                            <MenuItem value={"10.5"}>10.5 inch</MenuItem>
                            <MenuItem value={"11"}>11 inch</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                      <Box p={1}>
                        <FormControl fullWidth required>
                          <InputLabel id="demo-simple-select-label">Breadth</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            defaultValue={values.breadth}
                            name="breadth"
                            label="breadth"
                            onChange={handleChange1}
                            // disabled={isDisabled}
                            fullWidth
                            sx={{ height: 45 }}
                            required
                          >
                            <MenuItem value={"0.5"}>0.5 inch</MenuItem>
                            <MenuItem value={"1"}>1 inch</MenuItem>
                            <MenuItem value={"1.5"}>1.5 inch</MenuItem>
                            <MenuItem value={"2"}>2 inch</MenuItem>
                            <MenuItem value={"2.5"}>2.5 inch</MenuItem>
                            <MenuItem value={"3"}>3 inch</MenuItem>
                            <MenuItem value={"3.5"}>3.5 inch</MenuItem>
                            <MenuItem value={"4"}>4 inch</MenuItem>
                            <MenuItem value={"4.5"}>4.5 inch</MenuItem>
                            <MenuItem value={"5"}>5 inch</MenuItem>
                            <MenuItem value={"5.5"}>5.5 inch</MenuItem>
                            <MenuItem value={"6"}>6 inch</MenuItem>
                            <MenuItem value={"6.5"}>6.5 inch</MenuItem>
                            <MenuItem value={"7"}>7 inch</MenuItem>
                            <MenuItem value={"7.5"}>7.5 inch</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </>
                  )}
                <Typography style={{ fontWeight: '400', marginBottom: '1rem', marginTop: '1rem', textAlign: 'justify' }}>NOTE : Use inches while measuring the tattoo length. Use scale/ruler or a measuring tape to get the size properly. (refer the gif on the right)</Typography>
                <Box p={1} style={{ paddingBottom: '' }}>
                  <FormControl fullWidth required>
                    <InputLabel id="demo-simple-select-label">Desired Body Parts</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      defaultValue={values.bodypart}
                      name="bodypart"
                      label="Body Part"
                      onChange={handleChange1}
                      // disabled={isDisabled}
                      fullWidth
                      sx={{ height: 45 }}
                      required
                    >
                      <MenuItem value={"Finger"}>Finger</MenuItem>
                      <MenuItem value={"side_palm"}>Side Palm</MenuItem>
                      <MenuItem value={"inner_wrist"}>Inner Wrist</MenuItem>
                      <MenuItem value={"side_wrist"}>Side Wrist</MenuItem>
                      <MenuItem value={"inner_forearm"}>Inner Forearm</MenuItem>
                      <MenuItem value={"outer_forearm"}>Outer Forearm</MenuItem>
                      <MenuItem value={"shoulder"}>Shoulder</MenuItem>
                      <MenuItem value={"inner_bicep"}>Inner Bicep</MenuItem>
                      <MenuItem value={"chest"}>Chest</MenuItem>
                      <MenuItem value={"neck"}>Neck</MenuItem>
                      <MenuItem value={"back"}>Back</MenuItem>
                      {/* <MenuItem value={"2 inch x 2 inch"}>2 inch x 2 inch</MenuItem>
                      <MenuItem value={"2.5 inch x 2.5 inch"}>2.5 inch x 2.5 inch</MenuItem>
                      <MenuItem value={"3 inch x 3 inch"}>3 inch x 3 inch</MenuItem>
                      <MenuItem value={"4 inch x 4 inch"}>4 inch x 4 inch</MenuItem>
                      <MenuItem value={"5 inch x 3 inch"}>5 inch x 3 inch</MenuItem>
                      <MenuItem value={"6 inch x 3 inch"}>6 inch x 3 inch</MenuItem>
                      <MenuItem value={"7 inch x 4 inch"}>7 inch x 4 inch</MenuItem>
                      <MenuItem value={"8 inch x 4 inch"}>8 inch x 4 inch</MenuItem> */}
                      <MenuItem value={"other"}>Other Body Part</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                {
                  values.bodypart === 'other' ?
                    <Box p={1}>
                      <TextField
                        label="Description"
                        value={values.description}
                        name="description"
                        fullWidth={true}
                        onChange={handleChange1}
                        required
                      />
                    </Box>
                    :
                    null
                }
                <hr style={{ border: '0.5px solid black', marginTop: '1rem', marginBottom: '1rem' }} />
                <Box p={1} style={{ overflow: 'hidden' }}>

                  <label htmlFor="raised-button-file">
                    {/* <Box display="flex" flexDirection="column" alignItems="center">
                      <IconButton color="primary" aria-label="upload picture" component="span">
                      <CloudUploadIcon style={{ fontSize: 60 }} />
                    </IconButton> */}
                    <Typography style={{ fontWeight: '600', marginBottom: '1rem' }}>Do you have a reference image of how the tattoo should look like on the selected body part?</Typography>
                    {/* </Box> */}
                  </label>
                  <input
                    accept="image/*"
                    // style={{ display: 'none' }}
                    id="raised-button-file"
                    //   multiple
                    type="file"
                    onChange={handleChange2}
                  />
                </Box>
                <Box style={{boxShadow:'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',marginTop:'1.5rem'}}>
                <Box p={1} style={{fontSize:'1.3rem',fontWeight:'700'}}>
                  Price = ₹ {getPrice()}
                </Box>
                <Box p={1}>

                  <div className="w-full flex gap-3">

                    <button onClick={buyNow} className={"p-4 w-100 flex items-center justify-center gap-2 text-white bg-primary-orange rounded-sm shadow hover:shadow-lg"}>
                      <FlashOnIcon />
                      BUY NOW
                    </button>
                  </div>
                </Box>
                </Box>
              </Box>
              {/* {
                  values.size || hoveredSize ? */}
              <Grid item xs={12} sm={6} md={4} style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                <h3 className="head1 text-xl font-medium" style={{ fontSize: '48px' }}>The Selected Size Looks Like This</h3>
                <Box
                  component="img"
                  // src={getSelectedImage(values.size)}
                  src={getSelectedImage(values.size) || getSelectedImage(hoveredSize)}
                  alt="Selected Size Preview"
                  // sx={{ width: '100%', height: 'fit-content' }}
                  sx={{ width: '100%', height: 'auto' }}
                />
              </Grid>
              {/* : null
              } */}
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

export default Index;
