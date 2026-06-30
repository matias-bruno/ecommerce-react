import { useLocation, useNavigate } from 'react-router-dom';
import SearchIcon from '../../assets/icons/SearchIcon';
import styles from './SearchBar.module.css';
import { useState, useEffect } from 'react';

const SearchBar = () => {
    const [input, setInput] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        setInput(params.get('query') || '');
    }, [location.search]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const value = input.trim();

        if (value) {
            navigate(`/busqueda?query=${encodeURIComponent(value)}`);
        } else {
            navigate('/');
        }
    };

    const handleChange = (event) => {
        setInput(event.target.value);
    };

    return (
        <form className={styles.searchForm} onSubmit={handleSubmit} role="search">
            <input
                className={styles.searchInput}
                type="search"
                value={input}
                onChange={handleChange}
                placeholder="Buscar productos"
                aria-label="Buscar productos"
            />
            <button className={styles.searchButton} type="submit" aria-label="Buscar">
                <SearchIcon />
            </button>
        </form>
    );
};

export default SearchBar;