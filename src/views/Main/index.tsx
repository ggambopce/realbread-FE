import React from 'react'
import './style.css'
import NaverMap from 'components/NaverMap'
import bakeryMainListMock from 'mocks/board-main-list-mock'
import BakeryDetail from 'views/Bakery'
import SearchButton from 'components/searchBox'

//          component: 메인 화면 컴포넌트           //
export default function Main() {
  
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
          {bakeryMainListMock.mainBakeryList.map((bakery, index) => (
            <div className="bakery-list-item" key={index}>
              <div className="bakery-list-item-header">
                <div className="bakery-list-title">{bakery.title}</div>
                <div className="bakery-list-stats">
                  좋아요 {bakery.favoriteCount} · 댓글 {bakery.commentCount}
                </div>
              </div>
              <div className="bakery-list-images">
                {bakery.menuList.slice(0, 4).map(menu => (
                  <img
                    key={menu.menuNumber}
                    src={menu.imageUrl}
                    alt="menu"
                    className="bakery-list-thumbnail"
                  />
                ))}
              </div>
             
            </div>
          ))}
        </div>
      </div>
      <div className="main-map">
        <NaverMap />
      </div>
      <div className="bakery-detail-panel">
        <BakeryDetail  />
      </div>
    </div>
  )
}