import { RouterStore } from 'mobx-react-router';
import AppStore from './appStore';

class RootStore {
  constructor() {
    this.routingStore = new RouterStore(this);
    this.appStore = new AppStore(this);
  }
}
const rootStore = new RootStore();

export default rootStore;