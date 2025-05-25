import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import './style.css';
import GetVisitStatsResposeDto, { VisitDailyStat } from 'apis/response/statistics/getVisitStats.response.dto';
import { getBakeryVisitStatsRequest } from 'apis';

interface Props {
    bakeryId: number;
}

export default function VisitChart({ bakeryId }: Props) {
    const [data, setData] = useState<VisitDailyStat[]>([]);
    const [loading, setLoading] = useState(true);
    const [uniqueVisitCountNow, setUniqueVisitCountNow] = useState(0);
    const [yesterdayVisitCount, setYesterdayVisitCount] = useState(0);
    const [increaseFromYesterday, setIncreaseFromYesterday] = useState(0);

    //          state: 좋아요 상자 보기 상태          //
    const [showChart, setShowChart] = useState<boolean>(true);

    //          event handler: 차트 상자 닫기 클릭 이벤트 처리           //
    const onShowChartClickHandler = () => {
        setShowChart(!showChart);
    };

    useEffect(() => {
        const fetchStats = async () => {
            const response = await getBakeryVisitStatsRequest(bakeryId);

            if (response && response.code === 'SU') {
                const typedResponse = response as GetVisitStatsResposeDto;

                setUniqueVisitCountNow(typedResponse.uniqueVisitCountNow);
                setYesterdayVisitCount(typedResponse.yesterdayVisitCount);
                setIncreaseFromYesterday(typedResponse.increaseFromYesterday);
            }

            if (response && 'weeklyStats' in response && response.weeklyStats.length > 0) {
                setData(response.weeklyStats);
            } else {
                // 데이터 없을 경우 차트 기본 틀만 보여주기 위한 placeholder
                const today = new Date();
                const dates = Array.from({ length: 7 }, (_, i) => {
                    const d = new Date(today);
                    d.setDate(today.getDate() - 6 + i);
                    return {
                        date: d.toISOString().split('T')[0],
                        count: 0,
                    };
                });
                setData(dates);
            }

            setLoading(false);
        };

        fetchStats();
    }, [bakeryId]);

    if (loading) return <div>로딩 중...</div>;
    if (!data.length) return <div>방문 기록이 없습니다.</div>;

    return (
        <div id="bakery-detail-visit-statistic-warapper">
            <div className="bakery-detail-visit-statistic-grap">
                <div className="bakery-detail-visit-statistic-grap-top-box">
                    <div className="icon-button" onClick={onShowChartClickHandler}>
                        {showChart ? (
                            <div className="icon up-light-icon"></div>
                        ) : (
                            <div className="icon down-light-icon"></div>
                        )}
                    </div>
                    <div className="bakery-detail-visit-statistic-grap-top-title">{''}</div>
                </div>

                {showChart && (
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={[
                                    { date: '2025-05-19', count: 150 },
                                    { date: '2025-05-20', count: 170 },
                                    { date: '2025-05-22', count: 0 },
                                    { date: '2025-05-23', count: 160 },
                                    { date: '2025-05-24', count: 160 },
                                    { date: '2025-05-25', count: 50 },
                                    { date: '2025-05-26', count: 160 },
                                ]}
                                margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                                style={{ backgroundColor: 'white' }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="date"
                                    tickFormatter={date => {
                                        const d = new Date(date);
                                        return `${d.getMonth() + 1}.${d.getDate()}`;
                                    }}
                                    padding={{ left: 10, right: 10 }}
                                />
                                {/* <YAxis padding={{ top: 20 }} /> */}
                                <Tooltip />
                                <Line type="monotone" dataKey="count" stroke="#0A5EB0" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>

            <div className="bakery-detail-visit-statistic-contents">
                <div className="bakery-detail-visit-statistic-summary">
                    <div>{'방문자'}</div>
                    <div>
                        <span>오늘 </span>
                        {uniqueVisitCountNow}명
                    </div>
                    <div>
                        <span>어제 </span>
                        {yesterdayVisitCount}명
                    </div>
                    <div>
                        <span>증감 </span>
                        {increaseFromYesterday}명
                    </div>
                </div>
            </div>
        </div>
    );
}
