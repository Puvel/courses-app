export const dateСonversion = (value, separator = '.') => {
	const date = value.split('/');
	return [date[0].padStart(2, '0'), date[1].padStart(2, '0'), date[2]].join(
		separator
	);
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
