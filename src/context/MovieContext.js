import { createContext } from "react";

const MovieContext =  createContext({
    movie: {},
    setMovie:(auth) => {}
})

export default MovieContext