import { IProps } from '../types/Types';
import Block from './block';

export default class Route<TProps extends IProps> {
  private pathName:string;

  private block : () => Block<TProps>;

  private curentBlock : Block<TProps>;

  constructor(pathName:string, view: () => Block<TProps>) {
    this.pathName = pathName;
    this.block = view;
  }

  isMatch(pathName: string) {
    return pathName === this.pathName;
  }

  render() {
    this.curentBlock = this.block();
    if (this.curentBlock) {
      this.curentBlock.fetchData();
      this.curentBlock.render();
      this.curentBlock.show();
    }
  }

  leave() {
    if (this.curentBlock) {
      this.curentBlock.hide();
    }
  }
}
