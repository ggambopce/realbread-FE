import { useEffect, useRef } from "react";

const NaverMap = () => {
  const mapElement = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!window.naver || !mapElement.current) return;

    const mapOptions = {
      center: new window.naver.maps.LatLng(37.5665, 126.9780), // 서울 중심 좌표
      zoom: 15,
    };

    const map = new window.naver.maps.Map(mapElement.current, mapOptions);

    new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(37.5665, 126.9780),
      map,
    });
  }, []);

  return <div ref={mapElement} className="map-container" />;
};

export default NaverMap;
