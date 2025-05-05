import { Bakery } from "types/interface";


const bakeryMock: Bakery = {
    bakeryNumber: 1,
    title: '그린베이커리',
    roadAddress: '대전광역시 유성구 테크노4로 80-7 1층 101호',
    favoriteCount: 0,
    commentCount: 0,
    menuList: [
      {
        menuNumber: 7,
        menuName: '딸기밥',
        price: '39,000원',
        imageUrl: 'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20250330_231%2F1743268031576HYh5s_JPEG%2FKakaoTalk_20250330_020500237.jpg',
        description: ''
      },
      {
        menuNumber: 8,
        menuName: '쌀하레치즈',
        price: '6,500원',
        imageUrl: 'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20240722_231%2F1721641846191HKYhu_PNG%2F%25BD%25D2%25C4%25A1%25C1%25EE%25C4%25AB%25BD%25BA%25C5%25D7%25B6%25F32.png',
        description: '폭신폭신 쌀치즈 카스테라 하레하레 시그니처'
      },
      {
        menuNumber: 9,
        menuName: '딸기타르트',
        price: '35,000원',
        imageUrl: 'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20250330_253%2F1743267449414Czhzk_JPEG%2FKakaoTalk_20250330_015649960.jpg',
        description: '참자! 또라길 모하지롱~ 계절 과일 사용으로 현재 딸기 타르트로 나옵니다.'
      },
      {
        menuNumber: 10,
        menuName: '미니생우유 카또',
        price: '3,800원',
        imageUrl: 'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20240722_226%2F1721641902263UU0U3_PNG%2F%25B8%25B6%25BD%25C3%25B8%25E1%25B7%25CE%25B0%25BC%25B6%25C74_-_%25BA%25B9%25BB%25E7%25BA%25BB.png',
        description: ''
      }
    ]
  };
  
  export default bakeryMock;