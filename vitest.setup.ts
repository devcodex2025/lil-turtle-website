import '@testing-library/jest-dom';

// Simple matchMedia polyfill for jsdom/vitest tests.
Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: (query: string) => {
		const m = {
			media: query,
			matches: false,
			onchange: null as ((e: MediaQueryListEvent) => void) | null,
			listeners: new Set<Function>(),
			addEventListener(event: string, cb: Function) {
				if (event === 'change') this.listeners.add(cb);
			},
			removeEventListener(event: string, cb: Function) {
				if (event === 'change') this.listeners.delete(cb);
			},
			dispatch(matches: boolean) {
				this.matches = matches;
				const ev = { matches } as MediaQueryListEvent;
				this.listeners.forEach((cb: any) => cb(ev));
			}
		};

		// Initialize matches based on current window.innerWidth
		try {
			const mMatch = query.match(/(min-width:\s*)(\d+)px/);
			if (mMatch) {
				const val = Number(mMatch[2]);
				m.matches = window.innerWidth >= val;
			}
		} catch (e) { /* ignore */ }

		// Keep matches updated on window resize for tests
		const onResize = () => {
			try {
				const mMatch = query.match(/(min-width:\s*)(\d+)px/);
				if (mMatch) {
					const val = Number(mMatch[2]);
					m.dispatch(window.innerWidth >= val);
				}
			} catch (e) { /* ignore */ }
		};
		window.addEventListener('resize', onResize);
		return m as unknown as MediaQueryList;
	}
});
