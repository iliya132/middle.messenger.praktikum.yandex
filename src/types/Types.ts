export interface IInputParams{
    type:string;
    id: string;
    name: string;
    placeholder:string;
    title:string;
    className:string;
    autocomplete?:string;
}

export interface IScript{
    source:string;
    type:string;
}

export interface ILayout{
    title:string;
    body:string;
    scripts: IScript[];
}

export interface IInputWithLabelParams{
    inputType:string;
    Id:string;
    placeHolder: string;
    className:string;
    autocomplete?:string;
}

export interface IEditProfileProps{
    imgUrl:string;
    colOneInputs: IInputParams[];
    colTwoInputs: IInputParams[];
}

export interface IBlockMetadata{
    props: object;
}

export interface IInputGroupParams {
    input: IInputParams[];
}

export enum AccountEvents{
    Logout = 'LOGOUT',
    Login = 'LOGIN',
    SignUp = 'SIGNUP'
}

export interface contextMenuProps{
    options: contextMenuOption[]
}

export interface contextMenuOption{
    name:string;
    id:string;
}
