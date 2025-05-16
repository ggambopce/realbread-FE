import { BakerySummary, MenuListItem } from 'types/interface/bakery-main-list.interface';
import './style.css';

interface Props {
    bakeryListItem: BakerySummary;
    onSelect: (bakery: BakerySummary) => void;
}

//          component: 메인화면 빵집 리스트 컴포넌트            //
export default function BakeryListItem({ bakeryListItem, onSelect }: Props) {

    //            state: properties            //
    const { title, roadAddress, link} = bakeryListItem;
    const { favoriteCount, commentCount} = bakeryListItem;
    const { menuList } = bakeryListItem;
    // const {bakeryNumber, , mapx, mapy};

    //          event handler: 빵집 제목 클릭 이벤트 처리 함수          //
    const onTitleClickHandler = () => {
        // 해당 bakeryNumber 빵집 상세 panel 열기
        onSelect(bakeryListItem);
    }
    //          event handler: 도로명 주소 클릭 이벤트 처리 함수          //
    const onRoadAddressClickHandler = () => {
        //  지도에서 해당 mapx, mapy로 이동

    }
    //          event handler: link 클릭 이벤트 처리 함수          //
    const onLinkClickHandler = () => {
        // 해당 링크 주소 새창으로 열기
        window.open(link, '_blank');
    }

    //          render: 메인화면 빵집 리스트 컴포넌트 랜더링            //
    return (
        <div className='bakery-list-item'>
            <div className='bakery-list-item-main-box'>
                <div className='bakery-list-item-top'>
                    <div className='bakery-list-item-title' onClick={onTitleClickHandler}>{title}</div>
                </div>
                <div className='bakery-list-item-middle'>
                    <div className='bakery-list-item-roadaddress' onClick={onRoadAddressClickHandler}>{roadAddress}</div>
                    <div className='bakery-list-item-link' onClick={onLinkClickHandler}>{link}</div>
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