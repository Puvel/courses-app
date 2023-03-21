import { toast } from 'react-toastify';

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
