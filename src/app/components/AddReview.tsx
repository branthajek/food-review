'use client';
import { Input, Label, Textarea, Button } from '@/components/ui';
import { useState } from 'react';
import { ForkRating } from './ForkRating';
import { Review, OrderItem } from '@/types/review';
import OrderDetails from './OrderDetails';
import { useReviews } from '@/context/reviews-context';
import { useRouter } from 'next/navigation';

export default function AddReview() {
	const router = useRouter();
	const { addReview } = useReviews();
	const [restaurant, setRestaurant] = useState('');
	const [reviewText, setReview] = useState('');
	const [rating, setRating] = useState(0);
	const [orderItems, setItems] = useState<Array<OrderItem>>([]);

	function submitForm(e: React.FormEvent) {
		e.preventDefault();
		const newReview: Omit<Review, "_id"> = { restaurant, reviewText, rating, orderItems };
		addReview(newReview);
		setRestaurant("");
		setReview("");
		setRating(0);
		setItems([]);
		router.push('/reviews');
	}

	return (
		<section>
			<form onSubmit={submitForm} className="space-y-4">
				<h2 className="text-3xl">Submit a New Review</h2>
				<div>
					<Label htmlFor="restaurant">Restaurant Name</Label>
					<Input
						className="mt-2"
						id="restaurant"
						value={restaurant}
						onChange={(e) => setRestaurant(e.target.value)}
						placeholder="Enter restaurant name"
						required
					/>
				</div>

				<div>
					<Label htmlFor="review">Review</Label>
					<Textarea
						className="mt-2"
						id="review"
						value={reviewText}
						onChange={(e) => setReview(e.target.value)}
						placeholder="Write your review"
						rows={4}
						required
					/>
				</div>

				<div>
					<Label>Fork Score</Label>
					<ForkRating forks={rating} setForks={setRating} />
				</div>

				<hr className="border-t border-gray-300 my-4"></hr>

				<OrderDetails orderItems={orderItems} setItems={setItems} />

				<Button type="submit" className="mt-4">
					Submit Review
				</Button>
			</form>
		</section>
	);
}
