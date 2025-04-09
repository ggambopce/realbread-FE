import './style.css';

//          component: 메인화면 빵집 리스트 컴포넌트            //
export default function BakeryListItem() {

    //          render: 메인화면 빵집 리스트 컴포넌트 랜더링            //
    return (
        <div className='bakery-list-item'>
            <div className='bakery-list-item-main-box'>
                <div className='bakery-list-item-top'>
                    <div className='bakery-list-item-title'>{"하레하레"}</div>
                </div>
                <div className='bakery-list-item-middle'>
                    <div className='bakery-list-item-roadaddress'>{"대전 서구 둔산로 155 크로바아파트 제상가동 1층"}</div>
                </div>
                <div className='bakery-list-item-bottom'>
                    <div className='bakery-list-item-counts'>
                        {"리뷰 0  좋아요 0  조회수 0"}
                    </div>
                </div>
            </div>
            <div className='bakery-list-item-image-box' style={{backgroundImage:`https://fastly.picsum.photos/id/982/200/200.jpg?hmac=X2ocb-PEJJpYgQn2Ib8SKCaWKsI-2hGcsvwZjWStNAw`}}></div>
        </div>
    )
}