/* eslint-disable @typescript-eslint/no-empty-function */
import { IProps } from '../types/Types';
import Block from '../utils/block';
import { RootState } from '../utils/store';

export class FakeBlock extends Block<IProps> {
  protected componentDidMount(): void {}
  public fetchData(): void {}
  constructor(props:IProps, root:HTMLElement) {
    super(props, root);
  }

  stateToProps: (state: RootState) => IProps;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  render(): void {}
}
