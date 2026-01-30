"use client";

import { Button, Input, Textarea } from "@/components/ui";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderItem, Review } from "@/types/review";
import { useState } from "react";
import { ForkRating } from "./ForkRating";
import { Pencil, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ReviewCard({
	review,
	onUpdate,
	onDelete,
}: {
	review: Review;
	onUpdate: (r: Review) => void;
	onDelete: () => void;
}) {
	const [isEditing, setIsEditing] = useState(false);
	const [form, setForm] = useState(review);

	const ForkIcon = ({ filled }: { filled: boolean }) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill={filled ? '#FF7F50' : 'none'}
			stroke="#FF7F50"
			strokeWidth="2"
			viewBox="0 0 24 24"
			width="24"
			height="24"
			className="cursor-pointer"
		>
			<path d="M7 2v6M10 2v6M13 2v6M7 8h10l-2 14H9L7 8z" />
		</svg>
	);

	function handleSave() {
		onUpdate(form);
		setIsEditing(false);
	}

	if (isEditing) {
		return (
			<Card className="rounded-2xl shadow-sm">
				<CardContent className="space-y-3">
					<Input
						value={form.restaurant}
						onChange={(e) => setForm({ ...form, restaurant: e.target.value })}
						placeholder="Restaurant name"
					/>
					<Textarea
						value={form.reviewText}
						onChange={(e) => setForm({ ...form, reviewText: e.target.value })}
						placeholder="Write your review..."
					/>
					<ForkRating
						forks={form.rating}
						setForks={(rating) => setForm({ ...form, rating })}
					/>
					<div className="space-y-2">
						<h4 className="text-sm font-semibold">Order Items</h4>
						{form.orderItems.map((item, idx) => (
							<div
								key={item.id}
								className="grid grid-cols-3 gap-2 items-center"
							>
								<Input
									value={item.name}
									onChange={(e) => {
										const updated = [...form.orderItems];
										updated[idx] = { ...updated[idx], name: e.target.value };
										setForm({ ...form, orderItems: updated });
									}}
									placeholder="Item name"
								/>
								<Input
									value={item.type}
									onChange={(e) => {
										const updated = [...form.orderItems];
										updated[idx] = { ...updated[idx], type: e.target.value };
										setForm({ ...form, orderItems: updated });
									}}
									placeholder="Type"
								/>
								<Input
									value={item.rating}
									onChange={(e) => {
										const updated = [...form.orderItems];
										updated[idx] = { ...updated[idx], rating: e.target.value };
										setForm({ ...form, orderItems: updated });
									}}
									placeholder="Rating"
								/>
								<Button
									size="icon"
									variant="ghost"
									onClick={() => {
										setForm({
											...form,
											orderItems: form.orderItems.filter((_, i) => i !== idx),
										});
									}}
								>
									✕
								</Button>
							</div>
						))}
						<Button
							size="sm"
							variant="outline"
							onClick={() =>
								setForm({
									...form,
									orderItems: [
										...form.orderItems,
										{ id: crypto.randomUUID(), name: '', type: '', rating: '' },
									],
								})
							}
						>
							+ Add Item
						</Button>
					</div>
					<div className="flex gap-2">
						<Button size="sm" onClick={handleSave}>
							Save
						</Button>
						<Button
							size="sm"
							variant="outline"
							onClick={() => setIsEditing(false)}
						>
							Cancel
						</Button>
					</div>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className="rounded-2xl shadow-sm">
			<CardHeader className="flex justify-between items-center">
				<div>
					<CardTitle className="flex justify-between items-center">
						<span className="truncate">{review.restaurant}</span>
						{/* <Badge variant="secondary">{r.rating} 🍴</Badge> */}
						<Badge variant="secondary">{review.rating} <ForkIcon filled={true}/></Badge>
					</CardTitle>
					<CardDescription>{review.rating} forks</CardDescription>
				</div>
				<div className="flex gap-2">
					<Button
						variant="ghost"
						size="icon"
						onClick={() => setIsEditing(true)}
					>
						<Pencil className="w-4 h-4" />
					</Button>
					<Button variant="ghost" size="icon" onClick={onDelete}>
						<Trash className="w-4 h-4" />
					</Button>
				</div>
			</CardHeader>
			<CardContent>
				<p className="text-sm text-muted-foreground">{review.reviewText}</p>
				{review.orderItems && review.orderItems.length > 0 && (
					<div className="border-t pt-3">
						<h4 className="font-medium text-sm mb-2">Order Items</h4>
						<ul className="space-y-1">
							{review.orderItems.map((item: OrderItem) => (
								<li
									key={item.id}
									className="flex items-center justify-between rounded-md bg-muted px-3 py-2"
								>
									<span className="font-medium">{item.name}</span>
									<span className="text-xs text-muted-foreground">
										{item.rating}
									</span>
								</li>
							))}
						</ul>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
