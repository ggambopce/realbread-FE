export const MAIN_PATH = () => '/';
export const AUTH_PATH = () => '/auth';
export const SEARCH_PATH = (searchWord: string) => `/search/${searchWord}`;
export const USER_PATH = (userEmail: string) => `/user/${userEmail}`;
export const BAKERY_PATH = () => '/bakery';
export const BAKERY_DETAIL_PATH = (bakeryNumber: string | number) => `detail/${bakeryNumber}`;
export const BAKERY_WRITE_PATH = () => 'write';
export const BAKERY_UPDATE_PATH = (bakeryNumber: string | number) => `update/${bakeryNumber}`;
export const EDUBOT_RECODER = () => '/edubot';
 