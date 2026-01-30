export interface Review {
	_id: string;
	restaurant: string;
	rating: number;
	reviewText: string;
	orderItems: OrderItem[];
	date?: string | Date;
}

export type NewReview = Omit<Review, '_id'>;

export interface OrderItem {
	id: string;
	name: string;
	type: string;
	rating: string;
}
