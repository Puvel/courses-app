import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Input } from 'common/Input/Input';
import { Button } from 'common/Button/Button';
import { validationAuthForm } from 'helpers/fieldsValidation';
import { fetchRegister } from 'helpers/fetchApi';
import { Context } from 'context/context';
import {
	INPUT_NAME_ID,
	INPUT_EMAIL_ID,
	INPUT_PASSWORD_ID,
	LOGIN_PATH,
} from 'constants';

import style from './registration.module.css';

export const Registration = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPass, setShowPass] = useState(false);
	const { setIsLoading } = useContext(Context);

	const navigate = useNavigate();

	const inputsStates = {
		[INPUT_NAME_ID]: setName,
		[INPUT_EMAIL_ID]: setEmail,
		[INPUT_PASSWORD_ID]: setPassword,
	};

	const handleChange = (ukey, { target: { value } }) =>
		inputsStates[ukey](value);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		const isValid = validationAuthForm({
			[INPUT_NAME_ID]: name,
			[INPUT_EMAIL_ID]: email,
			[INPUT_PASSWORD_ID]: password,
		});
		if (isValid) {
			const isSuccess = await fetchRegister({ name, email, password });
			if (isSuccess) {
				navigate(`/${LOGIN_PATH}`);
			}
		}
		setIsLoading(false);
	};

	return (
		<form onSubmit={handleSubmit} className={style.registrationForm}>
			<h3 className={style.registrationTitle}>Registration</h3>
			<div className={style.registrationFormInput}>
				<Input
					id='name'
					name='name'
					labelId='name'
					type='text'
					labelText='Name'
					placeholder='Enter name'
					value={name}
					onChange={(e) => handleChange(INPUT_NAME_ID, e)}
				/>
			</div>
			<div className={style.registrationFormInput}>
				<Input
					id='email'
					name='email'
					labelId='email'
					type='email'
					labelText='Email'
					placeholder='Enter email'
					value={email}
					onChange={(e) => handleChange(INPUT_EMAIL_ID, e)}
				/>
			</div>
			<div
				className={[
					style.registrationFormInput,
					style.registrationFormPassword,
				].join(' ')}
			>
				<Input
					id='password'
					name='password'
					labelId='password'
					type={!showPass ? 'password' : 'text'}
					labelText='Password'
					placeholder='Enter password'
					value={password}
					onChange={(e) => handleChange(INPUT_PASSWORD_ID, e)}
				/>

				<button
					onClick={() => setShowPass((prevState) => !prevState)}
					className={style.showPassBtn}
					type='button'
				></button>
			</div>
			<Button type='submit'>Registration</Button>
			<p className={style.registrationRedirect}>
				<span className={style.registrationRedirectText}>
					If you have an account you can
				</span>
				<Link to={`/${LOGIN_PATH}`}>Login</Link>
			</p>
		</form>
	);
};
