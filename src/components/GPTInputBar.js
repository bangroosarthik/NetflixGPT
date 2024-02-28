// import React, { useRef } from 'react'
// import { lang } from '../utils/languageConstants';
// import { useDispatch, useSelector } from 'react-redux'
// import openai from "../utils/openAI";
// import { API_OPTIONS } from '../utils/constants';
// import { addGptMovieResult } from '../utils/gptSlice';
// const GPTInputBar = () => {
//     const dispatch=useDispatch();
//     const searchText=useRef(null);
//     const langKey=useSelector(store=> store.config.lang);

//     //search movie in TMDB
//     const searchMovieTMDB=async(movie)=>{
//         const data=await fetch("https://api.themoviedb.org/3/search/movie?query="+movie+"&include_adult=false&language=en-US&page=1", API_OPTIONS);
//         const json=await data.json();
//         return json.results;
//     }


//     const handleGPTSearchClick=async ()=>{
//         console.log(searchText.current.value);
//         //make an api call to get movie results 
//         const gptquery="Act as a Movie Recommendation System and suggest some movies for the query"+searchText.current.value+". Only give me name of 5 movies, comma separated like the example result given ahead. Example Result: Gadar,Sholay,Article370,Jawaan,Dhamal";
//         const gptresults=await openai.chat.completions.create({
//             messages: [{ role: 'user', content: gptquery  }],
//             model: 'gpt-3.5-turbo',
//           });
//           if(!gptresults.choices){
//             //To error happended
//           }
//           const gptMovies=gptresults.choices?.[0]?.message?.content.split(",");

//           const promiseArray=gptMovies.map(movie=> searchMovieTMDB(movie));

//           const tmdbResults=await Promise.all(promiseArray);

//         //   console.log(tmdbResults);
//         dispatch(addGptMovieResult(tmdbResults)); 

//     }
//   return (
//     <div className="pt-[35%] md:pt-[10%] flex justify-center">
//       <form
//         className="w-full md:w-1/2 bg-gray-900 rounded-xl grid grid-cols-12" onSubmit={(e)=>e.preventDefault()}
//       >
//         <input
//           type="text" ref={searchText}
//           className=" p-4 m-4 col-span-9 text-black border-0 rounded-md"
//           placeholder={lang[langKey].gptSearchPlaceholder}
//         />
//         <button
//           className="col-span-3 m-5 px-4 bg-red-700 text-white rounded-lg" onClick={handleGPTSearchClick}
//         >
//         {lang[langKey].search}
//         </button>
//       </form>
//     </div>
//   )
// }

// export default GPTInputBar
import React, { useRef, useState } from 'react';
import { lang } from '../utils/languageConstants';
import { useDispatch, useSelector } from 'react-redux';
import openai from "../utils/openAI";
import { API_OPTIONS } from '../utils/constants';
import { addGptMovieResult } from '../utils/gptSlice';

const GPTInputBar = () => {
    const dispatch = useDispatch();
    const searchText = useRef(null);
    const langKey = useSelector(store => store.config.lang);
    const [isLoading, setIsLoading] = useState(false); // Step 1: State for loading status

    //search movie in TMDB
    const searchMovieTMDB = async (movie) => {
        const data = await fetch("https://api.themoviedb.org/3/search/movie?query=" + movie + "&include_adult=false&language=en-US&page=1", API_OPTIONS);
        const json = await data.json();
        return json.results;
    }

    const handleGPTSearchClick = async () => {
        setIsLoading(true); // Step 2: Set loading state to true when search starts
        const gptquery = "Act as a Movie Recommendation System and suggest some movies for the query" + searchText.current.value + ". Only give me name of 5 movies if not mentioned the name of movie directly else show that movie only , comma separated like the example result given ahead. Example Result: Gadar,Sholay,Article370,Jawaan,Dhamal";
        const gptresults = await openai.chat.completions.create({
            messages: [{ role: 'user', content: gptquery }],
            model: 'gpt-3.5-turbo',
        });
        if (!gptresults.choices) {
            // Handle error
        }
        const gptMovies = gptresults.choices?.[0]?.message?.content.split(",");

        const promiseArray = gptMovies.map(movie => searchMovieTMDB(movie));

        const tmdbResults = await Promise.all(promiseArray);

        dispatch(addGptMovieResult({movieNames:gptMovies,movieResults:tmdbResults}));
        setIsLoading(false); // Step 3: Set loading state to false after search is complete
    }

    return (
        <div className="pt-[35%] md:pt-[10%] flex justify-center">
            <form
                className="w-full md:w-1/2 bg-gray-900 rounded-xl grid grid-cols-12" onSubmit={(e) => e.preventDefault()}
            >
                <input
                    type="text" ref={searchText}
                    className="p-4 m-4 col-span-9 text-black border-0 rounded-md"
                    placeholder={lang[langKey].gptSearchPlaceholder}
                />
                <button
                    className="col-span-3 m-5 px-4 bg-red-700 text-white rounded-lg" onClick={handleGPTSearchClick}
                >
                    {isLoading ? 'Searching...' : lang[langKey].search} {/* Display loading text or search text based on loading state */}
                </button>
            </form>
        </div>
    )
}

export default GPTInputBar;
