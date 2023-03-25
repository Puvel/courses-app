import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Input } from 'common/Input/Input';
import { Button } from 'common/Button/Button';
import { validationAuthForm } from 'helpers/fieldsValidation';
import { fetchLogin } from 'helpers/fetchApi';
import { Context } from 'context/context';
import { INPUT_EMAIL_ID, REGISTRATION_PATH, COURSES_PATH } from 'constants';

import style from './login.module.css';

export const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPass, setShowPass] = useState(false);
	const { setUser, setIsLoggedIn, setIsLoading } = useContext(Context);

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		const isValid = validationAuthForm({ [INPUT_EMAIL_ID]: email });
		if (isValid) {
			const user = await fetchLogin({ email, password });
			if (user) {
				navigate(`/${COURSES_PATH}`);
				setUser(user);
				setIsLoggedIn(true);
			}
		}
		setIsLoading(false);
	};

	return (
		<form onSubmit={handleSubmit} className={style.loginForm}>
			<h3 className={style.loginTitle}>Login</h3>
			<div className={style.loginFormInput}>
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
				className={[style.loginFormInput, style.loginFormPassword].join(' ')}
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
			<Button type='submit'>Login</Button>
			<p className={style.loginRedirect}>
				<span className={style.loginRedirectText}>
					If you not have an account you can
				</span>
				<Link to={`/${REGISTRATION_PATH}`}>Registration</Link>
			</p>
		</form>
	);
};
