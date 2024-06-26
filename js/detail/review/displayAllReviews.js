import { createReviewElement } from "./handleAdd.js";
import { reviewContainer } from "./domElements.js";
import {
  incrementReviewCount,
  resetReviewCount,
  reviewCount,
} from "./reviewCount.js";
import likeIcon from "../icon.js";
import { movieId } from "../index.js";

export const displayAllReviews = () => {
  const keys = [];
  resetReviewCount();
  const allReviews = localStorage.length;
  for (let i = 0; i < allReviews; i++) {
    keys.push(localStorage.key(i));
  }
  const sortedKeys = keys.map((key) => Number(key)).sort((a, b) => a - b);
  sortedKeys.forEach((key) => {
    const reviewContentString = localStorage.getItem(key);
    if (reviewContentString) {
      const reviewContent = JSON.parse(reviewContentString);
      if (reviewContent.movieId === movieId) {
        incrementReviewCount();
        const reviewRow = createReviewElement(reviewContent, reviewCount, key);
        reviewContainer.appendChild(reviewRow);
        likeIcon(key);
      }
    }
  });
  !reviewCount && displayEmptyMessage();
};

export function displayEmptyMessage() {
  const emptyMessage = `<div id="review-empty-msg"><p>등록된 리뷰가 없습니다.</p><p>첫번째 리뷰어가 되어주세요.<p/></div>`;
  reviewContainer.innerHTML = emptyMessage;
}
