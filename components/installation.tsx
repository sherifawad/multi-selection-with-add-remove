"use client";

import useCurrentUrl from "@/hooks/useCurrentUrl";
import { CodeBlockCommand } from "./code-block-command";

const fixedCommands = ["add react-highlight-words", "add -D @types/react-highlight-words"];

export default function Installation() {
	const baseUrl = useCurrentUrl();
	const bunCommands = [
		`bunx --bun shadcn@latest add ${baseUrl}multi-selection`,
		"bun add react-highlight-words",
		"bun add -D @types/react-highlight-words",
	];
	const npmCommands = [
		`npx shadcn@latest add ${baseUrl}multi-selection`,
		"npm install react-highlight-words",
		"npm install -D @types/react-highlight-words",
	];
	const yarnCommands = [
		`npx shadcn@latest add ${baseUrl}multi-selection`,
		"yarn add react-highlight-words",
		"yarn add -D @types/react-highlight-words",
	];
	const pnpmCommands = [
		`pnpm dlx shadcn@latest add ${baseUrl}multi-selection`,
		"pnpm add react-highlight-words",
		"pnpm add -D @types/react-highlight-words",
	];

	return (
		<div className="max-w-2xl px-8">
			<CodeBlockCommand
				__bunCommand__={bunCommands}
				__npmCommand__={npmCommands}
				__yarnCommand__={yarnCommands}
				__pnpmCommand__={pnpmCommands}
			/>
		</div>
	);
}
