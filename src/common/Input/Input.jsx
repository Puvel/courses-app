import style from './input.module.css';

export const Input = ({
	isArea = false,
	labelId = '',
	labelText = '',
	hideLabel = false,
	...otherProps
}) => (
	<>
		<label
			className={hideLabel ? style.hide_label : style.label}
			htmlFor={labelId}
		>
			{labelText}
		</label>
		{!isArea ? (
			<input className={style.input} {...otherProps} />
		) : (
			<textarea className={style.textArea} {...otherProps} />
		)}
	</>
);
