import EventBus from './eventBus';
import { IBlockMetadata } from '../types/Types';

export enum BlockEvents {
    INIT = "init",
    FLOW_CDM = "flow:component-did-mount",
    FLOW_CDU = "flow:component-did-update",
    FLOW_RENDER = "flow:render"
}

export default abstract class Block<TPropsType extends object> {

    _root: HTMLElement = null;
    _meta: IBlockMetadata = null;
    eventBus: () => EventBus;
    props: TPropsType;

    constructor(props:TPropsType, root: HTMLElement) {
        const eventBus = new EventBus();
        this._meta = {
            props
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

    // Может переопределять пользователь, необязательно трогать
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

    // Может переопределять пользователь, необязательно трогать
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

    // Может переопределять пользователь, необязательно трогать
    abstract render();

    getContent() {
        return this.element;
    }

    private _makePropsProxy(props: TPropsType):TPropsType {
        // Можно и так передать this
        // Такой способ больше не применяется с приходом ES6+
        const self = this;
        let proxyProps = new Proxy(props, {
            get(target: TPropsType, props: string) {
                if (props.indexOf('_') === 0) {
                    throw new Error('Приватное свойство недоступно');
                }
                return target[props];
            },
            set(target: TPropsType, props: string, value: unknown) {
                if (props.indexOf('_') === 0) {
                    throw new Error('Приватное свойство недоступно');
                }
                let oldValue = target[props];
                target[props] = value;
                self.eventBus().emit(BlockEvents.FLOW_CDU, oldValue, value);
                return true;
            },
            deleteProperty(target: TPropsType, props: string) {
                throw new Error('нет доступа');
            }
        })
        return proxyProps;
    }

    private _createDocumentElement(tagName:string) {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        return document.createElement(tagName);
    }

    show() {
        this.element.style.display = 'block';
    }

    hide() {
        this.element.style.display = 'none';
    }
}