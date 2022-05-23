// @ts-nocheck
import { useState } from "react";
import { useDispatch } from "react-redux";
import { apiGeoLocation } from "../Redux/middleware/api";
import { toast } from "react-toastify";

const useGeoLocation = () => {
  const dispatch = useDispatch();
  //TLV coords
  const defaultLocation = {
    LocationKey: "215854",
    LocalizedName: "Tel Aviv",
  };

  const [location, setLocation] = useState({});
  const [isLocated, setIsLocated] = useState(false);
  const [triedToLocate, setTriedToLocate] = useState(false);

  const toastIds = {
    info: "toast-info-locate",
    success: "toast-success-locate",
    error: "toast-error-locate",
  };

  const getGeoLocation = () => {
    toast.info("Tracking your geoLocation...");

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    const success = (pos) => {
      setIsLocated(true);
      dispatch(
        apiGeoLocation(pos.coords, (data) => {
          setLocation(data);
          toast.dismiss(toastIds.info);
          toast.success("Located successfully!", {
            toastId: toastIds.success,
          });
        })
      );
    };

    const error = () => {
      setIsLocated(false);
      setLocation(defaultLocation);
      toast.dismiss(toastIds.info);
      toast.error("Cannot locate your device", { toastId: toastIds.error });
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
    setTriedToLocate(true);
  };
  if (!triedToLocate) getGeoLocation();

  return [location, isLocated];
};

export default useGeoLocation;
