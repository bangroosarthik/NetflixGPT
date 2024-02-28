import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";
import {addUpcoming } from "../utils/movieSlice";
import { useSelector } from "react-redux";
const useUpcoming=()=>{
    const dispatch=useDispatch();
    const upcomingMovies=useSelector(store => store.movies.addUpcoming);
    const getUpcoming= async ()=>{
      const data= await fetch("https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1", API_OPTIONS);
      const json=await data.json();
      
      dispatch(addUpcoming(json.results));
    };
  
    useEffect(()=>{
      !upcomingMovies && getUpcoming();
    },[])
}

export default useUpcoming;