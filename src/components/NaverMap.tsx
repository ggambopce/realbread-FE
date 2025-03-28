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

    // 내 위치 마커 추가
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        const userPosition = new window.naver.maps.LatLng(latitude, longitude);

        // 마커 추가
        new window.naver.maps.Marker({
          position: userPosition,
          map,
          icon: {
            content: `<div style="background:#007bff;width:14px;height:14px;border-radius:50%;border:2px solid white;"></div>`,
            anchor: new window.naver.maps.Point(10, 10),
          },
        });
      },
      (error) => {
        console.error("위치 정보를 가져올 수 없습니다:", error);
      }
    );


  }, []);
  
  

  return <div ref={mapElement} className="map-container" />;
};

export default NaverMap;
