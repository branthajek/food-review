import { Review } from '@/types/review';

export async function fetchReviews(): Promise<Review[]> {
	const res = await fetch('/api/reviews');
	if (!res.ok) {
		throw new Error('Failed to fetch reviews');
	}
	return res.json();
}

export async function createReview(review: Review): Promise<Review> {
	const res = await fetch('/api/reviews', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(review),
	});
	if (!res.ok) {
		throw new Error('Failed to create review');
	}
	return res.json();
}
