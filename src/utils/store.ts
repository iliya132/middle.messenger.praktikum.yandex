import { authState } from '../controllers/authController';
import { IChatsState } from '../controllers/chatController';
import { IProps, StoreEvents } from '../types/Types';
import Block from './block';
import EventBus from './eventBus';
import isEqual from './isEqual';
import set from './set';

export interface RootState{
  auth: authState,
  chats: IChatsState
}

const defaultRootState: RootState = {
  auth: {
    error: "",
    isSignedIn: false,
    user:{
      avatar: '',
      displayName: '',
      email: '',
      firstName: '',
      id: 0,
      login: '',
      password: '',
      phone: '',
      secondName: ''
    }
  },
  chats:{
    activeChat: 0,
    chats: [],
    error: '',
    messages: []
  }
}

export default class Store {
  private state: RootState = defaultRootState;

  private eventBus: () => EventBus;

  constructor() {
    const eventBus = new EventBus();
    this.eventBus = () => eventBus;
  }

  getState() {
    return this.state;
  }

  setState(path: string, value: unknown) {
    const newValue = set(this.state, path, value) as RootState;
    console.log('new state: ', newValue);
    if (!isEqual(this.state, newValue)) {
      this.state = newValue;
      this.eventBus().emit(StoreEvents.changed);
    }
  }

  connect(component: Block<IProps>): Block<IProps> {
    this.eventBus().on(StoreEvents.changed, () => {
      component.setProps({ ...component.props, ...component.stateToProps(this.getState()) });
    });
    return component;
  }
}
