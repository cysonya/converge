export const FETCH_EVENTS = "FETCH_EVENTS"

// Triggers fetch-event saga to fetch events data from api
export function fetchEvents() {
	return { type: FETCH_EVENTS }
}
