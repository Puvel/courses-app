import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Input } from 'common/Input/Input';
import { Button } from 'common/Button/Button';
import { validationAuthForm } from 'helpers/fieldsValidation';
import { registrationThunk } from 'store/user/thunk';
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
	const dispatch = useDispatch();

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const isValid = validationAuthForm({
			[INPUT_NAME_ID]: name,
			[INPUT_EMAIL_ID]: email,
			[INPUT_PASSWORD_ID]: password,
		});
		if (isValid) {
			dispatch(registrationThunk({ name, email, password }));
			navigate(`/${LOGIN_PATH}`);
		}
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
					onChange={({ target: { value } }) => setName(value)}
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
					onChange={({ target: { value } }) => setEmail(value)}
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
					onChange={({ target: { value } }) => setPassword(value)}
				/>

				<button
					onClick={() => setShowPass(!showPass)}
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
