export interface IInputParams{
    type:string;
    id: string;
    name: string;
    placeholder:string;
    title:string;
    className:string;
}
export interface IInputGroupParams{
    input: IInputParams[];
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
}

export interface IEditProfileProps{
    imgUrl:string;
    colOneInputs: IInputParams[];
    colTwoInputs: IInputParams[];
}