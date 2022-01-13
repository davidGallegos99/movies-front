import { createContext } from "react";

const SearchContext = createContext({
    query:'',
    setQuery:(q)=>{}
})

export default SearchContext;