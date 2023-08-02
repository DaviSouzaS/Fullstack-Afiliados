import { iForm } from "./types";

export const Form = ({ children, onSubmit, inputCSS }: iForm): JSX.Element => {
  return (
    <form onSubmit={onSubmit} className={inputCSS}>
      {children}
    </form>
  );
};