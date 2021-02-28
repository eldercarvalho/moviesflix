import { PaginableResult } from '../types';

export enum MoviesActions {
  SetIsFetchingMovies = 'SET_IS_FETCHING_MOVIES',
  FetchTrending = 'FETCH_TRENDING',
  IsFetchingTrending = 'SET_IS_FETCHING_TRENDING',
  FetchPopular = 'FETCH_POPULAR',
  FetchNowPlaying = 'FETCH_NOW_PLAYNG',
  FetchUpcoming = 'FETCH_UPCOMING',
  FetchGenres = 'FETCH_GENRES',
  FetchTopRated = 'FETCH_TOP_RATED',
  FetchConfiguration = 'FETCH_CONFIGURATION',
  SearchMovies = 'SEARCH_MOVIES',
  SetSearchLoading = 'SET_SEARCH_LOADING',
  FetchMovieDetails = 'SET_MOVIE_DETAILS',
  ClearMovieDetails = 'CLEAR_MOVIE_DETAILS',
  SetIsFetchingMovieDetails = 'SET_IS_FETCHING_MOVIE_DETAILS',
}

export interface Genre {
  id: number;
  name: string;
}

export interface CastPerson {
  adult: boolean;
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number;
  profile_path: string;
  department: string;
  job: string;
}

export interface Cast {
  cast: CastPerson[];
  crew: CastPerson[];
}

export interface MovieImage {
  id: number;
  file_path: string;
}

export interface MovieImages {
  backdrops: MovieImage[];
  posters: MovieImage[];
}

export interface MovieVideo {
  id: number;
  name: string;
  key: string;
  type: string;
}

export interface MovieVideoResults {
  results: MovieVideo[];
}

export type MoviesPaginableResult = PaginableResult<IMovie[]>;

export interface IMovie {
  id: number;
  poster_path: string;
  backdrop_path: string;
  title: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  release_date: string;
  formatted_release_date?: string;
  genre_ids: number[];
  genres: Genre[];
  belongs_to_collection?: Record<string, any>;
  budget: number;
  homepage?: string;
  imdb_id?: string;
  popularity: number;
  production_companies: Record<string, any>[];
  production_countries: Record<string, any>[];
  revenue: number;
  runtime: number;
  status: string;
  tagline?: string;
  video: boolean;
  credits: Cast;
  similar: MoviesPaginableResult;
  year: string;
  original_title: string;
  original_language: string;
  videos: MovieVideoResults;
  images: MovieImages;
}
export interface ImageConfiguration {
  secure_base_url: string;
  backdrop_sizes: string[];
  logo_sizes: string[];
  poster_sizes: string[];
  profile_sizes: string[];
}

export interface Configuration {
  change_keys: string[];
  images: ImageConfiguration;
}

export interface SetIsFetchingMoviesAction {
  type: MoviesActions.SetIsFetchingMovies;
}

export interface FetchTrendingAction {
  type: MoviesActions.FetchTrending;
  payload: IMovie[];
}

export interface IsFetchingTrendingAction {
  type: MoviesActions.IsFetchingTrending;
}

export interface FetchPopularAction {
  type: MoviesActions.FetchPopular;
  payload: MoviesPaginableResult;
}

export interface FetchUpcomingAction {
  type: MoviesActions.FetchUpcoming;
  payload: MoviesPaginableResult;
}

export interface FetchNowPlayingAction {
  type: MoviesActions.FetchNowPlaying;
  payload: MoviesPaginableResult;
}

export interface FetchConfigurationAction {
  type: MoviesActions.FetchConfiguration;
  payload: Configuration;
}

export interface FetchTopRatedAction {
  type: MoviesActions.FetchTopRated;
  payload: MoviesPaginableResult;
}

export interface FetchGenresAction {
  type: MoviesActions.FetchGenres;
  payload: Genre[];
}

export interface SearchMoviesAction {
  type: MoviesActions.SearchMovies;
  payload: MoviesPaginableResult;
}

export interface SetSearchLoadingAction {
  type: MoviesActions.SetSearchLoading;
  payload: boolean;
}

export interface SetIsFetchingMovieDetailsAction {
  type: MoviesActions.SetIsFetchingMovieDetails;
}

export interface FetchMovieDetailsAction {
  type: MoviesActions.FetchMovieDetails;
  payload: IMovie;
}
export interface ClearMovieDetailsAction {
  type: MoviesActions.ClearMovieDetails;
}

export type MoviesActionsType =
  | SetIsFetchingMoviesAction
  | FetchTrendingAction
  | IsFetchingTrendingAction
  | FetchPopularAction
  | FetchUpcomingAction
  | FetchNowPlayingAction
  | FetchTopRatedAction
  | FetchGenresAction
  | FetchConfigurationAction
  | SearchMoviesAction
  | SetSearchLoadingAction
  | FetchMovieDetailsAction
  | SetIsFetchingMovieDetailsAction
  | ClearMovieDetailsAction;
