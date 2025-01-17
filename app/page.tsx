"use client";

import { useState } from "react";
import { MultiSelection } from "@/components/ui/multi-selection";

const options = [
	{ label: "Apple", value: "apple" },
	{ label: "Banana", value: "banana" },
	{ label: "Cherry", value: "cherry" },
	{ label: "Date", value: "date" },
	{ label: "Elderberry", value: "elderberry" },
];

export default function Home() {
	const [selectedFruits, setSelectedFruits] = useState<string[] | undefined>([]);

	return (
		<main className="flex  flex-col items-center justify-center gap-8 p-24">
			<div className="w-full max-w-md space-y-4">
				<h1 className="text-2xl font-bold">Fruit Selector</h1>
				<MultiSelection options={options} value={selectedFruits} onValueSelected={setSelectedFruits} />
				<div>
					<h2 className="text-lg font-semibold">Selected Fruits:</h2>
					<ul>
						{selectedFruits?.map((fruit) => (
							<li key={fruit}>{options.find((option) => option.value === fruit)?.label}</li>
						))}
					</ul>
				</div>
			</div>
		</main>
	);
}
