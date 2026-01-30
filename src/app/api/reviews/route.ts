import clientPromise from '@/lib/mongodb';
import { Review } from '@/types/review';
import { NextResponse } from 'next/server';

export async function GET() {
	try {
		const client = await clientPromise;
		const db = client.db('food-review');
		const reviews = await db.collection<Review>('reviews').find({}).toArray();

		return NextResponse.json(reviews);
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ success: false, error: 'Failed to fetch reviews' },
			{ status: 500 }
		);
	}
}
