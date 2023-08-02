export interface iForm {
    children: React.ReactNode;
    onSubmit: React.FormEventHandler<HTMLFormElement>;
    inputCSS: string;
  }