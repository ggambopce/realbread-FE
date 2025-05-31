import { useEffect, useRef, useState } from 'react'
import './style.css'
import NaverMap, { NaverMapRef } from 'components/NaverMap'
import BakeryDetail from 'views/Bakery'
import SearchButton from 'components/searchBox'
import { BakerySummary } from 'types/interface/bakery-main-list.interface'
import Pagination from 'components/pagination'
import { usePagination } from 'hooks'
import { GetBakeryDetailResponseDto, GetBakeryMainListResponseDto, GetBakerySearchListResponseDto } from 'apis/response/bakery'
import ResponseDto from 'apis/response/response.dto'
import { getBakeryDetailRequest, getBakeryMainListRequest, getBakerySearchListRequest, getPopularListRequest } from 'apis'
import BakeryListItem from 'components/bakeryListItem'
import BakeryDetailItem from 'types/interface/bakery-detail-item.interface'
import { useNavigate, useParams } from 'react-router-dom'
import { MAIN_PATH } from 'app-constants'
import { GetPopularListResponseDto } from 'apis/response/search'
import ChatBot from 'views/ChatBot'

//          component: 메인 화면 컴포넌트           //
export default function Main() {

  const mapRef = useRef<NaverMapRef>(null);

  //          state: searchWord path variable 상태          //
  const { searchWord } = useParams();

  //          state: 빵집 상세 패널 상태           //
  const [showDetail, setShowDetail] = useState(false);
  //          state: 빵집 상담 패널 상태           //
  const [showCounsel, setShowCounsel] = useState(false);
  //          state: 빵집 상세 정보 상태           //
  const [detailBakery, setDetailBakery] = useState<BakeryDetailItem | null>(null);

  //          state: 페이지네이션 관련 상태           //
  const {
    currentPage, currentSection, viewList, viewPageList, totalSection,
    setCurrentPage, setCurrentSection, setTotalList,totalList
  } = usePagination<BakerySummary>(10);
  //          state: 인기 검색어 리스트 상태          //
  const [, setPopularWordList] = useState<string[]>([]);
  //          state:  이전 검색어 상태          //
  const [preSearchWord, setPreSearchWord ]  = useState<string | null>(null);
  //          state: 검색 게시물 개수 상태          //
  const [count, setCount] = useState<number>(2)


  //          function: get popular list response 처리 함수          //
  const getPopularListResponse = (responseBody: GetPopularListResponseDto | ResponseDto | null) => {
    if (!responseBody) return;
    const { code } = responseBody;
    if (code === 'DBE') alert('데이터베이스 오류입니다.')
    if (code !== 'SU') return;

    const { popularWordList } = responseBody as GetPopularListResponseDto;
    setPopularWordList(popularWordList);
  }

  //          function: get search bakery list response 처리 함수          //
  const getBakerySearchListResponse = (responseBody: GetBakerySearchListResponseDto | ResponseDto | null) => {
    if (!responseBody) return;
    const {code} = responseBody;
    if (code === 'DBE') alert('데이터베이스 오류입니다.');
    if (code !== 'SU') return;

    if (!searchWord) return;
    const {mainBakeryList} = responseBody as GetBakerySearchListResponseDto;

    

    setTotalList(mainBakeryList);
    setCount(mainBakeryList.length);
    setPreSearchWord(searchWord);
  }


  //          function: 네비게이트 함수          //
  const navigator = useNavigate();

  //          function: get bakery main list response 처리 함수          //
  const getBakeryMainListResponseDto = (responseBody: GetBakeryMainListResponseDto | ResponseDto | null) => {
    if (!responseBody) return;
    const { code } = responseBody;
    if (code === 'DBE') alert('데이터베이스 오류입니다.')
    if (code !== 'SU') return;

    const { mainBakeryList } = responseBody as GetBakeryMainListResponseDto;
    setTotalList(mainBakeryList); // 페이지네이션에 리스트 세팅
  }

  //          function: get bakery detail response 처리 함수          //
  const getBakeryDetailResponse = (responseBody: GetBakeryDetailResponseDto | ResponseDto | null) => {
    if (!responseBody) return;
    const { code } = responseBody;
    if (code === 'NB') alert('존재하지 않는 빵집 입니다.');
    if (code === 'DBE') alert('데이터베이스 오류입니다.')
    if (code !== 'SU') {
      navigator(MAIN_PATH())
      return;
    }
    const detailBakery: BakeryDetailItem = {... responseBody as GetBakeryDetailResponseDto};
    setDetailBakery( detailBakery );
  }


  //          event handler: 빵집 이름 클릭 이벤트 처리           //
  const onTitleClickHandler = (bakeryNumber: number) => {
    const bakery = totalList.find(b => b.bakeryNumber === bakeryNumber);
    if (!bakery) return;

    const lat = parseFloat(bakery.mapy);
    const lng = parseFloat(bakery.mapx);
    mapRef.current?.panTo(lat, lng);

    getBakeryDetailRequest(bakeryNumber).then(getBakeryDetailResponse);
    setShowDetail(true);
  }
  //          event handler: 빵집 이름 클릭 이벤트 처리           //
  const onMarkerClickHandler = (bakeryNumber: number) => {
    getBakeryDetailRequest(bakeryNumber)
      .then((res) => {
        if (!res || res.code !== 'SU') return;
        setDetailBakery(res as GetBakeryDetailResponseDto);
        setShowDetail(true);
      });
  };

  //          event handler: 조회 방법 클릭 이벤트 처리           //
  const handleSortClick = (sortType: 'favorite' | 'review' | '') => {
  getBakeryMainListRequest(sortType)
    .then(response => {
      if (!response || response.code !== 'SU') return;
      const { mainBakeryList } = response as GetBakeryMainListResponseDto;
      setTotalList(mainBakeryList);
    });
  };
  
  
  //          effect: search word 상태 변경 시 실행될 함수          //
  useEffect(() => {
    if (!searchWord) return;
    getBakerySearchListRequest(searchWord, preSearchWord).then(getBakerySearchListResponse);
  }, [searchWord]);

  //          effect: 첫 마운트 시 실행될 함수          //
  useEffect(() => {
      getPopularListRequest().then(getPopularListResponse)
      getBakeryMainListRequest().then(getBakeryMainListResponseDto);
    }, []);
  
  //          render: 메인 화면 컴포넌트 렌더링          //
  return (
  
  <div className="main-wrapper">
  {/* 왼쪽 사이드바 */}
  <div className="main-sidebar">
    <div className='bakery-search-box'>
      <div className='bakery-search-wrapper'>
        <SearchButton />
      </div>
      <div className='bakery-search-sort-buttons'>
        <button className="sort-button" onClick={() => handleSortClick('favorite')}>좋아요순</button>
        <button className="sort-button" onClick={() => handleSortClick('review')}>댓글순</button>
      </div>
      {searchWord ? (
        <div className='search-contents-box'>
          {count === 0 ? (
            <div className='search-contents-nothing'>검색 결과가 없습니다.</div>
          ) : (
            <div className='search-contents'>
              {viewList.map(bakery => (
                <BakeryListItem
                  key={bakery.bakeryNumber}
                  bakeryListItem={bakery}
                  onTitleClick={onTitleClickHandler}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="bakery-list-wrapper">
          {viewList.map(bakery => (
            <BakeryListItem
              key={bakery.bakeryNumber}
              bakeryListItem={bakery}
              onTitleClick={onTitleClickHandler}
            />
          ))}
          <div className='bakery-list-pagination-box'>
            <Pagination
              currentPage={currentPage}
              currentSection={currentSection}
              setCurrentPage={setCurrentPage}
              setCurrentSection={setCurrentSection}
              viewPageList={viewPageList}
              totalSection={totalSection}
            />
          </div>
        </div>
      )}
    </div>
  </div>

  {/* 중앙 지도 */}
  <div className="main-map">
    <NaverMap ref={mapRef} bakeryList={totalList} onMarkerClick={onMarkerClickHandler}/>
  </div>

  {/* 선택된 빵집 상세 정보 패널 */}
  {showDetail && detailBakery && (
  <div className='bakery-detail-panel-wrapper'>
    <div className='bakery-detail-panel'>
      <BakeryDetail
        bakery={detailBakery}
        onClose={() => setShowDetail(false)}
      />
    </div>
  </div>  
  )}

  {/* 오른쪽 상담 봇 채팅 패널 */}
  {showCounsel && (
  <div className='bakery-counsel-bot-panel-wrapper'>
    <div className='bakery-counsel-bot-panel'>
      <ChatBot onClose={() => setShowCounsel(false)} />
    </div>
  </div>
  )}
</div>
  )
}