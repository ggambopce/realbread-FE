import React, { useEffect, useState } from 'react'
import './style.css'
import NaverMap from 'components/NaverMap'
import bakeryMainListMock from 'mocks/board-main-list-mock'
import BakeryDetail from 'views/Bakery'
import SearchButton from 'components/searchBox'
import BakeryListItem from 'components/bakeryListItem'
import { BakeryMainList, BakerySummary } from 'types/interface/bakery-main-list.interface'
import bakeryMock from 'mocks/board-detail-mock'
import { Bakery } from 'types/interface'
import Pagination from 'components/pagination'
import { usePagination } from 'hooks'

//          component: 메인 화면 컴포넌트           //
export default function Main() {

  //          state: 페이지네이션 관련 상태           //
    const {
      currentPage, currentSection, viewList, viewPageList, totalSection,
      setCurrentPage, setCurrentSection, setTotalList,
    } = usePagination<BakeryMainList>(10);

  //          state: 선택된 빵집 상태          //
  const [selectedBakery, setSelectedBakery] = useState<BakerySummary | null>(null);
  //          state: 선택된 빵집 상세 상태          //
  const [selectedBakeryDetail, setSelectedBakeryDetail] = useState<Bakery | null>(null);

  //          effect: 첫 마운트 시 실행될 함수          //
  useEffect(() => {

      if (!selectedBakery) return;

      // 임시 목데이터 매핑
      if (selectedBakery.bakeryNumber === 1) {
        setSelectedBakeryDetail(bakeryMock);
      } else {
        setSelectedBakeryDetail(null);
      }
    }, [selectedBakery]);
  
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
          {bakeryMainListMock.mainBakeryList.map((bakery) => (
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
          setSelectedBakery(null);
          setSelectedBakeryDetail(null);

          }} />
      </div>
      )}
    </div>
  )
}