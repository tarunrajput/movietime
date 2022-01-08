import React from "react";
import BackDrop from "./BackDrop";
import { View, Text } from "react-native";
import MovieTitle from "./MovieTitle";
import MovieRatingNRuntime from './MoveRating/MovieRatingNRuntime';

const BasicMovieInfo = (props) => {
    const { isLoaded = false, movieDetail = {} } = props;
    const { backdrop_path, release_date = '' } = movieDetail;
    const releaseDate = new Date(release_date);
    const releaseYear = releaseDate.getFullYear();
    const movieTitle = !isNaN(releaseYear) ? `${movieDetail.title || movieDetail.name} (${releaseYear})` : movieDetail.title || movieDetail.name;
    return (
        <BackDrop backDropPath={backdrop_path}>
            {isLoaded && (
                <View>
                    <MovieTitle title={movieTitle} />
                    <MovieRatingNRuntime rating={movieDetail.vote_average} runtime={movieDetail.runtime} />
                </View>
            )}
        </BackDrop>
    );
}

export default BasicMovieInfo;