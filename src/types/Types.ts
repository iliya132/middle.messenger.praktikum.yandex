export interface IInputParams {
    type: string;
    id: string;
    name: string;
    placeholder: string;
    title: string;
    className: string;
    autocomplete?: string;
}

export interface IScript {
    source: string;
    type: string;
}

export interface ILayout {
    title: string;
    body: string;
    scripts: IScript[];
}

export interface IInputWithLabelParams {
    inputType: string;
    Id: string;
    placeHolder: string;
    className: string;
    autocomplete?: string;
}

export interface IEditProfileProps extends IProps {
    avatar: string;
    firstName: string;
    secondName: string;
    displayName: string;
    login: string;
    email: string;
    phone: string;
    oldPassword: string;
    newPassword: string;
}

export interface IProps {
    error: string;
}

export interface LoginProps extends IProps {
    login: string;
    password: string;
    isSignedIn: boolean;
}

export interface SignupProps extends IProps {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
    isSignedIn: boolean;
}

export interface IInputGroupParams {
    input: IInputParams[];
}

export enum AccountEvents {
    Logout = 'LOGOUT',
    Login = 'LOGIN',
    SignUp = 'SIGNUP'
}

export interface contextMenuProps {
    options: contextMenuOption[]
}

export interface contextMenuOption {
    name: string;
    id: string;
}

export interface IChatPanelProps extends IProps {
    title: string;
    avatar: string;
    lastMsg: string;
    id: number;
}

export enum MessageType {
    Incoming = 'message incoming',
    Outgoing = 'message outgoing',
    Dividor = 'dividor'
}

export interface IMessage {
    content: string;
    createdAt: Date;
    type: MessageType;
}

export interface IMessagesProps extends IProps {
    messages: IMessage[];
}

export interface IUserPanelProps extends IProps {
    userName: string;
    avatarSrc: string;
    showMore: boolean;
    showMoreSrc: string;
}

export enum StoreEvents {
    changed = 'CHANGED'
}

export default interface IUser {
    id:number;
    firstName: string;
    secondName: string;
    displayName: string;
    login: string;
    email: string;
    password: string;
    phone: string;
    avatar: string;
}

export interface IChat {
    id: number,
    title: string,
    avatar: string,
    created_by: number,
    unread_count: number,
    last_message: IMessage
}

export interface changeProfileRequest {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
}

export interface IToken {
    token: string
}
