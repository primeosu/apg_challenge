import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import posed from 'react-pose';
import {gql} from 'apollo-boost';
import {withApollo} from 'react-apollo';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChartLine} from '@fortawesome/free-solid-svg-icons';
import * as CurrencyFormat from 'react-currency-format';
import {faAward} from '@fortawesome/free-solid-svg-icons';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import {faSchool} from '@fortawesome/free-solid-svg-icons';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import CircularProgress from '@material-ui/core/CircularProgress';

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
      school {
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

const DeletePlanMutation = gql`
  mutation($plan_id: Int!) {
    deletePlan(plan_id: $plan_id)
  }
`;

@inject('sessionStore', 'spotStore', 'uiStore', 'schoolStore', 'routingStore')
@observer
class MyPlans extends Component {
  sessionStore = this.props.sessionStore;
  spotStore = this.props.spotStore;
  uiStore = this.props.uiStore;
  schoolStore = this.props.schoolStore;
  routingStore = this.props.routingStore;

  state = {
    loading: false
  }


  async componentDidMount() {
    this.getPlans();
  }

  getPlans = async () => {
    console.log('aye1')
    this.setState({loading:true})
    const result = await this.props.client.query({
      query: getPlansByUser,
      variables: {user_id: this.props.match.params.user_id}
    });
    this.setState({loading:false})
    this.schoolStore.userPlans = [];
    this.schoolStore.userPlans = result.data.getPlansByUser;
  };

  goToPlan = id => {
    this.routingStore.history.push({
      pathname: '/plan/' + id
    });
  };

  deletePlan = async id => {
    await this.props.client
      .mutate({
        awaitRefetchQueries: true,
        mutation: DeletePlanMutation,
        variables: {plan_id: id},
         refetchQueries: () => [{query: getPlansByUser , variables: {user_id: this.props.match.params.user_id} }]
      })
      .then(results => {
        console.log(results)
        this.getPlans();
      });
  };

  deletePlanModal = (id, e) => {
    e.stopPropagation();
    confirmAlert({
      title: 'Delete Plan?',
      message: 'Are you sure you want to delete this plan?',
      buttons: [
        {
          label: 'Delete',
          onClick: () => this.deletePlan(id)
        }
      ]
    });
  };

  handleBack = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <React.Fragment>
        <Slide>
          <div className='container'>
            <div className='spacer' />
            <div onClick={this.handleBack} style={{ fontSize: "20px", cursor: "pointer", color:"black"  }}>
                        <i className="fa fa-arrow-left" aria-hidden="true"></i> Back
                    </div>
            <div className='basic-school-details-container text-center'>
              <div className='results-school-details-container'>
                <h1 className='detail-school-header'>The Plans</h1>

                <FontAwesomeIcon className='dollar-icon fa-8x' icon={faChartLine} />
                <div className='spacer' />
                <div className='spacer' />
                <div style={{justifyContent: "center", display:"flex"}}>
              {this.state.loading == true ? (<CircularProgress size={80}   /> ) : ( null )}
              </div>
                {this.schoolStore.userPlans.map(plan => (
                  <React.Fragment key={plan.id}>
                    <div onClick={() => this.goToPlan(plan.id)} className='card mb-3 quote-card'>
                      <div className='m-3'>
                        <div className='row '>
                          <div className='col-md-6 text-left'>
                            <FontAwesomeIcon className='fa-2x text-left' icon={faSchool} />
                            <div className='spacer' />
                            <div className='detail-school-header text-left'>
                              <b>{plan.school.name}</b>
                            </div>
                            <div className='detail-header text-left'>
                              {plan.projected_cost ? (
                                <CurrencyFormat
                                  value={plan.projected_cost}
                                  displayType={'text'}
                                  thousandSeparator={true}
                                  prefix={'$'}
                                  renderText={value => <span>{value} </span>}
                                />
                              ) : null}
                            </div>

                            <div className='detail-header text-left'>{plan.school.sector_name}</div>
                            <div className='spacer' />
                            <div className='spacer' />
                          </div>

                          <div className='col-md-6 text-left'>
                            <FontAwesomeIcon className='fa-2x text-left' icon={faAward} />
                            <div className='spacer' />
                            {plan.major.name ? (
                              <div className='detail-school-header text-left'>
                                <b>Major: {plan.major.name}</b>
                              </div>
                            ) : null}
                            <div className='detail-header text-left total-cost'>
                              Median Salary:{' '}
                              <CurrencyFormat
                                value={plan.projected_salary}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'$'}
                                renderText={value => <span>{value}</span>}
                              />
                            </div>
                          </div>
                        </div>
                        <div className='spacer' />
                        <div className="detail-school-header text-left"> <b>ROI Ratio: {  Math.round(parseInt(plan.projected_cost) /  parseInt(plan.projected_salary)  * 100) / 100 }</b>  </div>

                        <div className='row float-right'>
                          <FontAwesomeIcon onClick={e => this.deletePlanModal(plan.id, e)}  icon={faTrash} className="mr-1 fa-2x" />
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </Slide>
      </React.Fragment>
    );
  }
}

export default withApollo(MyPlans);
