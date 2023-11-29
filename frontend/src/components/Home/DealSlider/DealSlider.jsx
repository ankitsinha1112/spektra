import Product from './Product';
import Slider from 'react-slick';
import { NextBtn, PreviousBtn } from '../Banner/Banner';
import { Link } from 'react-router-dom';
import { offerProducts } from '../../../utils/constants';
import { getRandomProducts } from '../../../utils/functions';
import CategoryCard from "../../FeaturedCard/CategoryCard";
import ItemCard from "../../ItemCard/ItemCard";

import './DealSlider.css'
import slide1 from '../../../assets/images/a1.jpg';
import slide2 from '../../../assets/images/a2.jpg';
import slide3 from '../../../assets/images/a3.jpg';
export const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 1,
    swipe: false,
    prevArrow: <PreviousBtn />,
    nextArrow: <NextBtn />,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};

const featuredCategories = [{id:1,image:slide1,url:'/',name:'Create Your Own Tattoo Masterpiece - No Regrets!',
desc:"Don't settle for ordinary. With our options to create custom temporary tattoos, you become the artist! Design a unique masterpiece using AI, that perfectly captures your personality and makes a bold statement. Be the envy of your friends with a custom creation that's as epic as you are."
},{id:2,image:slide2,url:'/products?type=Temperory',name:'Express Yourself with Funky and Bold Temporary Tattoos',desc:"Dive into a playground of self-expression with our jaw-dropping collection of temporary tattoos. Unleash your inner rebel, rock star, or trendsetter. Our funky designs let you switch up your style effortlessly and make heads turn wherever you go."},
{id:3,image:slide1,url:'/products?type=Semi-permanent',name:'Temporary Tattoos for Every Damn Occasion',desc:"Ready to steal the show? Our temporary tattoos are the ultimate party accessory. From wild nights out to Enchanting Trips/Vacations, we've got you covered. Stand out from the crowd, embrace the moment, and leave an unforgettable impression wherever you rock our badass temporary tattoos."}]
const DealSlider = ({ title }) => {
    return (
        <section className="bg-white w-full shadow overflow-hidden">
            {/* <!-- header --> */}
            <div className="flex px-6 py-3 justify-between items-center">
                <h1 className="text-xl font-medium">{title}</h1>
                <Link to="/products" className="bg-primary-blue text-xs font-medium text-white px-5 py-2.5 rounded-sm shadow-lg">VIEW ALL</Link>
            </div>
            <hr />
            {/* <!-- header --> */}

                <div className="featured__categories__card__container">
                    { featuredCategories.map((category) =>  <ItemCard key={category.id} data={category}/>)}
                    {/* { featuredCategories.map((category) =>  <CategoryCard key={category.id} data={category}/>)} */}
                </div>
                {/* <Slider {...settings}>
                    {getRandomProducts(offerProducts, 12).map((item, i) => (
                        <Product {...item} key={i} />
                    ))}
                </Slider> */}

        </section>
    );
};

export default DealSlider;
