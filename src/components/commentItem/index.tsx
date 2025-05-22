import React, { ChangeEvent, useRef, useState } from 'react'
import { CommentListItem } from 'types/interface'
import './style.css';
import defaultPofileImage from 'assets/image/default-profile-image.png'
import choiceMenuImage from 'assets/image/choice-menu.png'

import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';
import { GetCommentListResponseDto, PostCommentResponseDto } from 'apis/response/comment';
import { ResponseDto } from 'apis/response';
import { getCommentListRequest, postCommentRequest } from 'apis';
import { PostCommentRequestDto } from 'apis/request/comment';
dayjs.extend(customParseFormat);

interface Props {
    commentListItem: CommentListItem;
}

//          component: Comment List Item 컴포넌트            //
export default function CommentItem({ commentListItem }: Props) {
    //            state: properties          //
    const { nickname, profileImage, choiceMenu, content } = commentListItem

    //          state: 댓글 textarea 참조 상태           //
    const commentRef = useRef<HTMLTextAreaElement | null>(null);

    //          state: 페이지네이션 관련 상태           //
    const {
      currentPage, currentSection, viewList, viewPageList, totalSection,
      setCurrentPage, setCurrentSection, setTotalList,
    } = usePagination<CommentListItemType>(3);

    //          state: 댓글 상자 보기 상태          //
    const [showComment, setShowComment] = useState<boolean>(false);
    //          state: 댓글 상태          //
    const [comment, setComment] = useState<string>('');
    //          state: 전체 댓글 개수 상태          //
    const [totalCommentCount, setTotalCommnetCount] = useState<number>(0);
    
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

    //          event handler: 댓글 작성 버튼 클릭 이벤트 처리           //
    const onCommentSubmitButtonClickHandler = () => {
      if (!comment || !boardNumber || !loginUser || !cookies.accessToken) return;
      const requestBody: PostCommentRequestDto = { content: comment};
      postCommentRequest(boardNumber, requestBody, cookies.accessToken).then(postCommentResponse);
    }


    //          function: post comment response 처리 함수          //
    const postCommentResponse  = (responseBody: PostCommentResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === 'VF') alert('잘못된 접근입니다.')
      if (code === 'NU') alert('존재하지 않는 유저입니다.');
      if (code === 'NB') alert('존재하지 않는 게시물입니다.');
      if (code === 'AF') alert('인증에 실패했습니다.')
      if (code === 'DBE') alert('데이터베이스 오류입니다.')
      if (code !== 'SU') return;

      if (!bakeryNumber) return;
      getCommentListRequest(bakeryNumber).then(getCommentListResponse);

    }
    //          event handler: 댓글 변경 이벤트 처리           //
    const onCommentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = event.target;
      setComment(value);
      if (!commentRef.current) return;
      commentRef.current.style.height = 'auto';
      commentRef.current.style.height = `${commentRef.current.scrollHeight}px`;

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
                    <div className='comment-list-item-content'>{content}</div>
                </div>
                <div className='comment-list-item-bottom'>
                    <div className='comment-list-item-input-box'>
                        <div className='comment-list-item-input-container'>
                        <textarea ref={commentRef} className='comment-list-item-textarea' placeholder='댓글을 작성해주세요.' value={comment} onChange={onCommentChangeHandler} />
                        <div className='comment-list-item-button-box'>
                            <div className= {comment === '' ? 'disable-button' : 'black-button'} onClick={onCommentSubmitButtonClickHandler}>{'댓글달기'}</div>
                        </div>
                        </div>
                    </div>
          
                </div>
            </div>
        </div>
    )
}
