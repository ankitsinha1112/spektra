import Slider from 'react-slick';
import { NextBtn, PreviousBtn } from '../Banner/Banner';
import { Link } from 'react-router-dom';

import './BannerTitle.css'

const BannerTitle = ({ title, para,custom }) => {
    return (
        <section className="priordiv bg-white w-full shadow overflow-hidden">
            <div className='overlay'>

            <div className="flex px-6 py-3 justify-between items-center">
                <h1 className="head1 text-xl font-medium">{title}</h1>
                {/* <Link to="/products" className="bg-primary-blue text-xs font-medium text-white px-5 py-2.5 rounded-sm shadow-lg">VIEW ALL</Link> */}
            </div>
            <div className="flex px-6 py-3 justify-between items-center">
                <h2 className="head2 text-xl font-medium">{para}</h2>
            </div>
            {
                (custom === false)?
                <Link to="/products" className='butttn'>VIEW ALL</Link>
                : null
            }
            </div>
            {/* <hr /> */}
            {/* <header className="priordiv">
	        <div class="overlay">
            <h1>{title}</h1>
            <h3>{para}</h3> 
               <br />
	        <button>VIEW ALL</button>
		        </div>
            </header> */}
        </section>
    );
};

export default BannerTitle;
