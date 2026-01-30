'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

interface ForkRatingProps {
	forks: number;
	setForks: (value: number) => void;
}

const MAX_FORKS = 5;

const phrases: Record<number, string[]> = {
	1: [
		'Edible? Technically',
		'Straight to the sink',
		'One and done',
		'The napkins were the highlight',
		"Should've stayed hungry",
		'\*Building 7 song plays in the background\*',
		'Sent to the Broken Plate Club',
		'Forks down'
	],
	2: [
		'That\s a no from the Spoonman',
		'Almost food',
		'Like leftovers of leftovers',
		'Unga patchka',
		'Still better than subway',
	],
	3: [
		'Mediocre never tasted so okay',
		'Gets the job done',
		'Servicable at best',
		'A simulacrum of a good meal',
		'Acceptable execution',
		'Mr. Slice shrugs',
		'The definition of \'fine\''
	],
	4: [
		'Certified Golden Plate Club',
		"Chef's kiss",
		'Bite of the night',
		'Burger Boy approved',
		'Something of a Heatseeker',
		'Wow',
	],
	5: [
		'WOW PLATINUM!',
		'This place hits!',
		'Legendary bite!',
		'Peak forkdom achieved!',
		'Spoonman delivers WOW PLATINUM!',
		'WOW!',
		'Burger Boy ascends',
		'Straight to the Platinum Plate Club WOW!',
		'An all-timer!'
	],
};

export function ForkRating({ forks, setForks }: ForkRatingProps) {
	const [hover, setHover] = useState(0);
	const [message, setMessage] = useState<string | null>(null);

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

	const handleSetForks = (value: number) => {
		setForks(value);

		const options = phrases[value];
		if (options) {
			const randomPhrase = options[Math.floor(Math.random() * options.length)];
			setMessage(randomPhrase);

			setTimeout(() => setMessage(null), 3000);
		}
	};

	return (
		<div className="flex items-center space-x-2 select-none mt-2 relative">
			<div className="flex space-x-1 select-none">
				{[...Array(MAX_FORKS)].map((_, i) => {
					const index = i + 1;
					const filled = hover ? index <= hover : index <= forks;

					return (
						<div
							key={index}
							onClick={() => handleSetForks(index)}
							onMouseEnter={() => setHover(index)}
							onMouseLeave={() => setHover(0)}
							aria-label={`${index} forks`}
							role="button"
							tabIndex={0}
							onKeyDown={(e) => {
								if (e.key === 'Enter' || e.key === ' ') {
									handleSetForks(index);
								}
							}}
						>
							<ForkIcon filled={filled} />
						</div>
					);
				})}
			</div>

			<AnimatePresence>
				{message && (
					<motion.div
						key={message}
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.3 }}
						className="bg-white px-3 py-1 rounded-xl shadow-md text-sm text-gray-800"
					>
						{message}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
