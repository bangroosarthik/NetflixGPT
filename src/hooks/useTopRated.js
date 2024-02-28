import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";
import {addTopRatedMovies } from "../utils/movieSlice";
import { useSelector } from "react-redux";
const useTopRated=()=>{
    const dispatch=useDispatch();
    const topRated=useSelector(store => store.movies.topRatedMovies);
    const getTopRatedMovies= async ()=>{
      const data= await fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", API_OPTIONS);
      const json=await data.json();
      
      dispatch(addTopRatedMovies(json.results));
    };
  
    useEffect(()=>{
      !topRated && getTopRatedMovies();
    },[])
}

export default useTopRated;