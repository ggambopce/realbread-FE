import React, { useState } from 'react'
import { CommentListItem } from 'types/interface'
import './style.css';
import defaultPofileImage from 'assets/image/default-profile-image.png'
import choiceMenuImage from 'assets/image/choice-menu.png'

import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';
dayjs.extend(customParseFormat);

interface Props {
    commentListItem: CommentListItem;
}

//          component: Comment List Item 컴포넌트            //
export default function CommentItem({ commentListItem }: Props) {
    //            state: properties          //
    const { nickname, profileImage, choiceMenu, content } = commentListItem
    
    //          state: 작성자 여부 상태          //
    const [isWriter, setWriter] = useState<boolean>(true);

    //          state: more 버튼 상태          //
    const [showMore, setShowMore] = useState<boolean>(false);

    //          event handler: more 버튼 클릭 이벤트 처리          //
    const onMoreButtonClickHandler = () => {
      setShowMore(!showMore);
       
    }
    //          event handler: 수정 버튼 클릭 이벤트 처리          //
    const onUpdateButtonClickHandler = () => {
         setWriter(false);
    }
    //          event handler: 삭제 버튼 클릭 이벤트 처리          //
    const onDeleteButtonClickHandler = () => {
      
    }

    //            function: 작성일 경과시간 함수          //
    const getElapsedTime = () => {
    const now = dayjs();
    const raw = commentListItem.writeDatetime;
    const date = dayjs(raw, 'YY-MM-DD HH:mm:ss');
    const writeTime = dayjs(date);

    const gap = now.diff(writeTime, 's');
    if (gap < 60) return `${gap}초 전`;
    if (gap < 3600) return `${Math.floor(gap / 60)}분 전`;
    if (gap < 86400) return `${Math.floor(gap / 3600)}시간 전`;
    return `${Math.floor(gap / 86400)}일 전`;
  }

    //            render: Commnet List Item 컴포넌트 랜더링           //
    return (
        <div>
            <div className='comment-list-item'>
                <div className='comment-list-item-top'>
                    <div className='comment-list-item-profile-box'>
                        <div className='comment-list-item-profile-image' style={{backgroundImage: `url(${profileImage ? profileImage : defaultPofileImage })`}}></div>
                    </div>
                    <div className='comment-list-item-nickname'>{nickname}</div>
                    <div className='comment-list-item-divider'>{'|'}</div>
                    <div className='comment-list-item-time'>{getElapsedTime()}</div>
                    {isWriter && 
                    <div className='comment-more-container'>
                        <div className='icon-button' onClick={onMoreButtonClickHandler}>
                        <div className='icon more-icon'></div>
                        {showMore &&
                        <div className='comment-more-box'>
                            <div className='comment-update-button' onClick={onUpdateButtonClickHandler}>{'수정'}</div>
                            <div className='divider'></div>
                            <div className='comment-delete-button' onClick={onDeleteButtonClickHandler}>{'삭제'}</div>
                        </div>
                        }
                        </div>
                    </div>  
                    }  
                    <div className='comment-list-item-choice-menu-box'>
                        <div className='comment-list-item-choice-menu-image' style={{ backgroundImage: `url(${choiceMenuImage})` }}></div>
                        <div className='comment-list-item-menu'>{choiceMenu}</div>
                    </div>
                </div>
                
                <div className='comment-list-item-content'>{content}</div>
            </div>
        </div>
    )
}
