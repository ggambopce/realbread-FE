import { useEffect, useState } from 'react'
import './style.css'
import NaverMap from 'components/NaverMap'
import BakeryDetail from 'views/Bakery'
import SearchButton from 'components/searchBox'
import { BakerySummary } from 'types/interface/bakery-main-list.interface'
import Pagination from 'components/pagination'
import { usePagination } from 'hooks'
import { GetBakeryDetailResponseDto, GetBakeryMainListResponseDto } from 'apis/response/bakery'
import ResponseDto from 'apis/response/response.dto'
import { getBakeryDetailRequest, getBakeryMainListRequest } from 'apis'
import BakeryListItem from 'components/bakeryListItem'
import BakeryDetailItem from 'types/interface/bakery-detail-item.interface'
import { useNavigate } from 'react-router-dom'
import { MAIN_PATH } from 'app-constants'

//          component: 메인 화면 컴포넌트           //
export default function Main() {

  






  //          state: 빵집 상세 패널 상태           //
  const [showDetail, setShowDetail] = useState(false);
  //          state: 빵집 상세 정보 상태           //
  const [detailBakery, setDetailBakery] = useState<BakeryDetailItem | null>(null);

  //          state: 페이지네이션 관련 상태           //
  const {
    currentPage, currentSection, viewList, viewPageList, totalSection,
    setCurrentPage, setCurrentSection, setTotalList,
  } = usePagination<BakerySummary>(10);



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
  const GetBakeryDetailResponse = (responseBody: GetBakeryDetailResponseDto | ResponseDto | null) => {
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
      
      if (!bakeryNumber) return;

      getBakeryDetailRequest(bakeryNumber).then(GetBakeryDetailResponse);
      setShowDetail(true);
    }
  


  //          effect: 첫 마운트 시 실행될 함수          //
  useEffect(() => {
      getBakeryMainListRequest().then(getBakeryMainListResponseDto);
    }, []);
  
  //          render: 메인 화면 컴포넌트 렌더링          //
  return (
    <div className="main-wrapper">
      <div className="main-sidebar">
        <div className='bakery-search-box'>
           <div className='bakery-search-wrapper'>
          <SearchButton />
          </div>
          <div className='bakery-search-sort-buttons'>
            <button className="sort-button">좋아요순</button>
            <button className="sort-button">댓글순</button>
          </div>
        </div>
        <div className="bakery-list-wrapper">
          {viewList.map((bakery) => (
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
      </div>
      <div className="main-map">
        <NaverMap />
      </div>
      {showDetail && ( 
        <div className="bakery-detail-panel">
        <BakeryDetail bakery={detailBakery} onClose={() => setShowDetail(false)}/>
      </div>
      )}
    </div>
  )
}