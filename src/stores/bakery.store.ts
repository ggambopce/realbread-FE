import MenuDetailListItem from "types/interface/menu-list-item.interface";
import { create } from "zustand";

interface BakeryStore {
    bakeryNumber: number;
    title: string;
    roadAddress: string;
    link: string;
    mapx: number;
    mapy: number;
    favoriteCount: number;
    commentCount: number;
    menuList: MenuDetailListItem[];
    setTitle: (title: string) => void;
    setRoadAddress: (roadAddress: string) => void;
    setLink: (link: string) => void;
    setMenuList: (menuList: MenuDetailListItem[]) => void;
    setFavoriteCount: (count: number) => void;
    setCommentCount: (count: number) => void;
    setCoordinates: (mapx: number, mapy: number) => void;
    setBakery: (bakery: BakeryStore) => void;
    resetBakery: () => void;
};

const useBakeryStore = create<BakeryStore>(set => ({
    bakeryNumber: 0,
    title: '',
    roadAddress: '',
    link: '',
    mapx: 0,
    mapy: 0,
    favoriteCount: 0,
    commentCount: 0,
    menuList: [],
    
    setTitle: (title) => set(state => ({...state, title })),
    setRoadAddress: (roadAddress) => set((state) => ({ ...state, roadAddress })),
    setLink: (link) => set((state) => ({ ...state, link })),
    setMenuList: (menuList) => set((state) => ({ ...state, menuList })),
    setFavoriteCount: (count) => set((state) => ({ ...state, favoriteCount: count })),
    setCommentCount: (count) => set((state) => ({ ...state, commentCount: count })),
    setCoordinates: (mapx, mapy) => set((state) => ({ ...state, mapx, mapy })),
    setBakery: (bakery) => set((state) => ({ ...state, ...bakery })),
    resetBakery: () =>
        set({
        bakeryNumber: 0,
        title: '',
        roadAddress: '',
        link: '',
        mapx: 0,
        mapy: 0,
        favoriteCount: 0,
        commentCount: 0,
        menuList: [],
        }),
}));

export default useBakeryStore;