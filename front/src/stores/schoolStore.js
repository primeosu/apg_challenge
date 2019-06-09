import { observable, action,computed } from 'mobx';
const axios = require('axios');

class SchoolStore {

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable schoolId;

  @observable selectedSchool = {};
  @observable schoolSearchResults = []
  @observable schoolSearchFilter = []
  @observable schoolImageRestApi = ''
  @observable schoolImageUrl = ''

  @computed get totalCost() {

    var multiplier;

    if(!this.selectedSchool.sector_name){
      return null
     }

    if(this.selectedSchool.sector_name.includes("2")){
      multiplier = 2;
      console.log(2)
    }

    else if(this.selectedSchool.sector_name.includes("4")){
      multiplier = 4;
      console.log(4)
    }

    console.log(parseInt(this.selectedSchool.net_price))

    console.log(multiplier)
      
    return parseInt(this.selectedSchool.net_price) * multiplier;
}

  selectSchool(school){
    this.selectedSchool = school;
    this.rootStore.routingStore.history.push('/searchmajor/' + school.unit_id);
    this.schoolImageRestApi = `https://www.googleapis.com/customsearch/v1?key=AIzaSyAJdMUyuQiG2DEHgGG3Tvebb9-BzR0JXwE&cx=007795517275439860459:bhi9hee3dwq&q=${ encodeURI(school.name) }&searchType=image&imgSize=large&num=1`
    axios.get(this.schoolImageRestApi).then( (response) => {
    this.schoolImageUrl = response.data.items[0].link
  })
  }

  goToResults = (major) => {
    this.selectedMajor = major
    this.rootStore.routingStore.history.push('/results');
  }



  @observable selectedMajor = {};
  @observable majorSearchResults = []
  @observable majorSearchFilter = []
  @observable majorImageRestApi = ''
  @observable majorImageUrl = ''

    
  @observable universities = [];
  @observable majors = [];
  @observable userPlans = [];
  @observable selectedPlan = null


  @observable data = [
    {
      value: 50,
      color: "#46BFBD",
      highlight: "#5AD3D1",
      label: "Projected Salary"
    },
    {
      value: 100,
      color: "#FDB45C",
      highlight: "#FFC870",
      label: "Projected Cost"
    }
  ]
  



}

export default SchoolStore;