export interface GetSignInUserResponseDto {
    userId: number;
    email: string;
    nickname: string;
    profileImage: string | null;
    role: string;
}