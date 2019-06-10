import {observable, computed} from 'mobx';

class AppStore {

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable barData = {
    labels: ["Trojan", "Clean", "Unknown", "Virus", "Pup"],
    datasets: [
      {
        
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
  };

  updateChart(values){
    this.barData = {
      labels: ["Trojan", "Clean", "Unknown", "Virus", "Pup"],
      datasets: [
        {
          
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: [65, 59, 80, 81, 56, 55, 40]
        }
      ]
    };
  }


}

export default AppStore;