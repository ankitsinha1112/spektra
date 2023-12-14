import fashion from '../../assets/images/Categories/t2.png';
import { Link } from 'react-router-dom';

const catNav = [
    {
        name: "Flowers",
        // icon: mobiles,
        icon: fashion,
    },
    {
        name: "Clock",
        icon: fashion,
    },
    {
        name: "Spiritual",
        icon: fashion,
    },
    {
        name: "Animals",
        icon: fashion,
    },
    {
        name: "Birds",
        icon: fashion,
    },
    {
        name: "Creatures",
        icon: fashion,
    },
    {
        name: "Objects",
        icon: fashion,
    },
    {
        name: "Mythology",
        icon: fashion,
    },
    {
        name: "Symbol",
        icon: fashion,
    },
    // {
    //     name: "Travel",
    //     icon: travel,
    // },
    // {
    //     name: "Appliances",
    //     icon: appliances,
    // },
    // {
    //     name: "Furniture",
    //     icon: furniture,
    // },
    // {
    //     name: "Beauty,Toys & more",
    //     icon: beauty,
    // },
    // {
    //     name: "Grocery",
    //     icon: grocery,
    // },
]

const Categories = () => {
    return (
        <section className="hidden sm:block bg-white mt-10 mb-4 min-w-full px-12 py-1 shadow overflow-hidden">

            <div className="flex items-center justify-between mt-4">

                {catNav.map((item, i) => (
                    <Link to={`/products?category=${item.name}`} className="flex flex-col gap-1 items-center p-2 group" key={i}>
                        <div className="h-16 w-16">
                            <img draggable="false" className="h-full w-full object-contain" src={item.icon} alt={item.name} />
                        </div>
                        <span className="text-sm text-gray-800 font-medium group-hover:text-primary-blue">{item.name}</span>
                    </Link>
                ))}

            </div>
        </section>
    );
};

export default Categories;
