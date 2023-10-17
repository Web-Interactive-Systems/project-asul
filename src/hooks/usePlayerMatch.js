import React from "react";

import { matchSorter } from "match-sorter";
import { useThrottle } from "./useThrottle";

const players = [{name:"Toto"},{name:"Foo"},{name:"Bar"}]

export function usePlayerMatch(term){
	let throttledTerm = useThrottle(term, 100);
	return React.useMemo(
		() =>
			term.trim() === ""
				? players
				: matchSorter(players, term, {
						keys: ['name'],
				  }),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[throttledTerm]
	);
}