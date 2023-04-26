import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const mockedState = {
	user: {
		isAuth: true,
		name: 'Test Name',
		role: '',
	},
	courses: [],
	authors: [],
};

export const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

export const testRender = (component, state = mockedState) => {
	mockedStore.getState = () => ({
		...mockedState,
		...state,
	});

	return render(
		<Provider store={mockedStore}>
			<BrowserRouter>{component}</BrowserRouter>
		</Provider>
	);
};
