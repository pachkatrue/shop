'use client';

import { useEffect, useState } from 'react';
import { Review } from '@/types';
import { api } from '@/utils/api';
import './reviews.css';

export const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsData = await api.getReviews();
        setReviews(reviewsData);
      } catch (err) {
        setError('Ошибка загрузки отзывов');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const sanitizeHtml = (html: string) => {
    return html
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/\son\w+="[^"]*"/gi, '')
    .replace(/javascript:/gi, '');
  };

  if (loading) {
    return (
      <div className="reviews-container">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="review-card skeleton-card" />
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="review-error">{error}</div>;
  }

  return (
    <div className="reviews-container">
      {reviews.map((review, index) => (
        <div key={review.id} className="review-card">
          {/*<div className="meta">Отзыв {index + 1}</div>*/}
          {/*<div className="meta">Полученный с api</div>*/}
          {/*<div className="meta">HTML</div>*/}
          <div
            className="html"
            dangerouslySetInnerHTML={{__html: sanitizeHtml(review.text)}}
          />
        </div>
      ))}
    </div>
  );
};
