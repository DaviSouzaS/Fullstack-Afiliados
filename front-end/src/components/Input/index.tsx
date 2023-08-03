import { iInput } from "./types";

export const Input = ({children, placeHolder, defaultValue, id, css, inputCSS, register, type, step, value}: iInput): JSX.Element => {
    return (
        <section className={`${css} flex flex-col`}>
            <label htmlFor={id}>{children}</label>
            <input value={value}
                className={inputCSS}
                id={id}
                placeholder={placeHolder}
                defaultValue={defaultValue}
                type={type}
                step={step}
                {...register}
            />
        </section>
    ); 
}