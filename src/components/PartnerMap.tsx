"use client";

import { useState, useCallback } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const PartnerMap = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState<Coordinates>({ lat: 0, lng: 0 });

  const onLoad = useCallback(async function callback(map: any) {
    const coords = await getAddressCoordinates("1900 Omaha St, Palm Harbor, FL 34683");
    setMarker(coords);
    const centerLatLng = new window.google.maps.LatLng(coords.lat, coords.lng);
    map.setCenter(centerLatLng);
    map.setZoom(15);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{
        width: "400px",
        height: "400px",
      }}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker position={marker} title="Palm Harbor University" />
    </GoogleMap>
  ) : (
    <></>
  );
};

export default PartnerMap;

interface Coordinates {
  lat: number;
  lng: number;
}
function getAddressCoordinates(address: string): Promise<Coordinates> {
  const geocoder = new window.google.maps.Geocoder();
  return new Promise((res, rej) => {
    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK" && results && results[0] && results[0].geometry && results[0].geometry.location) {
        const location = results[0].geometry.location;
        res({ lat: location.lat(), lng: location.lng() });
      } else {
        console.error("Error geocoding address:", status);
        rej("Error geocoding address");
      }
    });
  });
}
