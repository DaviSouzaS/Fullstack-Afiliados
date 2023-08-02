import { iButton } from "./types";

export const Button = ({ onClick, css, children, type }: iButton): JSX.Element => {
    return (
        <button onClick={onClick} className={css} type={type}>
            {children}
        </button>
    );
};