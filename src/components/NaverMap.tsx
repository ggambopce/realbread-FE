import { useEffect, useRef } from "react";

const NaverMap = () => {
  const mapElement = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!window.naver || !mapElement.current) return;

    const mapOptions = {
      center: new window.naver.maps.LatLng(36.3504, 127.3845), // 대전 중심 좌표
      zoom: 15,
    };

    const map = new window.naver.maps.Map(mapElement.current, mapOptions);

    new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(36.3504, 127.3845),
      map,
    });

    new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(36.3514570, 127.3949666),
      map,
    });

    new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(36.3526021, 127.3805276),
      map,
    });

    new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(36.3654352, 127.3810672),
      map,
    });
  }, []);
  

  return <div ref={mapElement} className="map-container" />;
};

export default NaverMap;
