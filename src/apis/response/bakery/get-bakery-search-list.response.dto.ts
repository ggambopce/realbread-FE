import ResponseDto from "../response.dto";
import { BakerySummary } from "types/interface/bakery-main-list.interface";

export default interface GetBakerySearchListResponseDto extends ResponseDto {
    mainBakeryList: BakerySummary[];
}