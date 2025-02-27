"use client";

import { Github } from "lucide-react";
import { Button } from "../ui/button";

export default function HeaderGithub() {
	return (
		<Button
			variant="outline"
			size="icon"
			onClick={() => window.open("https://github.com/sherifawad/multi-selection-with-add-remove", "_blank")}
		>
			<Github />
		</Button>
	);
}
