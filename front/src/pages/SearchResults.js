import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import posed from 'react-pose';
import {gql} from 'apollo-boost';
import {withApollo} from 'react-apollo';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faDollarSign} from '@fortawesome/free-solid-svg-icons';
import {faSchool} from '@fortawesome/free-solid-svg-icons';
import {faAward} from '@fortawesome/free-solid-svg-icons';
import Currency from 'react-currency-formatter';
import Lens from 'react-lens';
import * as CurrencyFormat from 'react-currency-format';
import { If, Then, Else, When, Unless, Switch, Case, Default } from 'react-if'
import { toast } from 'react-toastify';

const photo = require('../img/diploma.png');

const Slide = posed.div({
  enter: {x: 0, opacity: 1},
  exit: {x: -50, opacity: 0}
});

const SearchSchoolsQuery = gql`
  query($name: String!) {
    searchSchools(name: $name) {
      opeid
      name
      unit_id
      sector_name
      net_price
    }
  }
`;

const SavePlanMutation = gql`
  mutation($school_id: Int!, $major_id: Int!, $projected_salary: Int!, $projected_cost: Int!, $user_id: String!) {
    savePlan(school_id: $school_id, major_id: $major_id, projected_salary: $projected_salary, projected_cost: $projected_cost, user_id: $user_id) {
      projected_cost
    projected_salary
    major {
      id
      name
      starting_medium_salary
      mid_careeer_medium_salary
    }
    school{
      unit_id
      name
      sector_name
      net_price
    }
    }
  }
`;

const getPlansByUser = gql`
  query($user_id: String!) {
    getPlansByUser(user_id: $user_id) {
      id
      projected_salary
      projected_cost
      major {
        id
        name
        starting_medium_salary
        mid_careeer_medium_salary
      }
      school {
        name
        net_price
        sector_name
        unit_id
      }
    }
  }
`;




@inject('sessionStore', 'spotStore', 'uiStore', 'schoolStore', 'routingStore')
@observer
class SearchResults extends Component {
  sessionStore = this.props.sessionStore;
  spotStore = this.props.spotStore;
  uiStore = this.props.uiStore;
  schoolStore = this.props.schoolStore;
  routingStore = this.props.routingStore;


  componentDidMount = () => {
    if(!this.schoolStore.selectedSchool.name || !this.schoolStore.selectedMajor.name  ){
      this.routingStore.history.push('/searchschools');
    }
  }



  onChange = async e => {
    this.schoolStore.schoolSerchFilter = e.target.value;
    if (this.schoolStore.schoolSerchFilter.length > 2) {
      const result = await this.props.client.query({
        query: SearchSchoolsQuery,
        variables: {name: this.schoolStore.schoolSerchFilter}
      });
      this.schoolStore.schoolSearchResults = result.data.searchSchools;
    }
  };

  saveResult = () => {

    this.props.client.mutate({
      refetchQueries: () => [{query: getPlansByUser , variables: {user_id: this.sessionStore.authUser.uid} }],

      awaitRefetchQueries: true,
      mutation: SavePlanMutation,
      variables: { 
        school_id: this.schoolStore.selectedSchool.unit_id,
        major_id: this.schoolStore.selectedMajor.id,
        projected_salary: this.schoolStore.selectedMajor.mid_careeer_medium_salary,
        projected_cost: this.schoolStore.totalCost,
        user_id: this.sessionStore.authUser.uid
       }
    })
      .then(({ data }) => {
        console.log('got data', data);
        toast("Plan Saved!");
        this.routingStore.history.push({
          pathname: '/plans/' + this.sessionStore.authUser.uid,
          state: {userId: this.sessionStore.authUser.uid }
        });
      }).catch((error) => {
        console.log('there was an error sending the query', error);
        toast("Error! " + error );
      });
       
      }

      tryAgain = ()  => {
        this.routingStore.history.push('/searchschools');

      }



  render() {
    const {schoolStore} = this.props;
    return (
      <React.Fragment>
        <Slide>

      <div className="container">
        <div className="spacer" />
          <div className='basic-school-details-container text-center'>
            <div className='results-school-details-container'>
              <h1 className='display-3'>The Results  <FontAwesomeIcon className='fa-sm' icon={faDollarSign} /></h1>
             
            </div>
            <div className='row'>
              <div className='col-md-12 text-left'>
                <FontAwesomeIcon className='fa-3x text-left' icon={faSchool} />
                <div className='spacer' />
                <h3 className='display-4 text-left'>{schoolStore.selectedSchool['name']}</h3>
             

                {schoolStore.selectedSchool['net_price'] ? (   <CurrencyFormat value={schoolStore.selectedSchool['net_price']} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <h2 className="display-4">{value} / year</h2>} /> ) : ( null)}  
                
               
               
                <h2 className='display-4 text-left'>{schoolStore.selectedSchool['sector_name']}</h2>

                <h2 className='display-4 text-left total-cost'>          
                  {/* Total Cost:   <CurrencyFormat value={schoolStore.totalCost} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <span>{value}</span>} /> */}
                </h2>
              </div>
            </div>
            <div className='spacer' />
            <div className='spacer' />
            <div className='spacer' />
            <div className='row'>
              <div className='col-md-12 text-left'>
                <FontAwesomeIcon className='fa-3x text-left' icon={faAward} />
                <div className='spacer' />
                {schoolStore.selectedMajor.name ? (  <h2 className='display-4'>Major: {schoolStore.selectedMajor.name}</h2>) : ( null)} 
                {/* <h3 className='detail-header text-left'>Avaliable Jobs: {schoolStore.selectedMajor.starting_medium_salary}</h3> */}
              
            
                    {schoolStore.selectedMajor.starting_medium_salary ? ( <CurrencyFormat value={schoolStore.selectedMajor.mid_careeer_medium_salary} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value =>   <h2 className='display-4'>Median Salary: {value}</h2>} /> ) : ( null)}
             
              </div>
            </div>
            <div className='row'>
              <div className='col-md-12'>
                {/* <h2 className='detail-school-header text-left'>ROI Rating: {schoolStore.getTotalCost / schoolStore.selectedMajor.Median}</h2> */}
              </div>
            </div>
            <div className='spacer' />
            <div className='spacer' />
            <div className='row'>
              <div className='col-md-12'>
                <button className=' btn btn-success' onClick={this.saveResult}>
                  {' '}
                  Save this result
                </button>
                <button onClick ={this.tryAgain} className=' btn btn-info'> Try Again</button>
                <div className='spacer' />

                <div className='spacer' />

              </div>
            </div>
          </div>

          </div>

        </Slide>
      </React.Fragment>
    );
  }
}

export default withApollo(SearchResults);
