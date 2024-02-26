import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";
import {addUpcoming } from "../utils/movieSlice";
const useUpcoming=()=>{
    const dispatch=useDispatch();
    const getUpcoming= async ()=>{
      const data= await fetch("https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1", API_OPTIONS);
      const json=await data.json();
      
      dispatch(addUpcoming(json.results));
    };
  
    useEffect(()=>{
      getUpcoming();
    },[])
}

export default useUpcoming;