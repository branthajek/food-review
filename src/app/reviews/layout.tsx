import { Nav } from "../components/Nav";

export default function ReviewsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<header>
				<Nav></Nav>
			</header>
			<main className="max-w-4xl mx-auto p-6 space-y-6">{children}</main>
		</>
	);
}