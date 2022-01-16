import EventBus from './eventBus';
import { IProps } from '../types/Types';
import isEqual from './isEqual';
import { RootState } from './store';

export enum BlockEvents {
  INIT = 'init',
  FLOW_CDM = 'flow:component-did-mount',
  FLOW_CDU = 'flow:component-did-update',
  FLOW_RENDER = 'flow:render'
}

export default abstract class Block<TPropsType extends IProps> {
  private root: HTMLElement | null = null;

  eventBus: () => EventBus;

  public props: TPropsType;

  constructor(props: TPropsType, root: HTMLElement) {
    const eventBus = new EventBus();
    this.root = root;
    this.props = this.makePropsProxy(props);

    this.eventBus = () => eventBus;

    this.registerEvents(eventBus);
    eventBus.emit(BlockEvents.INIT);
  }

  private registerEvents(eventBus: EventBus) {
    eventBus.on(BlockEvents.FLOW_CDM, this.componentDidMountReal.bind(this));
    eventBus.on(BlockEvents.FLOW_CDU, this.componentDidUpdateReal.bind(this));
    eventBus.on(BlockEvents.FLOW_RENDER, this.renderReal.bind(this));
  }

  private componentDidMountReal() {
    this.componentDidMount();
  }

  protected abstract componentDidMount(): void;

  protected dispatchComponentDidMount() {
    this.eventBus().emit(BlockEvents.FLOW_CDM);
  }

  private componentDidUpdateReal(oldProps: object, newProps: object) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this.eventBus().emit(BlockEvents.FLOW_RENDER);
    }
  }

  protected componentDidUpdate(oldProps: object, newProps: object) {
    
    return !isEqual(oldProps, newProps);
  }

  abstract stateToProps: (state: RootState) => TPropsType;

  setProps = (nextProps: object) => {
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
  };

  protected getElement() {
    return this.root;
  }

  private renderReal() {
    this.render();
  }

  abstract render(): void;

  getContent() {
    const elem = this.getElement();
    if (elem) {
      return elem.innerHTML;
    }
    return null;
  }

  public abstract fetchData(): void;

  private makePropsProxy(props: TPropsType): TPropsType {
    const proxyProps = new Proxy(props, {
      get(target: TPropsType, props: string) {
        if (typeof props !== 'string') {
          return target;
        }
        if (props.indexOf('_') === 0) {
          throw new Error('Приватное свойство недоступно');
        }
        if(Object.prototype.hasOwnProperty.call(target, props)){
          return target[props as keyof TPropsType];
        }
      },
      set: (target: TPropsType, props: string, value: unknown) => {
        if (props.indexOf('_') === 0) {
          throw new Error('Приватное свойство недоступно');
        }
        if(!Object.prototype.hasOwnProperty.call(target, props)){
            throw new Error('Свойство ' + props + ' не найдено');
        }
        const oldValue = target[props as keyof TPropsType];

        target[props as keyof TPropsType] = value as typeof oldValue;
        this.eventBus().emit(BlockEvents.FLOW_CDU, oldValue, value);
        return true;
      },
      deleteProperty() {
        throw new Error('нет доступа');
      },
    });
    return proxyProps;
  }

  show() {
    if (this.getElement()) {
      (this.getElement() as HTMLElement).style.display = 'block';
    }
  }

  hide() {
    if (this.getElement()) {
      (this.getElement() as HTMLElement).style.display = 'none';
    }
  }
}
