import { createSlice } from "@reduxjs/toolkit";

const gptSlice=createSlice({
    name:'GPT',
    initialState:{
        showGptSearch:false,
        movieResults:null,
        movieNames:null,
    },
    reducers:{
        toggleGPTSearchView:(state)=>{
            state.showGptSearch=!state.showGptSearch;
        },
        addGptMovieResult:(state,action)=>{
            const {movieNames,movieResults} =action.payload;   
            state.movieNames=movieNames;
            state.movieResults=movieResults; 
        }
    },
});

export const {toggleGPTSearchView,addGptMovieResult} = gptSlice.actions;
export default gptSlice.reducer