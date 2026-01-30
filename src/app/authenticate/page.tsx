"use client";

import { Button } from "@/components/ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthPage() {
	const { data: session, status } = useSession();

	if (status === 'loading') {
		return <p className="text-center text-sm text-gray-500">Loading...</p>;
	}

	return (
		<div className="flex items-center justify-center min-h-[80vh]">
			<Card className="w-full max-w-sm">
				<CardHeader>
					<CardTitle className="text-center">
						{session ? 'Welcome back!' : 'Sign in'}
					</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col space-y-4">
					{session ? (
						<>
							<p className="text-center text-sm">
								Signed in as{' '}
								<span className="font-medium">{session.user?.email}</span>
							</p>
							<Button onClick={() => signOut()} variant="destructive">
								Sign out
							</Button>
						</>
					) : (
						<>
							<Button onClick={() => signIn('google')} variant="default">
								Continue with Google
							</Button>
							<Button onClick={() => signIn('credentials')} variant="outline">
								Continue with Email
							</Button>
						</>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
  