// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import { Link } from 'react-router-dom';

// const categories = [
//     "Temperory",
//     "Semi Permanent",
//     "Size",
//     "Body Parts",
// ]

// const MinCategory = () => {
//     return (
//         <section className="hidden sm:block bg-white w-full px-2 sm:px-12 overflow-hidden border-b mt-14">
//             <div className="flex items-center justify-between p-0.5">
//                 {categories.map((el, i) => (
//                     <Link to="/products" key={i} className="text-sm p-2 text-gray-800 font-medium hover:text-primary-blue flex items-center gap-0.5 group">{el} <span className="text-gray-400 group-hover:text-primary-blue"><ExpandMoreIcon sx={{ fontSize: "16px" }} /></span></Link>
//                 ))}
//             </div>
//         </section>
//     );
// };

// export default MinCategory;
import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';

const categories = [
    {
        name: "Temperory",
        subcategories: ["Subcategory1.1", "Subcategory1.2", "Subcategory1.3"],
    },
    {
        name: "Semi Permanent",
        subcategories: ["Subcategory2.1", "Subcategory2.2", "Subcategory2.3"],
    },
    {
        name: "Size",
        subcategories: ["Subcategory3.1", "Subcategory3.2", "Subcategory3.3"],
    },
    {
        name: "Body Parts",
        subcategories: ["Subcategory4.1", "Subcategory4.2", "Subcategory4.3"],
    },
];

const MinCategory = () => {
    const [expandedCategories, setExpandedCategories] = useState([]);

    const toggleCategory = (categoryName) => {
        setExpandedCategories((prev) => {
            if (prev.includes(categoryName)) {
                return prev.filter((category) => category !== categoryName);
            } else {
                return [...prev, categoryName];
            }
        });
    };

    return (
        <section className="hidden sm:block bg-white w-full px-2 sm:px-12 overflow-hidden border-b mt-4 relative">
            <div className="flex items-center justify-between p-0.5">
                {categories.map((category, i) => (
                    <div key={i} className="group relative">
                        <Link
                            to={`/products`}
                            className="text-sm p-2 text-gray-800 font-medium hover:text-primary-blue flex items-center gap-0.5"
                            onClick={() => toggleCategory(category.name)}
                        >
                            {category.name}{' '}
                            <span
                                className={`text-gray-400 ${
                                    expandedCategories.includes(category.name) ? 'rotate-180' : ''
                                }`}
                            >
                                <ExpandMoreIcon sx={{ fontSize: '16px' }} />
                            </span>
                        </Link>

                        {/* Dropdown for subcategories */}
                        {expandedCategories.includes(category.name) && (
                            <div className="absolute top-full left-0 bg-white p-2 border border-gray-300 rounded-sm mt-1 z-10">
                                {category.subcategories.map((subcategory, j) => (
                                    <Link
                                        key={j}
                                        to={`/products?category=${subcategory}`}
                                        className="text-sm p-2 text-gray-800 font-medium hover:text-primary-blue block"
                                    >
                                        {subcategory}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default MinCategory;


