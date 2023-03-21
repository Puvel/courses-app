export const authorGenerator = (authors, courseAuthors) => {
	return courseAuthors
		.map((courseAuthor) => authors.find(({ id }) => courseAuthor === id)?.name)
		.join(', ');
};
