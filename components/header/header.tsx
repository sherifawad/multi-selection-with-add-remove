import HeaderGithub from "./header-github";
import { HeaderThemeToggle } from "./header-theme-toggle";

export default function Header() {
	return (
		<div className="flex items-center justify-between p-2 w-full border-b">
			<div>
				<h1 className="text-lg font-bold">
					React, Tailwind and Shadcn MultiSelection With Add Remove Buttons and highlighter
				</h1>
				<h3 className="text-muted-foreground">
					By <span className="font-bold">@sherifawad</span>
				</h3>
			</div>
			<div className="flex items-center gap-2">
				<HeaderGithub />
				<HeaderThemeToggle />
			</div>
		</div>
	);
}
