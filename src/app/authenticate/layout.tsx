export default function AddReviewLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <main className="max-w-xl mx-auto p-6 space-y-6">{children}</main>;
}