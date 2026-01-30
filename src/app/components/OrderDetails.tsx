'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Plus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { OrderItem } from '@/types/review';

interface OrderDetailsProps {
	orderItems: Array<OrderItem>;
	setItems: React.Dispatch<React.SetStateAction<Array<OrderItem>>>;
}

export default function OrderDetails({
	orderItems: items,
	setItems,
}: OrderDetailsProps) {
	const addItem = () => {
		const newItem: OrderItem = {
			id: crypto.randomUUID(),
			name: '',
			type: '',
			rating: '',
		};
		setItems([...items, newItem]);
	};

	const updateItem = (id: string, updated: Partial<OrderItem>) => {
		setItems((prev) =>
			prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
		);
	};

	const removeItem = (id: string) => {
		setItems((prev) => prev.filter((item) => item.id !== id));
	};

	return (
		<section>
			<h3 className="text-2xl">Order details</h3>
			<p className="text-md text-muted-foreground mt-2">What did you get?</p>

			<motion.div
				layout
				className="mt-4 space-y-4"
				transition={{ layout: { duration: 0.25, ease: 'easeInOut' } }}
			>
				<AnimatePresence>
					{[...items].reverse().map((item) => (
						<motion.div
							key={item.id}
							layout
							initial={{ opacity: 0, y: 8 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -8 }}
							transition={{ duration: 0.2 }}
							className="border p-4 rounded-lg space-y-4 relative shadow-sm"
						>
							<button
								type="button"
								onClick={() => removeItem(item.id)}
								aria-label="Remove order item"
								className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
							>
								<Trash2 className="h-4 w-4" aria-hidden="true" />
							</button>

							<div>
								<Label htmlFor={`item-name-${item.id}`}>Item name</Label>
								<Input
									className="mt-2"
									id={`item-name-${item.id}`}
									value={item.name}
									onChange={(e) =>
										updateItem(item.id, { name: e.target.value })
									}
									placeholder="e.g. Cheeseburger"
								/>
							</div>

							<div>
								<Label>Type</Label>
								<RadioGroup
									value={item.type}
									onValueChange={(val) =>
										updateItem(item.id, { type: val as 'food' | 'drink' })
									}
									className="flex space-x-4 mt-2"
								>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="food" id={`food-${item.id}`} />
										<Label htmlFor={`food-${item.id}`}>Food</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="drink" id={`drink-${item.id}`} />
										<Label htmlFor={`drink-${item.id}`}>Drink</Label>
									</div>
								</RadioGroup>
							</div>
							{item.type && (
								<div>
									<Label>Rating</Label>
									<RadioGroup
										value={item.rating}
										onValueChange={(val) =>
											updateItem(item.id, {
												rating: val as OrderItem['rating'],
											})
										}
										className="flex space-x-4 mt-2"
									>
										{item.type === 'food' ? (
											<>
												<div className="flex items-center space-x-2">
													<RadioGroupItem
														value="snack"
														id={`snack-${item.id}`}
													/>
													<Label htmlFor={`snack-${item.id}`}>Snack</Label>
												</div>
												<div className="flex items-center space-x-2">
													<RadioGroupItem value="wack" id={`wack-${item.id}`} />
													<Label htmlFor={`wack-${item.id}`}>Wack</Label>
												</div>
											</>
										) : (
											<>
												<div className="flex items-center space-x-2">
													<RadioGroupItem
														value="drank"
														id={`drank-${item.id}`}
													/>
													<Label htmlFor={`drank-${item.id}`}>Drank</Label>
												</div>
												<div className="flex items-center space-x-2">
													<RadioGroupItem
														value="stank"
														id={`stank-${item.id}`}
													/>
													<Label htmlFor={`stank-${item.id}`}>Stank</Label>
												</div>
											</>
										)}
									</RadioGroup>
								</div>
							)}
						</motion.div>
					))}

					<motion.div
						key="add-button"
						layout
						initial={{ opacity: 0, y: 8 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -8 }}
						transition={{ duration: 0.25, ease: 'easeOut' }}
						className="flex justify-start"
					>
						<Button type="button" onClick={addItem} variant="outline">
							<Plus className="h-4 w-4 mr-2 self-center" aria-hidden="true" />
							Add Item
						</Button>
					</motion.div>
				</AnimatePresence>
			</motion.div>
		</section>
	);
}
