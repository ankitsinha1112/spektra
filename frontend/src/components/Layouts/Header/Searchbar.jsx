import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Search.css';

const Searchbar = (props) => {

    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(keyword.trim()){
            navigate(`/products/${keyword}`)
        } else {
            navigate('/products');
        }
    }

    return (
        <form onSubmit={handleSubmit} className={`w-full sm:w-9/12 px-1 formofsearch sm:px-4 py-1.5 flex justify-between items-center shadow-md bg-white rounded-sm overflow-hidden ${props.isScrolled ? 'hidde' : ''}`}>
        {/* <form onSubmit={handleSubmit} className={`w-full sm:w-9/12 px-1 sm:px-4 py-1.5 flex justify-between items-center shadow-md bg-white rounded-sm overflow-hidden ${props.isScrolled ? 'hidde' : ''}`}> */}
            <input value={keyword} onChange={(e) => setKeyword(e.target.value)} className="text-sm flex-1 outline-none border-none placeholder-gray-500" type="text" placeholder="Search for Different Tatoos" />
            <button type="submit" className="text-primary-blue"><SearchIcon /></button>
        </form>
    );
};

export default Searchbar;
