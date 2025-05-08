import { useEffect, useRef, useState } from "react";
import bakeryMarker from '../assets/image/bakery-marker.png';
import axios from "axios";

interface BakeryMarker {
  bakeryNumber: number;
  mapx: string;
  mapy: string;
  title: string;
}

const NaverMap = () => {
  const mapElement = useRef<HTMLDivElement | null>(null);
  const [markerList, setMarkerList] = useState<BakeryMarker[]>([]);

  //          effect: 메인화면 랜더링 될 때 마다 실행될 마커 함수           //
  useEffect(() => {
    axios.get("http://localhost:8080/api/bakery/marker/random")
      .then(response => {
        const data = response.data.markerList;
        setMarkerList(data);
      })
      .catch(error => {
        console.error("마커 데이터를 가져오지 못했습니다.", error);
      });
  }, []);

  //          effect: 메인화면 랜더링 될 때 마다 실행될 중심 함수           //
  useEffect(() => {
    if (!window.naver || !mapElement.current) return;

    const mapOptions = {
      center: new window.naver.maps.LatLng(36.3504, 127.3845), // 대전 중심 좌표
      zoom: 14,
      logoControl: false,
      mapDataControl: false
    };

    const map = new window.naver.maps.Map(mapElement.current, mapOptions);

    // 마커리스트
    markerList.forEach(({ mapx, mapy, title }) => {
      const lat = parseFloat(mapy);
      const lng = parseFloat(mapx);

      new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(lat, lng),
        map,
        icon: {
          content: `
            <div style="text-align: center;">
              <img 
                src="${bakeryMarker}" 
                style="width: 30px; height: 30px; display: block; margin: 0 auto;" 
              />
              <div style="
                margin-top: 4px;
                font-size: 12px;
                color: #333;
                background: white;
                padding: 2px 6px;
                border-radius: 4px;
                border: 1px solid #ccc;
                display: inline-block;
                max-width: 80px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              ">
                ${title}
              </div>
            </div>
          `,
          anchor: new window.naver.maps.Point(15, 40),
        },
      });
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

  }, [markerList]);
  

  return <div ref={mapElement} className="map-container" />;
};

export default NaverMap;
