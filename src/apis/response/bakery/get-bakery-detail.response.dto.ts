import BakeryDetailItem from "types/interface/bakery-detail-item.interface";
import ResponseDto from "../response.dto";

export default interface GetBakeryDetailResponseDto extends ResponseDto, BakeryDetailItem {
    
}