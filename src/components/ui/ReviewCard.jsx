export default function ReviewCard({ review }) {
  const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
  
  return (
    <div className="review-card">
      <div className="review-header">
        <div>
          <div className="review-author">{review.customerName || 'Anonymous'}</div>
          <div className="review-date">{new Date(review.reviewDate).toLocaleDateString()}</div>
        </div>
        <div className="review-rating">{stars}</div>
      </div>
      <p className="review-text">{review.reviewText}</p>
      {review.isVerifiedPurchase && (
        <span className="badge badge--success">Verified Purchase</span>
      )}
    </div>
  );
}
