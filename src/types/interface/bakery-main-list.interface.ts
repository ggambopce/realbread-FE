// 전체 응답 구조
export interface BakeryMainList {
  mainBakeryList: BakerySummary[];
}

// 개별 빵집 요약 정보 (메뉴 리스트 포함)
export interface BakerySummary {
  bakeryNumber: number;
  title: string;
  roadAddress: string;
  favoriteCount: number;
  commentCount: number;
  link: string;
  mapx: string;
  mapy: string;

  menuList: MenuListItem[];
}

// 개별 메뉴 항목
export interface MenuListItem {
  menuNumber: number;
  imageUrl: string;
}




