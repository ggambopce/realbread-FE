import { BakerySummary } from "types/interface/bakery-main-list.interface";
import ResponseDto from "../response.dto";

export default interface GetBakeryMainListResponseDto extends ResponseDto {
    mainBakeryList: BakerySummary[];
}