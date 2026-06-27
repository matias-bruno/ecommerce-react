import {useState, createContext, useContext} from 'react';

// Se crea el contexto
const SearchContext = createContext();

// Se crea un hook para usarlo más fácil
export const useSearch = () => {
    const context = useContext(SearchContext);
    if(!context) {
        throw new Error("useSearch debe ser usado dentro de un SearchProvider");
    }
    return context;
}

export const SearchProvider = ({ children }) => {
    const [query, setQuery] = useState("");

    return (
        <SearchContext.Provider value={{ query, setQuery }}>
            {children}
        </SearchContext.Provider>
    )
};