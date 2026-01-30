import type { Metadata } from 'next';
import './globals.css';

import { ReactNode } from 'react';
import ClientProviders from './components/ClientProviders';

export const metadata: Metadata = {
	title: 'Broken Plates',
	description: 'An App About Chain Restaurants',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<html lang="en" className='dark'>
			<body>
				<ClientProviders>{children}</ClientProviders>
			</body>
		</html>
	);
}
