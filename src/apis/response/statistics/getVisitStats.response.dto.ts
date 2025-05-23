import ResponseDto from "../response.dto";

export default interface GetVisitStatsResposeDto extends ResponseDto {
    bakeryId: number;
    uniqueVisitCountNow: number;        // Redis 기준 오늘 고유 방문자 수
    yesterdayVisitCount: number;        // 어제 고유 방문자 수
    weeklyStats: VisitDailyStat[];      // 7일간 고유 방문자 수 통계
    increaseFromYesterday: number;      // 어제 대비 증감
}

export interface VisitDailyStat {
    date: string;
    count: number;
}