"use client";

import * as React from "react";
import { CheckIcon, ClipboardIcon } from "lucide-react";

import { Tabs } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { copyToClipboardWithMeta } from "./copy-button";
import { NpmCommands } from "@/types";

type PackageManager = "pnpm" | "npm" | "yarn" | "bun";

export function CodeBlockCommand({
	__npmCommand__,
	__yarnCommand__,
	__pnpmCommand__,
	__bunCommand__,
}: React.ComponentProps<"pre"> & NpmCommands) {
	const [hasCopied, setHasCopied] = React.useState(false);
	const [packageManager, setPackageManager] = React.useState<PackageManager>("pnpm");

	React.useEffect(() => {
		if (hasCopied) {
			const timer = setTimeout(() => setHasCopied(false), 2000);
			return () => clearTimeout(timer);
		}
	}, [hasCopied]);

	const tabs = React.useMemo(() => {
		return {
			pnpm: __pnpmCommand__,
			npm: __npmCommand__,
			yarn: __yarnCommand__,
			bun: __bunCommand__,
		};
	}, [__npmCommand__, __pnpmCommand__, __yarnCommand__, __bunCommand__]);

	const copyCommand = React.useCallback(() => {
		const command = tabs[packageManager];

		if (!command) {
			return;
		}

		copyToClipboardWithMeta(command);
		setHasCopied(true);
	}, [packageManager, tabs]);

	return (
		<div className="relative mt-6 max-h-[650px] rounded-xl bg-zinc-950 dark:bg-zinc-900">
			<Tabs
				defaultValue={packageManager}
				onValueChange={(value) => {
					setPackageManager(value as PackageManager);
				}}
			>
				<div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-3 pt-2.5">
					<TabsList className="h-7 translate-y-[2px] gap-3 bg-transparent p-0 pl-1 ">
						{Object.entries(tabs).map(([key, value]) => {
							return (
								<TabsTrigger
									key={key}
									value={key}
									className="rounded-none border-b border-transparent bg-transparent p-0 pb-1.5 font-mono text-zinc-400 data-[state=active]:border-b-zinc-50 data-[state=active]:bg-transparent data-[state=active]:text-zinc-50"
								>
									{key}
								</TabsTrigger>
							);
						})}
					</TabsList>
				</div>
				{Object.entries(tabs).map(([key, value]) => {
					return (
						<TabsContent key={key} value={key} className="mt-0 max-w-md overflow-x-auto ">
							<pre className="px-4 py-5">
								<code
									className="relative font-mono text-sm dark:text-foreground text-background leading-none pe-4"
									data-language="bash"
								>
									{value}
								</code>
							</pre>
						</TabsContent>
					);
				})}
			</Tabs>
			<Button
				size="icon"
				variant="ghost"
				className="absolute right-2.5 top-2 z-10 h-6 w-6 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50 [&_svg]:h-3 [&_svg]:w-3"
				onClick={copyCommand}
			>
				<span className="sr-only">Copy</span>
				{hasCopied ? <CheckIcon /> : <ClipboardIcon />}
			</Button>
		</div>
	);
}
