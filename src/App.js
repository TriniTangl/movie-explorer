import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import MovieDetails from './containers/MovieDetails';
import PopularMovies from './containers/PopularMovies';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={ <PopularMovies /> } />
          <Route path="/movie/:id" element={ <MovieDetails /> } />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
