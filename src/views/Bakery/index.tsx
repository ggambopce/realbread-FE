import { ChangeEvent, useEffect, useRef, useState } from 'react'
import './style.css'
import FavoriteItem from 'components/favoriteItem'
import { CommentListItem, FavoriteListItem } from 'types/interface'
import CommentItem from 'components/commentItem';
import Pagination from 'components/pagination';
import BakeryDetailItem from 'types/interface/bakery-detail-item.interface';
import { GetFavoriteListResponseDto, PutFavoriteResponseDto } from 'apis/response/bakery';
import { ResponseDto } from 'apis/response';
import useLoginUserStore from 'stores/login-user.store';
import { useCookies } from 'react-cookie';
import { usePagination } from 'hooks';
import { getCommentListRequest, getFavoriteListRequest, postCommentRequest, putFavoriteRequest } from 'apis';
import { GetCommentListResponseDto, PostCommentResponseDto } from 'apis/response/comment';
import { PostCommentRequestDto } from 'apis/request/comment';
import VisitChart from 'components/visitChart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-regular-svg-icons';
import { faMapPin } from '@fortawesome/free-solid-svg-icons';

interface Props {
  bakery: BakeryDetailItem;
  onClose: () => void;
}

//          component: 게시물 상세 패널 컴포넌트           //
export default function BakeryDetail({ bakery, onClose }: Props) {

    //          state: 로그인 유지 상태          //
    const { loginUser } = useLoginUserStore();
    //          state: 쿠키 상태            //
    const [cookies, ] = useCookies();

    //          state: 좋아요 리스트 상태          //
    const [favoriteList, setFavoriteList] = useState<FavoriteListItem[]>([]);
    //          state: 좋아요 상태          //
    const [isFavorite, setFavorite] = useState<boolean>(false);
    
    //          state: 추천 메뉴 선택 상태          //
    const [selectedMenuName, setSelectedMenuName] = useState<string>('');

    //          state: 좋아요 상자 보기 상태          //
    const [showFavorite, setShowFavorite] = useState<boolean>(false);
    //          state: 댓글 상자 보기 상태          //
    const [showComment, setShowComment] = useState<boolean>(false);
    //          state: 댓글 textarea 참조 상태           //
    const commentRef = useRef<HTMLTextAreaElement | null>(null);
    //          state: 댓글 상태          //
    const [comment, setComment] = useState<string>('');
    //          state: 전체 댓글 개수 상태          //
    const [totalCommentCount, setTotalCommnetCount] = useState<number>(0);
  
    //          state: 페이지네이션 관련 상태           //
    const {
      currentPage, currentSection, viewList, viewPageList, totalSection,
      setCurrentPage, setCurrentSection, setTotalList,
    } = usePagination<CommentListItem>(3);

    //          function: get favorite list response 처리 함수          //
    const getFavoriteListResponse = (responseBody: GetFavoriteListResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === 'NB') alert('존재하지 않는 빵집 입니다.');
      if (code === 'DBE') alert('데이터베이스 오류입니다.')
      if (code !== 'SU') return;

      const { favoriteList } = responseBody as GetFavoriteListResponseDto;
      setFavoriteList(favoriteList);

      if (!loginUser) {
        setFavorite(false);
        return;
      }
      const isFavorite = favoriteList.findIndex(favorite => favorite.email === loginUser.email) !== -1;
      setFavorite(isFavorite);

    }
    //          function: put favorite response 처리 함수          //
    const putFavoriteResponse = (responseBody: PutFavoriteResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === 'VF') alert('잘못된 접근입니다.')
      if (code === 'NU') alert('존재하지 않는 유저입니다.');
      if (code === 'NB') alert('존재하지 않는 게시물입니다.');
      if (code === 'AF') alert('인증에 실패했습니다.')
      if (code === 'DBE') alert('데이터베이스 오류입니다.')
      if (code !== 'SU') return;

      setComment('');

      if (!bakery.bakeryNumber) return;
      getFavoriteListRequest(bakery.bakeryNumber).then(getFavoriteListResponse);
    }

    //          function: get comment list response 처리 함수          //
    const getCommentListResponse = (responseBody: GetCommentListResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === 'NB') alert('존재하지 않는 게시물 입니다.');
      if (code === 'DBE') alert('데이터베이스 오류입니다.')
      if (code !== 'SU') return;

      const { commentList } = responseBody as GetCommentListResponseDto;
      setTotalList(commentList);
      setTotalCommnetCount(commentList.length);
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

      if (!bakery.bakeryNumber) return;
      getCommentListRequest(bakery.bakeryNumber).then(getCommentListResponse);

    }

    //          event handler: 좋아요 클릭 이벤트 처리           //
    const onFavoriteClickHandler = () => {
      if (!loginUser || !cookies.accessToken || !bakery.bakeryNumber) return;
      putFavoriteRequest(bakery.bakeryNumber, cookies.accessToken).then(putFavoriteResponse);

    } 
    //          event handler: 좋아요 상자 보기 클릭 이벤트 처리           //
    const onShowFavoriteClickHandler = () => {
      setShowFavorite(!showFavorite);
    }
    //          event handler: 댓글 상자 보기 클릭 이벤트 처리           //
    const onShowCommentClickHandler = () => {
      setShowComment(!showComment);
    }
    //          event handler: 댓글 작성 버튼 클릭 이벤트 처리           //
    const onCommentSubmitButtonClickHandler = () => {
      if (!comment || !bakery.bakeryNumber || !loginUser || !cookies.accessToken) return;
      const requestBody: PostCommentRequestDto = { content: comment};
      postCommentRequest(bakery.bakeryNumber, requestBody, cookies.accessToken).then(postCommentResponse);
    }
    //          event handler: 댓글 변경 이벤트 처리           //
    const onCommentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = event.target;
      setComment(value);
      if (!commentRef.current) return;
      commentRef.current.style.height = 'auto';
      commentRef.current.style.height = `${commentRef.current.scrollHeight}px`;

    }

    //          event handler: 닫기 버튼 클릭 이벤트 처리           //
    const onCloseButtonClickHandler = () => {
        onClose();
    }

    //          effect: 게시물 번호 path variable이 바뀔때 마다 좋아요 및 댓글 리스트 불러오기          //
    useEffect(() => {
      if (!bakery.bakeryNumber) return;
      getFavoriteListRequest(bakery.bakeryNumber).then(getFavoriteListResponse);
      getCommentListRequest(bakery.bakeryNumber).then(getCommentListResponse);
    }, [bakery.bakeryNumber]);


    //          render: 게시물 상세 화면 컴포넌트 렌더링           //
    if (!bakery) return <></>
    return (
      <div id='bakery-detail-wrapper'>
        <div className='bakery-detail-container'>
          <div className='bakery-detail-top'>
            <div className='bakery-detail-top-title-box'>
              <div className='bakery-detail-top-title'>{bakery.title}</div>
              <div className='icon-button' onClick={onCloseButtonClickHandler}>
                <div className='icon close-icon'></div>
                </div>
            </div>
            <div className='bakery-detail-top-road-address'><FontAwesomeIcon icon={faMapPin} />&nbsp;{bakery.roadAddress}</div>    
          </div>
          <div className='bakery-detail-statistics-box'>
            <VisitChart bakeryId={bakery.bakeryNumber} />
          </div>
          <div className='bakery-detail-button-box'>
            <div className='bakery-detail-button-group'>
              <div className='icon-button' onClick={onFavoriteClickHandler}>
                {isFavorite ? <div className='icon favorite-fill-icon'></div> :
                <div className='icon favorite-light-icon'></div>
                }
              </div>
              <div className='bakery-detail-button-text'>{`좋아요 ${favoriteList.length}`}</div>
              <div className='icon-button' onClick={onShowFavoriteClickHandler}>
                {showFavorite ? <div className='icon up-light-icon'></div> : <div className='icon down-light-icon'></div>}
              </div>
            </div>
            <div className='bakery-detail-button-group'>
              <div className='icon-button'>
                <FontAwesomeIcon icon={faCommentDots} />       
              </div>
              <div className='bakery-detail-button-text'>{`리뷰 ${totalCommentCount}`}</div>
              <div className='icon-button' onClick={onShowCommentClickHandler}>
                {showComment ? <div className='icon up-light-icon'></div> : <div className='icon down-light-icon'></div>}
              </div>
            </div>
          </div>
          {showFavorite &&
          <div className='bakery-detail-favorite-box'>
            <div className='bakery-detail-favorite-container'>
              <div className='bakery-detail-favorite-title'>{'좋아요 '}<span className='emphasis'>{favoriteList.length}</span></div>
              <div className='bakery-detail-favorite-contents'>
              {favoriteList.map(item => <FavoriteItem favoriteListItem={item} />)}
              </div>
            </div>
          </div>
          }
          {showComment &&
          <div className='bakery-detail-comment-box'>
            <div className='bakery-detail-comment-container'>
            <div className='bakery-detail-comment-title'>{'리뷰 '}<span className='emphasis'>{totalCommentCount}</span></div>
            <div className='bakery-detail-comment-list-container'>
              {viewList.map(item => <CommentItem commentListItem={item} />)}
            </div>
            <div className='divider'></div>
            <div className='bakery-detail-comment-pagination-box'>
              <Pagination
              currentPage={currentPage}
              currentSection={currentSection}
              setCurrentPage={setCurrentPage}
              setCurrentSection={setCurrentSection}
              viewPageList={viewPageList}
              totalSection={totalSection}

            />
            </div>
            {loginUser !== null && 
            <div className='bakery-detail-comment-input-box'>
              <div className="menu-choice-toggle-group">
                {[...new Set(bakery.menuList.map(menu => menu.menuName))].map(name => (
                  <button
                    key={name}
                    className={`menu-toggle-button ${selectedMenuName === name ? 'selected' : ''}`}
                    onClick={() => setSelectedMenuName(name)}
                  >
                    {name}
                  </button>
                ))}
              </div>
              <div className='bakery-detail-comment-input-container'>
                <textarea  className='bakery-detail-comment-textarea' placeholder='추천 메뉴와 리뷰를 작성해주세요.' value={comment} onChange={onCommentChangeHandler}/>
                <div className='bakery-detail-comment-button-box'>
                  <div className= {comment === '' ? 'disable-button' : 'black-button'} onClick={onCommentSubmitButtonClickHandler}>{'리뷰작성'}</div>
                </div>
              </div>
            </div>
            }
            </div>
          </div>
        }
        <div className='divider'></div>
          <div className='bakery-detail-menu-box'>
            {bakery?.menuList.map(menu => (
              <div className='bakery-detail-menu-item' key={menu.menuNumber}>
                <div className='bakery-detail-menu-info'>
                  <div className='bakery-detail-menu-name'>{menu.menuName}</div>
                  <div className='bakery-detail-menu-description'>{menu.description}</div>
                  <div className='bakery-detail-menu-price'>{menu.price}</div>
                </div>
                <div className="bakery-detail-menu-image-box">
                  <div
                  key={menu.menuNumber}
                  className='bakery-detail-menu-image'
                  style={{ backgroundImage: `url(${menu.imageUrl})` }}
                  />
                </div>
                
              </div>
            ))}
          </div>
        </div>
      </div>
  )
}