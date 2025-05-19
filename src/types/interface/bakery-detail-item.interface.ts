import MenuDetailListItem from "./menu-list-item.interface";

export default interface BakeryDetailItem {
    bakeryNumber: number;
    title: string;
    roadAddress: string;
    commentCount: number;
    favoriteCount: number;

    menuList: MenuDetailListItem[];
}

