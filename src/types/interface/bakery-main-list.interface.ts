// 개별 메뉴 항목
export interface MenuListItem {
  menuNumber: number;
  imageUrl: string;
}

// 개별 빵집 요약 정보 (메뉴 리스트 포함)
export interface BakerySummary {
  bakeryNumber: number;
  title: string;
  favoriteCount: number;
  commentCount: number;
  menuList: MenuListItem[];
}

// 전체 응답 구조
export interface BakeryMainList {
  mainBakeryList: BakerySummary[];
}
