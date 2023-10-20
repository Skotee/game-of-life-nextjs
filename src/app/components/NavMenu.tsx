"use client";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const ACTIVE_ROUTE = "py-1 px-2 text-gray-300 bg-gray-700";
const INACTIVE_ROUTE =
	"py-1 px-2 text-gray-500 hover:text-gray-300 hover:bg-gray-700";

function AuthButton() {
	const { data: session } = useSession();

	if (session) {
		return (
			<>
				<br />
				{session?.user?.name} <br />
				<br />
				<button
					className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					onClick={() => signOut()}
				>
					Sign out
				</button>
			</>
		);
	}
	return (
		<>
			Not signed in <br />
			<button
				className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				onClick={() => signIn()}
			>
				Sign in
			</button>
		</>
	);
}

export default function NavMenu() {
	const pathname = usePathname();
	return (
		<div className="flex  flex-1 flex-col items-center justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<img
					className="mx-auto h-10 w-auto"
					src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
				/>
			</div>

			<AuthButton />
			<hr className="my-4" />
			<ul>
				<Link href="/">
					<li className={pathname === "/" ? ACTIVE_ROUTE : INACTIVE_ROUTE}>
						Home
					</li>
				</Link>
				<Link href="/protected">
					<li
						className={
							pathname === "/protected" ? ACTIVE_ROUTE : INACTIVE_ROUTE
						}
					>
						Protected route with AI Chatbot
					</li>
				</Link>
			</ul>
		</div>
	);
}
