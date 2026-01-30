"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useReviews } from "@/context/reviews-context";
import { OrderItem } from "@/types/review";
import ReviewCard from "./ReviewCard";

export default function ViewReviews() {
	const { reviews, updateReview, deleteReview } = useReviews();

	if (!reviews.length) {
		return (
			<p className="text-center text-muted-foreground mt-6">No reviews yet!</p>
		);
	}

	return (
		<section className="grid gap-4 md:grid-cols-2 mt-6">
			{reviews.map((review, i) => (
				// <Card key={i} className="rounded-2xl shadow-sm">
				// 	<CardHeader>
				// 		<CardTitle className="flex justify-between items-center">
				// 			<span className="truncate">{review.restaurant}</span>
				// 			{/* <Badge variant="secondary">{r.rating} 🍴</Badge> */}
				// 			<Badge variant="secondary">
				// 				{review.rating} <ForkIcon filled={true} />
				// 			</Badge>
				// 		</CardTitle>
				// 	</CardHeader>
				// 	<CardContent>
				// 		<p className="text-sm text-muted-foreground">{review.reviewText}</p>

				// 		{review.orderItems && review.orderItems.length > 0 && (
				// 			<div className="border-t pt-3">
				// 				<h4 className="font-medium text-sm mb-2">Order Items</h4>
				// 				<ul className="space-y-1">
				// 					{review.orderItems.map((item: OrderItem) => (
				// 						<li
				// 							key={item.id}
				// 							className="flex items-center justify-between rounded-md bg-muted px-3 py-2"
				// 						>
				// 							<span className="font-medium">{item.name}</span>
				// 							<span className="text-xs text-muted-foreground">
				// 								{item.rating}
				// 							</span>
				// 						</li>
				// 					))}
				// 				</ul>
				// 			</div>
				// 		)}
				// 	</CardContent>
				// </Card>
				<ReviewCard
					key={review._id ?? i}
					review={review}
					onUpdate={(updated) => updateReview(review._id, updated)}
					onDelete={() => deleteReview(review._id)}
				/>
			))}
		</section>
	);
}