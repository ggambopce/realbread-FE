import MenuListItem from "./menu-list-item.interface";

export default interface Bakery {
    bakeryNumber: number;
    title: string;
    roadAddress: string;
    favoriteCount: number;
    commentCount: number;
    menuList: MenuListItem[];
}


