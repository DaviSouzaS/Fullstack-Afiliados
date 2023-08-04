export interface iModal {
    title: string,
    children: JSX.Element,
    style: string,
    OpenOrClose: () => void,
    headerStyle?: string
}