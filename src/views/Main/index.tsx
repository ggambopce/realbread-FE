import React, { useState } from 'react'
import './style.css'
import NaverMap from 'components/NaverMap'
import bakeryMainListMock from 'mocks/board-main-list-mock'
import BakeryDetail from 'views/Bakery'
import SearchButton from 'components/searchBox'
import BakeryListItem from 'components/bakeryListItem'
import { BakerySummary } from 'types/interface/bakery-main-list.interface'

//          component: 메인 화면 컴포넌트           //
export default function Main() {

  //          state: 선택된 빵집 상태          //
  const [selectedBakery, setSelectedBakery] = useState<BakerySummary | null>(null);
  
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
              onSelect={setSelectedBakery}
            />
          ))}
        </div>
      </div>
      <div className="main-map">
        <NaverMap />
      </div>
      {selectedBakery && ( 
        <div className="bakery-detail-panel">
        <BakeryDetail  />
      </div>
      )}
    </div>
  )
}