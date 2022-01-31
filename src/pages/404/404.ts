import { IProps } from "../../types/Types";
import Block from "../../utils/block";
import { RootState } from "../../utils/store";
import template from './404.handlebars';
import { catSrc } from "../../utils/images";

export class NotFoundPage extends Block<IProps>{
    
    stateToProps: (state: RootState) => IProps;
    render(): void {
        const el = this.getElement();
        if (el){
            el.innerHTML = template;
            document.getElementById('image')?.setAttribute('src', catSrc);
        }

        document.title = 'Page not found'
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public fetchData(): void {}
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    protected componentDidMount(): void { }

}
