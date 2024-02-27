
import Header from './Header'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import usePopularMovies from '../hooks/usePopularMovies';
import useTopRated from '../hooks/useTopRated';
import useUpcoming from '../hooks/useUpcoming';
import GPTSearch from './GPTSearch';
import { useSelector } from 'react-redux';
const Browse = () => {
  const showGptSearch=useSelector(store=> store.gpt.showGptSearch);
  useNowPlayingMovies();
  usePopularMovies();
  useTopRated();
  useUpcoming();
  return (
    <div>
      <Header />
      {showGptSearch ? <GPTSearch /> : ( <><MainContainer /> <SecondaryContainer /></>)}
      
    </div>
  )
}

export default Browse