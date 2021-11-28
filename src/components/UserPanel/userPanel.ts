import { ChatWindowEvents } from '../../pages/chatsPage/Chats';
import Block, { BlockEvents } from '../../utils/block';
import { templateCompiled } from './userPanel.hbs';

export interface IUserPanelProps {
    userName: string;
    avatarSrc: string;
    showMore: boolean;
    showMoreSrc:string;
}

export class UserPanel extends Block<IUserPanelProps> {
    constructor(root:HTMLElement, props: IUserPanelProps) {
        super(props, root);
        this.eventBus().on(BlockEvents.FLOW_RENDER,()=>this._addEvents());
        this._addEvents();
    }

    render() {
        console.debug('rendering userPanel');
        let newDiv = document.createElement("div");
        newDiv.innerHTML = templateCompiled(this.props).trim();
        this.element.appendChild(newDiv.firstChild);
    }

    _addEvents(){
        let editProfileBtn = this.element.querySelector("#editProfile") as HTMLImageElement;
        if(editProfileBtn){
            editProfileBtn.addEventListener("click", ()=>{
                this.eventBus().emit(ChatWindowEvents.userSettingsClick);
            })
        }
    }
}