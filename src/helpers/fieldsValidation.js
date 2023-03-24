import { toast } from 'react-toastify';
import {
	INPUT_NAME_ID,
	INPUT_EMAIL_ID,
	INPUT_PASSWORD_ID,
	emailRegExp,
	passwordRegExp,
	emailValidationText,
	passwordValidationText,
} from 'constants';

export const fieldsValidation = (fields) => {
	for (const field in fields) {
		if (Object.hasOwnProperty.call(fields, field)) {
			const el = fields[field];
			if (el.length === 0) {
				alert('Please, fill in all fields!');
				return false;
			}
			if (!Array.isArray(el) && isNaN(el) && el.length < 2) {
				toast.warn(`${field} length should be at least 2 characters!`);
				return false;
			}
			if (!isNaN(el) && Number(el) === 0) {
				toast.warn(`${field} should be more than 0 minute!`);
				return false;
			}
		}
	}
	return true;
};

export const validationAuthForm = (fields) => {
	for (const field in fields) {
		if (field === INPUT_NAME_ID && fields[field].length < 2) {
			toast.warn(`Name length should be at least 2 characters!`);
			return false;
		}

		if (field === INPUT_EMAIL_ID && !emailRegExp.test(fields[field])) {
			toast.warn(`${fields[field]} ${emailValidationText}`);
			return false;
		}

		if (field === INPUT_PASSWORD_ID && !passwordRegExp.test(fields[field])) {
			toast.warn(passwordValidationText);
			return false;
		}
	}
	return true;
};
