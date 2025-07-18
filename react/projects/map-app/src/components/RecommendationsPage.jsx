import RecommendationFormat from "./RecommendationFormat"

export default function RecommendationsPage({recommendations}) {
    return (
        <div className="recommend-page">
            <h2>
                Top destinations this month
            </h2>
            <main>
                {recommendations.map((recommendation, index) => {
                    return (
                        <RecommendationFormat
                            recommendation={recommendation}
                            key = {index}/>
                    )
                })}
            </main>
        </div>
    )
}
