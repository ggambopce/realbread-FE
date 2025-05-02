import './style.css';

//          component: 메인화면 빵집 리스트 컴포넌트            //
export default function BakeryListItem() {

    const imageUrls = [
        'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20250330_231%2F1743268031576HYh5s_JPEG%2FKakaoTalk_20250330_020500237.jpg',
        'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20240722_231%2F1721641846191HKYhu_PNG%2F%25BD%25D2%25C4%25A1%25C1%25EE%25C4%25AB%25BD%25BA%25C5%25D7%25B6%25F32.png',
        'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20250330_253%2F1743267449414Czhzk_JPEG%2FKakaoTalk_20250330_015649960.jpg',
        'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20240722_226%2F1721641902263UU0U3_PNG%2F%25B8%25B6%25BD%25C3%25B8%25E1%25B7%25CE%25B0%25BC%25B6%25C74_-_%25BA%25B9%25BB%25E7%25BA%25BB.png',
        'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20240722_38%2F1721641659273SayeP_PNG%2F%25B3%25EC%25C0%25CE1.png',
    ]

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
            <div className='bakery-list-item-image-box'>
                {imageUrls.map((url, idx) => (
                     <div
                     key={idx} 
                     className='bakery-list-item-image' 
                     style={{backgroundImage: `url(${url})`
                     }}/>
                ))}
            </div>
        </div>
    )
}