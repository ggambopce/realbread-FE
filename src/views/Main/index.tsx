import { useEffect, useState } from 'react'
import './style.css'
import NaverMap from 'components/NaverMap'
import BakeryDetail from 'views/Bakery'
import SearchButton from 'components/searchBox'
import BakeryListItem from 'components/bakeryListItem'
import { BakerySummary } from 'types/interface/bakery-main-list.interface'
import Pagination from 'components/pagination'
import { usePagination } from 'hooks'
import { GetBakeryMainListResponseDto } from 'apis/response/bakery'
import ResponseDto from 'apis/response/response.dto'
import { getBakeryMainListRequest } from 'apis'

//          component: 메인 화면 컴포넌트           //
export default function Main() {

  //          state: 빵집 메인 리스트 상태          //
  const [bakeryMainList, setBakeryMainList] = useState<BakerySummary[]>([]);

  //          state: 선택된 빵집 상세 정보 상태          //
  const [selectedBakeryDetail, setSelectedBakeryDetail] = useState<BakerySummary | null>(null);

  //          state: 페이지네이션 관련 상태           //
    const {
      currentPage, currentSection, viewList, viewPageList, totalSection,
      setCurrentPage, setCurrentSection, setTotalList,
    } = usePagination<BakerySummary>(10);


  //          function: get top 3 board list response 처리 함수          //
    const getBakeryMainListResponseDto = (responseBody: GetBakeryMainListResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === 'DBE') alert('데이터베이스 오류입니다.')
      if (code !== 'SU') return;

      const { mainBakeryList } = responseBody as GetBakeryMainListResponseDto;
      setTotalList(mainBakeryList); // 페이지네이션에 리스트 세팅
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
      {selectedBakeryDetail && ( 
        <div className="bakery-detail-panel">
        <BakeryDetail key={selectedBakeryDetail.bakeryNumber} bakery={selectedBakeryDetail} onClose={() => {
          setSelectedBakeryDetail(null);

          }} />
      </div>
      )}
    </div>
  )
}