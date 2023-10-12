import React from "react";

import { matchSorter } from "match-sorter";
import { useThrottle } from "./useThrottle";

const players = [{date:"27-11-2023"},{date:"13-10-2023"},{date:"14-11-2023"}]

export function useDateMatch(term){
	let throttledTerm = useThrottle(term, 100);
	return React.useMemo(
		() =>
			term.trim() === ""
				? players
				:matchSorter(players, term, {
						keys: ['name'],
				  }),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[throttledTerm]
	);
}