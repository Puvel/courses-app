export const pipeDuration = (duration) => {
	const hours = String(parseInt(duration / 60)).padStart(2, '0');
	const minutes = String(duration % 60).padStart(2, '0');
	return `${hours}:${minutes}`;
};
