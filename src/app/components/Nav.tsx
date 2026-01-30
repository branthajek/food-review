"use client";

import { Button } from '@/components/ui';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@radix-ui/react-navigation-menu';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
const links = [
	{ href: '/add-review', label: 'Add Review' },
	{ href: '/reviews', label: 'Reviews' },
	{ href: '/authenticate', label: 'Login' },
];

export function Nav() {
	const pathname = usePathname();

	const isActive = (href: string) =>
		pathname === href || pathname?.startsWith(`${href}/`);

	return (
		<nav aria-label="Main navigation" className="border-b bg-background">
			<div className="container flex items-center justify-between py-3 w-full">
				<div className="font-bold text-lg tracking-tight ml-4">
					<Link href={'/add-review'}>
						Broken Plates: An App About Restaurants
					</Link>
				</div>

				<div className="hidden md:block">
					<NavigationMenu>
						<NavigationMenuList className="flex">
							{links.map(({ href, label }) => {
								const active = isActive(href);
								return (
									<NavigationMenuItem key={href}>
										<NavigationMenuLink asChild>
											<Link
												href={href}
												aria-current={active ? 'page' : undefined}
												className={cn(
													'px-3 py-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
													active
														? 'bg-accent text-accent-foreground'
														: 'hover:bg-accent hover:text-accent-foreground'
												)}
											>
												{label}
											</Link>
										</NavigationMenuLink>
									</NavigationMenuItem>
								);
							})}
						</NavigationMenuList>
					</NavigationMenu>
				</div>

				<div className="md:hidden">
					<Sheet>
						<SheetTrigger className="mr-2" asChild>
							<Button variant="ghost" size="icon">
								<Menu className="h-6 w-6" />
							</Button>
						</SheetTrigger>
						<SheetContent side="right">
							<SheetHeader>
								<SheetTitle>Navigation</SheetTitle>
								<SheetDescription>
									This panel contains navigation links.
								</SheetDescription>
							</SheetHeader>
							<nav
								aria-label="Main navigation"
								aria-describedby=""
								className="flex flex-col space-y-4 mt-6"
							>
								{links.map(({ href, label }) => {
									const active = isActive(href);
									return (
										<Link
											key={href}
											href={href}
											aria-current={active ? 'page' : undefined}
											className={cn(
												'px-3 py-2 rounded-md text-base font-medium transition-colors',
												active
													? 'bg-accent text-accent-foreground'
													: 'hover:bg-accent hover:text-accent-foreground'
											)}
										>
											{label}
										</Link>
									);
								})}
							</nav>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</nav>
	);
}
