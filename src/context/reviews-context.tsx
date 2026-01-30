'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { createReview, fetchReviews } from '@/lib/api';
import { NewReview, Review } from '@/types/review';

interface ReviewsContextType {
	reviews: Review[];
	localReviews: Review[];
	addReview: (review: NewReview) => void;
	updateReview: (id: string, updated: Review) => void;
	deleteReview: (id: string) => void;
	syncReviews: () => Promise<void>;
}

const ReviewsContext = createContext<ReviewsContextType | undefined>(undefined);

export function ReviewsProvider({ children }: { children: ReactNode }) {
	const queryClient = useQueryClient();

	const { data: serverReviews = [] } = useQuery<Review[], Error>({
		queryKey: ['reviews'],
		queryFn: fetchReviews,
		enabled: false,
	});

	const [localReviews, setLocalReviews] = useState<Review[] | null>(null);

	useEffect(() => {
		const saved = localStorage.getItem('localReviews');
		setLocalReviews(saved ? JSON.parse(saved) : []);
	}, []);

	const mutation = useMutation<Review, unknown, Review>({
		mutationFn: createReview,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['reviews'] });
		},
	});

	if (localReviews === null) {
		return <p>Loading...</p>;
	}

	const reviews = [...localReviews, ...serverReviews];

	function persist(updated: Review[]) {
		localStorage.setItem('localReviews', JSON.stringify(updated));
	}

	function addReview(review: NewReview) {
		const withTempId: Review = {
			...review,
			_id: crypto.randomUUID(),
			date: review.date ?? new Date().toISOString(),
		};
		setLocalReviews((prev) => {
			const updated = [withTempId, ...(prev ?? [])];
			persist(updated);
			return updated;
		});
	}

	function updateReview(id: string, updated: Review) {
		setLocalReviews((prev) => {
			if (!prev) return [];
			const copy = prev.map((r) => (r._id === id ? { ...r, ...updated } : r));
			persist(copy);
			return copy;
		});
	}

	function deleteReview(id: string) {
		setLocalReviews((prev) => {
			if (!prev) return [];
			const copy = prev.filter((r) => r._id !== id);
			persist(copy);
			return copy;
		});
	}

	async function syncReviews() {
		if (!localReviews?.length) return;
		const synced: Review[] = [];
		for (const review of localReviews) {
			const reviewToSend: Review = {
				...review,
				_id: review._id ?? crypto.randomUUID(),
			};
			const saved = await mutation.mutateAsync(reviewToSend);
			synced.push(saved);
		}

		setLocalReviews([]);
		localStorage.removeItem('localReviews');

		queryClient.setQueryData(['reviews'], (old: Review[] = []) => [
			...synced,
			...old,
		]);
	}

	return (
		<ReviewsContext.Provider
			value={{
				reviews,
				localReviews,
				addReview,
				updateReview,
				deleteReview,
				syncReviews,
			}}
		>
			{children}
		</ReviewsContext.Provider>
	);
}

export function useReviews() {
	const context = useContext(ReviewsContext);
	if (!context) {
		throw new Error('useReviews must be used within a ReviewsProvider');
	}
	return context;
}
