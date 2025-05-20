import { BakeryListItem } from "types/interface";
import ResponseDto from "../response.dto";

export default interface GetBakerySearchListResponseDto extends ResponseDto {
    searchList: BakeryListItem[];
}