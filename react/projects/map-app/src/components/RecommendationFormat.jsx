export default function RecommendationFormat({recommendation}) {
    return (
        <>
            <h2>
                {recommendation.title + ' ' + recommendation.averageRating}
            </h2>
            {recommendation.reviews.map((review, index) => {
                return (
                    <div key={index}>
                        {review.username}
                    </div>
                )
            })}
        </>
    )
}
