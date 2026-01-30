"use client";

import { Review } from "@/types/review";
import { useState } from "react";
import AddReview from "../components/AddReview";

export default function AddReviewPage() {
	const [activeTab, setActiveTab] = useState<'add' | 'view'>('add');
	const [reviews, setReviews] = useState<Review[]>([]);

	function handleAddReview(newReview: Review) {
		setReviews((prev) => [newReview, ...prev]);
		setActiveTab('view');
	}

	return <AddReview onAddReview={handleAddReview} />;
}
