import React from 'react'
import './style.css'


//          component: 게시물 상세 화면 컴포넌트           //
export default function BakeryDetail() {
  
    //          render: 게시물 상세 화면 컴포넌트 렌더링           //
    return (
      <div id='bakery-detail-wrapper'>
        <div className='bakery-detail-container'>
          <div className='bakery-detail-top'>
            <div className='bakery-detail-top-title-box'>
              <div className='bakery-detail-top-title'>{'하레 하레'}</div>
              <div className='bakery-detail-top-road-address'></div>
            </div>
            <div className=''></div>
            <div></div>
          </div>
          <div className='bakery-detail-button-box'>
            <div className='bakery-detail-button-group'>
              <div className='icon-button'>
                <div className='icon favorite-fill-icon'></div>
              </div>
              <div className='bakery-detail-button-text'>{`좋아요 ${5}`}</div>
              <div className='icon-button'>
                <div className='icon up-light-icon'></div>
              </div>
            </div>
            <div className='bakery-detail-button-group'>
              <div className='icon-button'>
                <div className='icon comment-icon'></div>
              </div>
              <div className='bakery-detail-button-text'>{`댓글 ${3}`}</div>
              <div className='icon-button'>
                <div className='icon up-light-icon'></div>
              </div>
            </div>
          </div>
          <div className='bakery-detail-favorite-box'>
            <div className='bakery-detail-favorite-container'>
              <div className='board-detail-bottom-favorite-title'>{'좋아요 '}<span className='emphasis'>{12}</span></div>
              <div className='board-detail-bottom-favorite-contents'></div>
            </div>
          </div>
          <div className='bakery-detail-comment-box'></div>
          <div className='bakery-detail-menu-box'></div>
        </div>
      </div>
  )
}