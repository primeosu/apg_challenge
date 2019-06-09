import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import posed from 'react-pose';
import {gql} from 'apollo-boost';
import {withApollo} from 'react-apollo';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {withRouter} from 'react-router-dom';

import * as CurrencyFormat from 'react-currency-format';
import {faAward} from '@fortawesome/free-solid-svg-icons';

import {faSchool} from '@fortawesome/free-solid-svg-icons';

const photo = require('../img/diploma.png');
var PieChart = require("react-chartjs").Pie;

const Slide = posed.div({
  enter: {x: 0, opacity: 1},
  exit: {x: -50, opacity: 0}
});

const chartOptions = {
  responsive: true
}

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
      school {
        unit_id
        name
        sector_name
        net_price
      }
    }
  }
`;

const getPlanByIdQuery = gql`
  query($id: Int!) {
    getPlanById(id: $id) {
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
class Plan extends Component {

  sessionStore = this.props.sessionStore;
  schoolStore = this.props.schoolStore;
  routingStore = this.props.routingStore;

  state ={
      data :[
        {
          value: 50,
          color: "#46BFBD",
          highlight: "#5AD3D1",
          label: "Green"
        },
        {
          value: 100,
          color: "#FDB45C",
          highlight: "#FFC870",
          label: "Yellow"
        }
      ]
      
  }



   componentDidMount = async () => {
    const result = await this.props.client.query({
        query: getPlanByIdQuery,
        variables: {id: parseInt(this.props.match.params.plan_id)}
      });

      this.schoolStore.selectedPlan = result.data.getPlanById;

        console.log(this.schoolStore.selectedPlan)  

     this.schoolStore.selectedPlan.data = [
        {
            value: this.schoolStore.selectedPlan.projected_salary,
            color: "#46BFBD",
            highlight: "#5AD3D1",
            label: "Projected Salary"
          },
          {
            value: this.schoolStore.selectedPlan.projected_cost,
            color: "#FDB45C",
            highlight: "#FFC870",
            label: "Projected Cost"
          }
     ]

     this.setState({
         data:this.schoolStore.selectedPlan.data
     })

  }

  handleBack = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <React.Fragment>
        {/* <Slide> */}
          <div className='container'>
            <div className='spacer' />
            <div onClick={this.handleBack} style={{ fontSize: "20px", cursor: "pointer", color:"black"  }}>
                        <i className="fa fa-arrow-left" aria-hidden="true"></i> Back
                    </div>
            <div className='basic-school-details-container text-center'>
              <div className='results-school-details-container'>
             

                
                <div className='spacer' />
                <div className='spacer' />
                {this.schoolStore.selectedPlan != null ? (            <React.Fragment>
                    <div className='card mb-3 quote-card'>
                      <div className='m-3'>
                        <div className='row '>
                          <div className='col-md-6 text-left'>
                            <FontAwesomeIcon className='fa-2x text-left' icon={faSchool} />
                            <div className='spacer' />
                            <div className='detail-school-header text-left'>
                              <b>{this.schoolStore.selectedPlan.school.name}</b>
                            </div>
                            <div className='detail-header text-left'>
                              {this.schoolStore.selectedPlan.projected_cost ? (
                                <CurrencyFormat
                                  value={this.schoolStore.selectedPlan.projected_cost}
                                  displayType={'text'}
                                  thousandSeparator={true}
                                  prefix={'$'}
                                  renderText={value => <span>{value} </span>}
                                />
                              ) : null}
                            </div>

                            <div className='detail-header text-left'>{this.schoolStore.selectedPlan.school.sector_name}</div>
                            <div className='spacer' />
                            <div className='spacer' />
                          </div>

                          <div className='col-md-6 text-left'>
                            <FontAwesomeIcon className='fa-2x text-left' icon={faAward} />
                            <div className='spacer' />
                            {this.schoolStore.selectedPlan.major.name ? (
                              <div className='detail-school-header text-left'>
                                <b>Major: {this.schoolStore.selectedPlan.major.name}</b>
                              </div>
                            ) : null}
                            <div className='detail-header text-left total-cost'>
                              Median Salary:
                              <CurrencyFormat
                                value={this.schoolStore.selectedPlan.major.mid_careeer_medium_salary}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'$'}
                                renderText={value => <span>{value}</span>}
                              />

                            </div>
                          </div>
                        </div>
                        <div className='spacer' />
                            <div className='spacer' />
                        <div className="detail-school-header">ROI Ratio: {  Math.round(parseInt(this.schoolStore.selectedPlan.projected_cost) /  parseInt(this.schoolStore.selectedPlan.major.mid_careeer_medium_salary)  * 100) / 100 }  </div>
                        <PieChart data={this.state.data} options={chartOptions} width="600" height="150" />

                      </div>
                    </div>
                </React.Fragment> ): null}
             
              </div>
            </div>
          </div>
        {/* </Slide> */}
      </React.Fragment>
    );
  }
}

export default withApollo(Plan);
