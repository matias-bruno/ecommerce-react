import { useSearch } from '../../context/SearchContext';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '../../assets/icons/SearchIcon';
import styles from './SearchBar.module.css';
import { useState, useEffect } from 'react';

const SearchBar = () => {
    const { query, setQuery } = useSearch();
    const [input, setInput] = useState(query || '');
    const navigate = useNavigate();

    useEffect(() => {
        setInput(query || '');
    }, [query]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const value = input.trim();
        setQuery(value);

        if (value) {
            navigate('/busqueda');
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