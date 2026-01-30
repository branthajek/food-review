'use client';

import { ReviewsProvider } from '@/context/reviews-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SessionProvider } from 'next-auth/react';
import { Geist, Geist_Mono } from 'next/font/google';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

const queryClient = new QueryClient();

export default function ClientProviders({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
			<SessionProvider>
				<QueryClientProvider client={queryClient}>
					<ReviewsProvider>
						{children}
						<ReactQueryDevtools initialIsOpen={false} />
					</ReviewsProvider>
				</QueryClientProvider>
			</SessionProvider>
		</div>
	);
}
