import { v4 as uIdv4 } from 'uuid';

export const INPUT_TITLE_ID = uIdv4();
export const INPUT_DESCRIPTION_ID = uIdv4();
export const INPUT_DURATION_ID = uIdv4();
export const INPUT_AUTHOR_ID = uIdv4();
export const INPUT_NAME_ID = uIdv4();
export const INPUT_EMAIL_ID = uIdv4();
export const INPUT_PASSWORD_ID = uIdv4();

export const LOGIN_PATH = 'login';
export const REGISTRATION_PATH = 'registration';
export const COURSES_PATH = 'courses';
export const CREATE_COURSE_PATH = 'courses/add';
export const COURSE_PATH = ':courseId';

export const mockedCoursesList = [
	{
		id: 'de5aaa59-90f5-4dbc-b8a9-aaf205c551ba',
		title: 'JavaScript',
		description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`,
		creationDate: '8/3/2021',
		duration: 160,
		authors: [
			'27cc3006-e93a-4748-8ca8-73d06aa93b6d',
			'f762978b-61eb-4096-812b-ebde22838167',
		],
	},
	{
		id: 'b5630fdd-7bf7-4d39-b75a-2b5906fd0916',
		title: 'Angular',
		description: `Lorem Ipsum is simply dummy text of the printing and
typesetting industry. Lorem Ipsum 
 has been the industry's standard dummy text ever since the
1500s, when an unknown 
 printer took a galley of type and scrambled it to make a type
specimen book.`,
		creationDate: '10/11/2020',
		duration: 210,
		authors: [
			'df32994e-b23d-497c-9e4d-84e4dc02882f',
			'095a1817-d45b-4ed7-9cf7-b2417bcbf748',
		],
	},
];

export const mockedAuthorsList = [
	{
		id: '27cc3006-e93a-4748-8ca8-73d06aa93b6d',
		name: 'Vasiliy Dobkin',
	},
	{
		id: 'f762978b-61eb-4096-812b-ebde22838167',
		name: 'Nicolas Kim',
	},
	{
		id: 'df32994e-b23d-497c-9e4d-84e4dc02882f',
		name: 'Anna Sidorenko',
	},
	{
		id: '095a1817-d45b-4ed7-9cf7-b2417bcbf748',
		name: 'Valentina Larina',
	},
];

// eslint-disable-next-line no-useless-escape
export const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;

export const emailValidationText = 'is not a valid email address';
export const passwordValidationText =
	'Password should least 6 characters long, contains least one lowercase letter, one uppercase letter and one number.';
