import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';

import { Header } from '../Header';
import { testRender } from 'helpers';

test("Header should have logo and user's name", () => {
	testRender(<Header />);

	expect(screen.getByText('Test Name')).toBeInTheDocument();
	expect(screen.getByAltText('Courses Logo')).toBeInTheDocument();
});
