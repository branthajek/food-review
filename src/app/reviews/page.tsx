"use client";

import { useState } from "react";
import ViewReviews from "../components/ViewReviews";
import { Review } from "@/types/review";

export default function ReviewsPage() {
	const [reviews, setReviews] = useState<Review[]>([]);

	return <ViewReviews reviews={reviews}></ViewReviews>
}