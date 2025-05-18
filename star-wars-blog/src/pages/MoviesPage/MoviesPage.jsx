import React, { useEffect, useState, useRef } from 'react'
import './MoviesPage.scss'
import '../../sharedStyles/index.scss'
import BackArrow from '../../assets/images/back-arrow.webp'
import NextArrow from '../../assets/images/next-arrow.webp'
import { TmdbApiServices } from '../../api/api-tmdb'
import config from '../../config'
import DisneyPlusMoviesData from '../../data/moviesDisneyPlusURLs.json'
import TrailerModal from '../../components/TrailerModal/TrailerModal'



function MoviesPage() {

    const [listingIsDisplayed, setListingIsDisplayed] = useState('listing-open')
    const [listingItemsAreDisplayed, setListingItemsAreDisplayed] = useState('listing-content-open')
    const [alternateTextPosition, setAlternateTextPosition] = useState('alternate-text-to-right')
    const [listingDisplayArrow, setListingDisplayArrow] = useState(BackArrow)
    const [tmdbMoviesData, setTmdbMoviesData] = useState()
    const [tmdbSeriesData, setTmdbSeriesData] = useState()
    const [moviesList, setMoviesList] = useState([])
    const [mediaType, setMediaType] = useState('films')
    const [isActiveMoviesColor, setIsActiveMoviesColor] = useState('isActiveMovies')
    const [isActiveSeriesColor, setIsActiveSeriesColor] = useState('')
    const [currentMediaId, setCurrentMediaId] = useState()
    const [currentMovie, setCurrentMovie] = useState()
    const [currentMovieURL, setCurrentMovieURL] = useState()
    const [currentMovieCreators, setCurrentMovieCreators] = useState()
    const [currentMovieActors, setCurrentMovieActors] = useState()
    const [currentMovieTrailerURL, setCurrentMovieTrailerURL] = useState()
    const [datetime, setDatetime] = useState(new Date())
    const { fetchStarWarsMovies } = TmdbApiServices
    const listingImageWrapperRef = useRef(null);
    let startX = 0;
    let endX = 0;


    // Récupération des films Star Wars
    useEffect(() => {
        fetchStarWarsMovies(1, config.tmdbMoviesListId)
        .then(res => setTmdbMoviesData(res.items))
    }, [fetchStarWarsMovies])


    // Récupération des séries Star Wars
    useEffect(() => {
        fetchStarWarsMovies(1, config.tmdbSeriesListId)
        .then(res => setTmdbSeriesData(res.items))
    }, [fetchStarWarsMovies])


    // Tri des films et séries par date de sortie 
    // + affichage des films ou des séries
    useEffect(() => {
        if (mediaType === 'films' && tmdbMoviesData) {
            setMoviesList(tmdbMoviesData.sort((a, b) => a.release_date < b.release_date))
            setIsActiveMoviesColor('isActiveMovies')
            setIsActiveSeriesColor('')
        } else if (mediaType === 'series' && tmdbSeriesData) {
            setMoviesList(tmdbSeriesData.sort((a, b) => a.first_air_date < b.first_air_date))
            setIsActiveSeriesColor('isActiveSeries')
            setIsActiveMoviesColor('')
        }
    }, [mediaType, isActiveMoviesColor, isActiveSeriesColor, tmdbMoviesData, tmdbSeriesData])


    // Récupération des données du film / de la série sélectionné-ée
    useEffect(() => {
        if (currentMediaId && tmdbMoviesData && mediaType === 'films') {
            const movie = tmdbMoviesData.filter(movie => movie.id === currentMediaId)
            setCurrentMovie(movie[0])
            setDatetime(new Date(movie[0].release_date))
        } else if (currentMediaId && tmdbSeriesData && mediaType === 'series') {
            const movie = tmdbSeriesData.filter(movie => movie.id === currentMediaId)
            setCurrentMovie(movie[0])
            setDatetime(new Date(movie[0].first_air_date))
        }
    }, [currentMediaId, mediaType, tmdbMoviesData, tmdbSeriesData])


    // Récupération des informations locales du média courant
    useEffect(() => {
        if (currentMediaId) {
            const disneyPlusObject = DisneyPlusMoviesData.find(movie => movie.id === currentMediaId)
            if (disneyPlusObject) {
                setCurrentMovieURL(disneyPlusObject.disneyPlusUrl)
                setCurrentMovieCreators(disneyPlusObject.realisedBy || disneyPlusObject.createdBy)
                setCurrentMovieActors(disneyPlusObject.actors)
                setCurrentMovieTrailerURL(disneyPlusObject.trailerURL)
            }
        }
    }, [currentMediaId])

    
    // Détecter le début du toucher
    const handleTouchStart = (e) => {
        if (window.innerWidth > 660) return; // Désactiver le swipe si on n'est pas sur mobile
        startX = e.touches[0].clientX;
    };


    // Détecter le mouvement du swipe
    const handleTouchMove = (e) => {
        if (window.innerWidth > 660) return;
        endX = e.touches[0].clientX;
    };


    // Détecter la fin du swipe et agir en conséquence
    const handleTouchEnd = (e) => {
        if (window.innerWidth > 660) return;
        const deltaX = endX - startX;
        if (deltaX > 50 && listingIsDisplayed === 'listing-close') {
            displayListingFunction(e); // Ouvrir le menu avec un swipe vers la droite
        } else if (deltaX < -50 && listingIsDisplayed === 'listing-open') {
            displayListingFunction(e); // Fermer le menu avec un swipe vers la gauche
        }
    };


    // Fonction par défaut pour ouvrir ou fermer la liste des médias
    const displayListingFunction = (e) => {
        e.preventDefault()
        if (listingIsDisplayed === 'listing-open') {
            setListingItemsAreDisplayed('listing-content-close')
            setListingIsDisplayed('listing-close')
            setListingDisplayArrow(NextArrow)
            setAlternateTextPosition('alternate-text-to-center')
        } else {
            setListingDisplayArrow(BackArrow)
            setListingItemsAreDisplayed('listing-content-open')
            setListingIsDisplayed('listing-open')
            setAlternateTextPosition('alternate-text-to-right')
        }
    }


    // fonction pour ouvrir la liste des médias depuis le menu
    const openListingFunction = (e) => {
        e.preventDefault()
        if (listingIsDisplayed === 'listing-close') {
            setListingDisplayArrow(BackArrow)
            setListingItemsAreDisplayed('listing-content-open')
            setListingIsDisplayed('listing-open')
            setAlternateTextPosition('alternate-text-to-right')
        }
    }


    // Fonction de sélection du menu (films ou séries)
    const menuControlFunction = (e, mediaType) => {
        setMediaType(mediaType)
        setCurrentMediaId(); 
        setCurrentMovie(); 
        openListingFunction(e)
    }


    // Fonction de sélection d'un film ou d'une série
    const selectMovieFunction = (e, movie) => {
        setCurrentMediaId(movie.id)
        displayListingFunction(e)
    }


    return (
        <div className='app movies-page-wrapper'>
            <div className='movies-media-navbar'>

                <div 
                className={`div-movies ${isActiveMoviesColor}`} 
                tabIndex="0"
                title='Sélectionner les films'
                onClick={(e) => menuControlFunction(e, 'films')}
                onKeyDown={(e) => e.key === 'Enter' && menuControlFunction(e, 'films')}
                >films</div>

                <div 
                className={`div-series ${isActiveSeriesColor}`} 
                tabIndex="0"
                title='Sélectionner les séries'
                onClick={(e) => menuControlFunction(e, 'series')}
                onKeyDown={(e) => e.key === 'Enter' && menuControlFunction(e, 'series')}
                >séries</div>

            </div>
            <h1 className='movies-page-title'>Vidéothèque</h1>
            <div className='movies-page-content'>
                <aside 
                className={`movies-page-media-listing ${listingIsDisplayed}`}>
                    <div 
                        ref={listingImageWrapperRef}
                        className='movies-page-media-listing-image-wrapper'
                        onClick={(e) => displayListingFunction(e)}
                        onTouchStart={(e) => handleTouchStart(e)}
                        onTouchMove={(e) => handleTouchMove(e)}
                        onTouchEnd={(e) => handleTouchEnd(e)}
                        >
                        <img src={listingDisplayArrow} alt="Ouvrir ou fermer la liste des médias" 
                        onClick={(e) => displayListingFunction(e)}
                        onKeyDown={(e) => e.key === 'Enter' && displayListingFunction(e)}
                        tabIndex="0"
                        title={listingDisplayArrow === BackArrow ? (
                            'Fermer le menu'
                        ) : ('Ouvrir le menu')}
                        />
                    </div>
                    <ul className={`movies-page-media-listing-content ${listingItemsAreDisplayed}`}>
                        {moviesList.length > 0 && 
                            moviesList.map((movie) => (
                                mediaType === 'films' ? (
                                <li 
                                key={movie.id}
                                className={`media-listing-title`}
                                tabIndex="0"
                                onClick={(e) => selectMovieFunction(e, movie)}
                                onKeyDown={(e) => e.key === 'Enter' && selectMovieFunction(e, movie)}
                                title={movie.title}
                                style={{ color: movie.id === currentMediaId && 'rgb(53, 155, 155)' }}
                                >{movie.title}</li>
                            ) : (
                                <li
                                key={movie.id}
                                className={`media-listing-title`}
                                tabIndex="0"
                                onClick={(e) => selectMovieFunction(e, movie)}
                                onKeyDown={(e) => e.key === 'Enter' && selectMovieFunction(e, movie)}
                                title={movie.name}
                                style={{ color: movie.id === currentMediaId && 'rgb(53, 155, 155)' }}
                                >{movie.name}</li>
                            ))
                        )}
                    </ul>
                    <div className='movies-page-media-listing-image-wrapper movies-page-media-listing-image-bottom'>
                        <img src={listingDisplayArrow} alt="Ouvrir ou fermer la liste des médias" 
                        onClick={(e) => displayListingFunction(e)}
                        onKeyDown={(e) => e.key === 'Enter' && displayListingFunction(e)}
                        tabIndex="0"
                        title={listingDisplayArrow === BackArrow ? (
                            'Fermer le menu'
                        ) : ('Ouvrir le menu')}
                        />
                    </div>
                </aside>
                {currentMovie ? (
                <section className={`movies-page-data-section`}>
                    <div className='movies-page-data-section-text-wrapper'>
                        {mediaType === 'films' ? (
                            <h2 className='movies-page-data-section-title'>{currentMovie.title}</h2>
                        ) : (
                            <h2 className='movies-page-data-section-title'>{currentMovie.name}</h2>
                        )}
                        <p className='movies-page-data-section-release-date'>
                            {`
                            Date de sortie : 
                            ${datetime.toLocaleDateString(
                                "fr-FR", 
                                {year: "numeric", month: "long", day: "numeric"}
                            )}
                            `}
                        </p>
                        <p className='movies-page-data-section-text-content'>{currentMovie.overview}</p>
                        {currentMovieTrailerURL !== "" && (
                            <div className='movies-page-data-section-trailer'>
                                <TrailerModal videoLink={currentMovieTrailerURL} />
                            </div>
                        )}
                        {currentMovieURL && (
                            mediaType === "films" ? (
                                <a 
                                className='movies-page-data-section-link'
                                title='Accéder au film sur Disney +'
                                href={`${config.disneyPlusEndpoint}/${currentMovieURL}`} 
                                target='_blank'
                                rel="noopener noreferrer"
                                >Accéder au film sur Disney +
                                </a>
                            ) : (
                                <a 
                                className='movies-page-data-section-link'
                                title='Accéder à la série sur Disney +'
                                href={`${config.disneyPlusEndpoint}/${currentMovieURL}`} 
                                target='_blank'
                                rel="noopener noreferrer"
                                >Accéder à la série sur Disney +
                                </a>
                            )
                        )}
                    </div>
                    <div className='movies-page-data-section-image-actors-creators-wrapper'>
                        <div className='movies-page-data-section-image-wrapper'>
                            <img className='movie-page-data-section-image' src={`${config.tmdbMovieImagePath}${currentMovie.poster_path}`} alt="Poster du film / de la série" />
                        </div>
                        <section className='movies-page-data-section-actors-creators'>
                            {mediaType === 'films' ? (
                                <h3 className='movies-page-data-section-actors-creators-title'>Réalisé par :</h3>

                            ) : (
                                <h3 className='movies-page-data-section-actors-creators-title'>Créé par :</h3>
                            )}
                            {currentMovieCreators && (
                                currentMovieCreators.map((creator, index) => (
                                    <p className='movies-page-data-section-crew' key={index}>{creator}</p>
                                ))
                            )}
                            <h3 className='movies-page-data-section-actors-creators-title actors-section'>Avec :</h3>
                            {currentMovieActors && (
                                currentMovieActors.map((actor, index) => (
                                    <p className='movies-page-data-section-crew' key={index}>{actor}</p>
                                ))
                            )}
                        </section>
                        
                    </div>
                    
                </section>
                ) : (
                <div className='movies-page-data-section-alternate-text-section'>
                    {mediaType === 'films' ? (
                        <h3 className={`movies-page-data-section-alternate-text ${alternateTextPosition}`}>Sélectionnez un film dans le menu à votre gauche</h3>
                    ) : (
                        <h3 className={`movies-page-data-section-alternate-text ${alternateTextPosition}`}>Sélectionnez une série dans le menu à votre gauche</h3>
                    )}
                </div>
                )}
            </div>            
        </div>
    )
}

export default MoviesPage
