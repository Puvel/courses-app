export const dateСonversion = (value, separator = '.') => {
	const date = new Date(value);
	return [
		String(date.getDate()).padStart(2, '0'),
		String(+date.getMonth() + 1).padStart(2, '0'),
		date.getFullYear(),
	].join(separator);
};

export const dateGenerator = (value, separator = '.') => {
	const date = new Date(value);
	return (
		+date.getMonth() +
		1 +
		separator +
		date.getDate() +
		separator +
		date.getFullYear()
	);
};
