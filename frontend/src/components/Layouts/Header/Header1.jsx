import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import Searchbar from './Searchbar';
import logo from '../../../assets/images/logo.png';
import PrimaryDropDownMenu from './PrimaryDropDownMenu';
import SecondaryDropDownMenu from './SecondaryDropDownMenu';
import { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './header.css';

const Header1 = () => {

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const { cartItems } = useSelector(state => state.cart);

  const [togglePrimaryDropDown, setTogglePrimaryDropDown] = useState(false);
  const [toggleSecondaryDropDown, setToggleSecondaryDropDown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 200); // Change 100 to your desired scroll threshold
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (

    <header className={`bg-primary-blue py-2.5 w-full z-10 bgcolorchange  ${isScrolled ? 'fixed top-0' : ''}`}>

      {/* <!-- navbar container --> */}
      <div className={`w-full sm:w-9/12 px-1 sm:px-4 m-auto flex justify-between items-center relative ${isScrolled ? '' : 'main1-scroll'}`}>

        {/* <!-- logo & search container --> */}
        <div className={`flex items-center flex-1 ${isScrolled ? '' : 'main-scroll'}`}>
          <Link className="h-9 mr-1 sm:mr-4" to="/">
            <img draggable="false" className={`h-full w-full object-contain ${isScrolled ? '' : 'logo-scroll'}`} src={logo} alt="Logo" />
          </Link>

          <Searchbar isScrolled={!isScrolled} />
        </div>
        {/* <!-- logo & search container --> */}

        {/* <!-- right navs --> */}
        <div className={`flex items-center justify-between ml-1 sm:ml-0 gap-0.5 sm:gap-7 relative ${isScrolled ? '' : 'hidde'}`}>

          {isAuthenticated === false ?
            <Link to="/login" className="px-3 sm:px-9 py-0.5 text-primary-blue bg-white border font-medium rounded-sm cursor-pointer">Login</Link>
            :
            (
              <span className="userDropDown flex items-center text-black font-medium gap-1 cursor-pointer" onClick={() => setTogglePrimaryDropDown(!togglePrimaryDropDown)}>{user.name && user.name.split(" ", 1)}
                <span>{togglePrimaryDropDown ? <ExpandLessIcon sx={{ fontSize: "16px" }} /> : <ExpandMoreIcon sx={{ fontSize: "16px" }} />}</span>
              </span>
            )
          }

          {togglePrimaryDropDown && <PrimaryDropDownMenu setTogglePrimaryDropDown={setTogglePrimaryDropDown} user={user} />}

          {/* <span className="moreDropDown hidden sm:flex items-center text-white font-medium gap-1 cursor-pointer" onClick={() => setToggleSecondaryDropDown(!toggleSecondaryDropDown)}>More
            <span>{toggleSecondaryDropDown ? <ExpandLessIcon sx={{ fontSize: "16px" }} /> : <ExpandMoreIcon sx={{ fontSize: "16px" }} />}</span>
          </span>

          {toggleSecondaryDropDown && <SecondaryDropDownMenu />} */}

          <Link to="/custom" className="flex items-center text-black font-medium gap-2 relative">
            <span><DashboardCustomizeIcon /></span>
            Custom
          </Link>
          <Link to="/cart" className="flex items-center text-black font-medium gap-2 relative">
            <span><ShoppingCartIcon /></span>
            {cartItems.length > 0 &&
              <div className="w-5 h-5 p-2 bg-red-500 text-xs rounded-full absolute -top-2 left-3 flex justify-center items-center border">
                {cartItems.length}
              </div>
            }
            Cart
          </Link>
        </div>
        {/* <!-- right navs --> */}

      </div>
      {/* <!-- navbar container --> */}
    </header>
  )
};

export default Header1;