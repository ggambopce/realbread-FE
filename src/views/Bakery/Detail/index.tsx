import React, { useEffect, useState } from 'react'
import './style.css'
import FavoriteItem from 'components/favoriteItem'
import { Bakery, CommentListItem, FavoriteListItem } from 'types/interface'
import favoriteListMock from 'mocks/favorite-list.mock';
import { bakeryMock, commentListMock } from 'mocks';
import CommentItem from 'components/commentItem';
import Pagination from 'components/pagination';



//          component: 게시물 상세 화면 컴포넌트           //
export default function BakeryDetail() {
  
    //          state: 좋아요 리스트 상태          //
    const [favoriteList, setFavoriteList] = useState<FavoriteListItem[]>([]);
    //          state: 댓글 리스트 상태(임시)          //
    const [commentList, setCommentList] = useState<CommentListItem[]>([]);
    //          state: 게시물 상태          //
    const [bakery, setBakery] = useState<Bakery | null>(null);
    
    //          effect: 게시물 번호 path variable이 바뀔때 마다 좋아요 및 댓글 리스트 불러오기          //
    useEffect(() => {
      setFavoriteList(favoriteListMock);
      setCommentList(commentListMock);
      setBakery(bakeryMock);
    }, []);

    //          render: 게시물 상세 화면 컴포넌트 렌더링           //
    return (
      <div id='bakery-detail-wrapper'>
        <div className='bakery-detail-container'>
          <div className='bakery-detail-top'>
            <div className='bakery-detail-top-title-box'>
              <div className='bakery-detail-top-title'>{bakery?.title}</div>
              <div className='bakery-detail-top-road-address'>{bakery?.roadAddress}</div>
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
              <div className='bakery-detail-favorite-title'>{'좋아요 '}<span className='emphasis'>{12}</span></div>
              <div className='bakery-detail-favorite-contents'>
              {favoriteList.map(item => <FavoriteItem favoriteListItem={item} />)}
              </div>
            </div>
          </div>
          <div className='bakery-detail-comment-box'>
            <div className='bakery-detail-comment-container'>
            <div className='bakery-detail-comment-title'>{'댓글 '}<span className='emphasis'>{12}</span></div>
            <div className='bakery-detail-comment-list-container'>
              {commentList.map(item => <CommentItem commentListItem={item} />)}
            </div>
            <div className='divider'></div>
            <div className='bakery-detail-comment-pagination-box'>
              <Pagination />
            </div>
            <div className='bakery-detail-comment-choice-menu-input-box'>{'메뉴선택버튼'}</div>
            <div className='bakery-detail-comment-input-box'>
              <div className='bakery-detail-comment-input-container'>
                <textarea  className='bakery-detail-comment-textarea' placeholder='댓글을 작성해주세요.'/>
                <div className='bakery-detail-comment-button-box'>
                  <div className= 'disable-button'>{'댓글달기'}</div>
                </div>
              </div>
            </div>
            </div>
          </div>
          <div className='bakery-detail-menu-box'>
            {bakery?.menuList.map(menu => (
              <div className='bakery-detail-menu-item' key={menu.menuNumber}>
                <div className='bakery-detail-menu-info'>
                  <div className='bakery-detail-menu-name'>{menu.menuName}</div>
                  <div className='bakery-detail-menu-description'>{menu.description}</div>
                  <div className='bakery-detail-menu-price'>{menu.price}</div>
                </div>
                <img src={menu.imageUrl} alt={menu.menuName} className='bakery-detail-menu-image' />
              </div>
            ))}
          </div>
        </div>
      </div>
  )
}