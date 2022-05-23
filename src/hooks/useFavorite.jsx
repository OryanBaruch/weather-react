// @ts-nocheck
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../Redux/favorites/actions";

export const useFavorite = (location) => {

  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  const isFavorite = () => {

    const id = favorites.findIndex(
      (l) => (l.LocationKey === location.LocationKey)
    );
    return id !== -1;
  };

  const toggleFavorite = () => {
    const favorite = {
      LocationKey: location.LocationKey,
      LocalizedName: location.LocalizedName,
    };

    if (isFavorite()) dispatch(removeFavorite(favorite));
    else dispatch(addFavorite(favorite));
  };

  return [isFavorite(), toggleFavorite];
};

