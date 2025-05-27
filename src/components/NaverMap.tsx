import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import bakeryMarker from '../assets/image/bakery-marker.png';
import { BakerySummary } from "types/interface/bakery-main-list.interface";

export interface NaverMapRef {
  panTo: (lat: number, lng: number) => void;
}
interface NaverMapProps {
  bakeryList: BakerySummary[];
  onMarkerClick?: (bakeryNumber: number) => void;

}

const NaverMap = forwardRef<NaverMapRef, NaverMapProps>(
  ({ bakeryList, onMarkerClick }, ref) => {
  const mapElement = useRef<HTMLDivElement | null>(null);

  const mapRef = useRef<naver.maps.Map | null>(null);
  const markerRef = useRef<naver.maps.Marker[]>([]);

  //        event handler: 외부에 map.panTo 제공          //
  useImperativeHandle(ref, () => ({
    panTo(lat: number, lng: number) {
      const map = mapRef.current;
      if (map) {
        map.panTo(new window.naver.maps.LatLng(lat, lng));
      }
    }
  }));

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
    mapRef.current = map;

    // 내 위치 마커
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const userPosition = new window.naver.maps.LatLng(latitude, longitude);

        new window.naver.maps.Marker({
          position: userPosition,
          map,
          icon: {
            content: `<div style="display: flex;
              justify-content: center;
              align-items: center;
              width: 32px;
              height: 32px;
              font-size: 36px;
              color: #e02424;">
              <i class="fa-solid fa-location-dot"></i>
            </div>
            `,
            anchor: new window.naver.maps.Point(10, 10),
          },
        });
      },
      (error) => {
        console.error("위치 정보를 가져올 수 없습니다:", error);
      }
    );
  }, []);

  // 마커 갱신 (bakeryList 변경 시)
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // 기존 마커 제거
    markerRef.current.forEach((marker) => marker.setMap(null));
    markerRef.current = [];

    // 새 마커 생성
    const newMarkers = bakeryList.map(({ bakeryNumber, mapx, mapy, title, roadAddress, menuList }) => {
      const lat = parseFloat(mapy);
      const lng = parseFloat(mapx);

      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(lat, lng),
        map,
        icon: {
          content: `
            <div class="custom-marker" style="text-align: center;">
              <style>
                .custom-marker:hover .marker-icon {
                  animation: floatUpDown 1s ease-in-out infinite;
                }
                @keyframes floatUpDown {
                  0% { transform: translateY(0px); }
                  50% { transform: translateY(-6px); }
                  100% { transform: translateY(0px); }
                }
              </style>
              <img
                class="marker-icon" 
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
      // 메뉴 이미지들 최대 4개 추출해서 HTML 문자열로 만들기
      const images = (menuList ?? [])
        .filter(menu => !!menu.imageUrl && menu.imageUrl.trim() !== '')
        .slice(0, 4);
      const imageHtml = images.map((menu) => `
          <div style="
            width: 50px;
            height: 50px;
            margin-right: 4px;
            background-image: url(${menu.imageUrl});
            background-size: cover;
            background-position: center;
            border-radius: 4px;
            border: 1px solid #ddd;
            display: inline-block;
          "></div>
        `).join('');
      // 이미지 블록을 아예 감싸는 부분을 조건부로 분기
      const imageWrapperHtml = images.length > 0
        ? `<div style="display: flex;">${imageHtml}</div>`
        : ''; // 아예 비워서 렌더링되지 않게  

      // InfoWindow 생성
      const infoWindow = new window.naver.maps.InfoWindow({
        content: `
        <div style="
          width: 220px; padding: 10px; 
          background: white;
          border-radius: 12px; 
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          border: 1px solid #ccc;
        ">
          <div style="font-weight: bold; font-size: 14px; margin-bottom: 6px;">${title}</div>
          <div style="font-size: 12px; color: #666; margin-bottom: 8px;">${roadAddress}</div>
          ${imageWrapperHtml}
        </div>
      `,
        borderColor: "transparent",
        disableAnchor: true,
        borderWidth: 0,
        backgroundColor: "transparent",
      });

      // 마우스 이벤트 등록
      marker.addListener('mouseover', () => {
        infoWindow.open(map, marker);
      });

  

      marker.addListener('mouseout', () => {
        infoWindow.close();
      });

      //마커 클릭 시 부모에게 bakeryNumber 전달
      marker.addListener('click', () => {
        if (onMarkerClick) onMarkerClick(bakeryNumber);

        //마커 클릭 시 중심 이동
         map.panTo(new window.naver.maps.LatLng(lat, lng));
      });

      return marker;

    });

    

      
    markerRef.current = newMarkers;
  }, [bakeryList]);
  
  //          render: 메인 지도 컴포넌트 랜더링           //
  return <div ref={mapElement} className="map-container" />;
}
);

export default NaverMap;
