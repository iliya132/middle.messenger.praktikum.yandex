import EventBus from './eventBus';
import { IBlockMetadata } from '../types/Types';

export enum BlockEvents {
    INIT = 'init',
    FLOW_CDM = 'flow:component-did-mount',
    FLOW_CDU = 'flow:component-did-update',
    FLOW_RENDER = 'flow:render'
}

export default abstract class Block<TPropsType extends object> {
  _root: HTMLElement | null = null;

  _meta: IBlockMetadata | null = null;

  eventBus: () => EventBus;

  props: TPropsType;

  constructor(props:TPropsType, root: HTMLElement) {
    const eventBus = new EventBus();
    this._meta = {
      props,
    };
    this._root = root;

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(BlockEvents.INIT);
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(BlockEvents.INIT, this.init.bind(this));
    eventBus.on(BlockEvents.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(BlockEvents.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(BlockEvents.FLOW_RENDER, this._render.bind(this));
  }

  private _createResources() {}

  init() {
    this._createResources();
    this.eventBus().emit(BlockEvents.FLOW_RENDER);
    this.eventBus().emit(BlockEvents.FLOW_CDM);
  }

  private _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount(oldProps?: object) { }

  dispatchComponentDidMount() {
    this.eventBus().emit(BlockEvents.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: object, newProps: object) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this.eventBus().emit(BlockEvents.FLOW_RENDER);
    }
  }

  componentDidUpdate(oldProps: object, newProps: object) {
    if (oldProps === newProps) {
      return false;
    }
    return true;
  }

  setProps = (nextProps: object) => {
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._root;
  }

  private _render() {
    this.render();
  }

    abstract render():void;

    getContent() {
      return this.element;
    }

    private _makePropsProxy(props: TPropsType):TPropsType {
      const proxyProps = new Proxy(props, {
        get(target: TPropsType, props: string) {
          if (props.indexOf('_') === 0) {
            throw new Error('Приватное свойство недоступно');
          }
          return target[props];
        },
        set: (target: TPropsType, props: string, value: unknown) => {
          if (props.indexOf('_') === 0) {
            throw new Error('Приватное свойство недоступно');
          }
          const oldValue = target[props];
          target[props] = value;
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
      if (this.element) {
        this.element.style.display = 'block';
      }
    }

    hide() {
      if (this.element) {
        this.element.style.display = 'none';
      }
    }
}
