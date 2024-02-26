import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'
const SecondaryContainer = () => {
  const movies= useSelector((store)=> store.movies)
  return (
    movies.nowPlayingMovies && ( <div className='bg-black pl-12 pr-12'>
      <div className="-mt-20  relative z-20 ">
        <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
      </div>
      <MovieList title={"Popular"} movies={movies.popularMovies} />
      <MovieList title={"Top Rated"} movies={movies.topRatedMovies} />
      <MovieList title={"Upcoming"} movies={movies.addUpcoming} />
    </div>
    )
  )
}

export default SecondaryContainer