import { BakerySummary, MenuListItem } from 'types/interface/bakery-main-list.interface';
import './style.css';

interface Props {
    bakeryListItem: BakerySummary;
    onTitleClick: (bakeryNumber: number) => void;
}

//          component: 메인화면 빵집 리스트 컴포넌트            //
export default function BakeryListItem({ bakeryListItem, onTitleClick }: Props) {

    //            state: properties            //
    const { bakeryNumber, title, roadAddress, link} = bakeryListItem;
    const { favoriteCount, commentCount} = bakeryListItem;
    const { menuList } = bakeryListItem;
    // const {bakeryNumber, , mapx, mapy};

    //          event handler: link 클릭 이벤트 처리 함수          //
    const onLinkClickHandler = (link: string) => {
        // 해당 링크 주소 새창으로 열기
        window.open(link, '_blank');
    }

    //          render: 메인화면 빵집 리스트 컴포넌트 랜더링            //
    return (
        <div className='bakery-list-item'>
            <div className='bakery-list-item-main-box'>
                <div className='bakery-list-item-top'>
                    <div className='bakery-list-item-title' onClick={() => onTitleClick(bakeryNumber)}>{title}</div>
                    {link && (
                    <div className='bakery-list-item-link-icon'>
                        <div className= 'link-icon-box' onClick={() => onLinkClickHandler(link)} aria-label="홈페이지 이동">
                            <div className='icon link-icon' ></div>
                        </div> 
                    </div>
                    )}    
                </div>
                <div className='bakery-list-item-middle'>
                    <div className='bakery-list-item-roadaddress'>{roadAddress}</div>
                </div>
                <div className='bakery-list-item-bottom'>
                    <div className='bakery-list-item-counts'>
                        리뷰 {commentCount}  · 좋아요 {favoriteCount}
                    </div>
                </div>
            </div>
            <div className="bakery-list-item-image-box">
                {menuList.slice(0, 4).map((menu: MenuListItem) => (
                    <div
                        key={menu.menuNumber}
                        className="bakery-list-item-image"
                        style={{ backgroundImage: `url(${menu.imageUrl})` }}
                    />
                ))}
            </div>
        </div>
    )
}