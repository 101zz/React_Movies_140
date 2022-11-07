import MoviesList from "./MoviesList";
import { landingPageDTO } from "./movies.model";
import { useState } from "react";
import { useEffect } from "react";


export default function LandingPage(){
    const [movies, setMovies] = useState<landingPageDTO>({});

  useEffect(() => {
    const timerId = setTimeout(() => {
      setMovies({
        inTheaters: [
          {
          id: 1,
          title: 'Spider-Man Far From Home',
          poster: 'https://upload.wikimedia.org/wikipedia/en/b/bd/Spider-Man_Far_From_Home_poster.jpg'
        },
        {
          id: 2,
          title: 'Luca',
          poster: 'https://www.metaflix.com/wp-content/uploads/2021/04/Disney-Pixar-Luca-Poster.jpg'
        }
      ],
      upcomingRealses: [
        {
          id: 3,
          title: 'Soul',
          poster: 'https://m.media-amazon.com/images/M/MV5BZGE1MDg5M2MtNTkyZS00MTY5LTg1YzUtZTlhZmM1Y2EwNmFmXkEyXkFqcGdeQXVyNjA3OTI0MDc@._V1_.jpg'
        }
      ]
      })
    }, 1000);

    return () => clearTimeout(timerId);
  })

    return (
        <>
            <h3>In Theaters</h3>
            <MoviesList movies={movies.inTheaters}/>

            <h3>Upcoming Releases</h3>
                <MoviesList movies={movies.upcomingRealses}/>
        </>
    )
}