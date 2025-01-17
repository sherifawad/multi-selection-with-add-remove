"use client";

import { useEffect, useState } from "react";

export default function useCurrentUrl() {
	const [url, setUrl] = useState<Location>();

	useEffect(() => {
		setUrl(window.location);
	}, []);

	return url;
}
