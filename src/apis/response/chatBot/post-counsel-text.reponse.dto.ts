import ResponseDto from "../response.dto";

export default interface PostCounselTextResponseDto extends ResponseDto {
    response: string;
    emotion?: string;
}