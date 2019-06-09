import {observable, computed} from 'mobx';

class AppStore {

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable barData = {
    labels: ["Trojan", "Clean", "Unknown", "Virus", "Pup"],
    datasets: [
      {
        label: "Count",
        backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
        data: [0,0,0,0,0]
      }
    ]
  };


}

export default AppStore;