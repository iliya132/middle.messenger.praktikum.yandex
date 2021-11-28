import { templateCompiled } from "./newMessage.hbs";
import Block, { BlockEvents } from "../../utils/block";
import InputValidator from "../../utils/inputValidator";
import { FormEvents } from "../../utils/constants";

export class NewMessage extends Block<object> {
    constructor(root: HTMLElement) {
        super({}, root);
        this.eventBus().on(BlockEvents.FLOW_RENDER, this._addEvents);
        this._addEvents();
    }

    render() {
        let newDiv = document.createElement("div");
        newDiv.innerHTML = templateCompiled(this.props).trim();
        this.element.appendChild(newDiv.firstChild);
    }

    private _addEvents(){
        let input = this.element.querySelector("#message") as HTMLInputElement;
        let sendBtn = this.element.querySelector("#send-new-message-btn") as HTMLButtonElement;
        sendBtn.addEventListener("click", (event)=>{
            if(input.value){
                this.eventBus().emit(FormEvents.Submit, input.value);
                input.value = "";
            }
        });

    }
}
