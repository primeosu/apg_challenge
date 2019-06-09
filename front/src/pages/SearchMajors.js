import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import styled from 'styled-components';
import withAuthorization from '../components/hoc/withAuthorization';
import preventDefault from "../utils/eventListeners"
import posed from 'react-pose';
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import { withApollo } from 'react-apollo';
import Img from 'react-image'
import CircularProgress from '@material-ui/core/CircularProgress';
import * as CurrencyFormat from 'react-currency-format';

const photo = require("../img/diploma.png");
const collegeIcon = require("../img/college.png");

const Loader = () => {
  return <CircularProgress style={{}} className='mx-auto align-self-center' />;
}; 

const Slide = posed.div({
  enter: { x: 0, opacity: 1 },
  exit: { x: -50, opacity: 0 }
});

const SlidePic = posed.div({
  enter: { x: 0, opacity: 1, delay: 300 },
  exit: { x: -50, opacity: 0 }
});

const SearchMajorsQuery = gql`
  query($name: String!) {
    searchMajors(name: $name) {
      id
      name
      starting_medium_salary
      mid_careeer_medium_salary
    }
  }
`;

@inject('sessionStore', 'spotStore', 'uiStore', 'schoolStore')
@observer
class SearchMajors extends Component {

  sessionStore = this.props.sessionStore;
  spotStore = this.props.spotStore;
  uiStore = this.props.uiStore;
  schoolStore = this.props.schoolStore;

  state = {
    loading: false
  }

  onChange = async e => {
    this.schoolStore.majorSearchFilter = e.target.value;
    if (this.schoolStore.majorSearchFilter.length > 2) {
      this.setState({loading:true})
      const result = await this.props.client.query({
        query: SearchMajorsQuery,
        variables: {name: this.schoolStore.majorSearchFilter}
      });
      this.setState({loading:false})
      this.schoolStore.majorSearchResults = result.data.searchMajors;
    }
  };

  selectSchool = school => {
    this.schoolStore.selectedSchool = school
    // this.props.history.push("/searchmajor/" + university.objectID);
  };

  componentWillUnmount() {
    window.removeEventListener('touchmove', preventDefault);
  }

  async componentDidMount() {

  }

  async initialize() {

  }

  render() {
    const { schoolStore } = this.props;
    return (
      <div className='container'>
        <div className='spacer' />

        {schoolStore.selectedSchool ? (
          <div>
            <div className='basic-school-details-container text-left'>
              <img src={collegeIcon} className='college-icon' alt='Responsive image' />

              {schoolStore.selectedSchool.name ? (
                <React.Fragment>
                  <h1 className='display-4'>{schoolStore.selectedSchool['name']}</h1>
                  <CurrencyFormat
                    value={schoolStore.selectedSchool['net_price']}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'$'}
                    renderText={value => <h2 className='display-4'>{value} / year</h2>}
                  />
                  <h2 className='display-4'>{schoolStore.selectedSchool['sector_name']}</h2>
                </React.Fragment>
              ) : null}
              <div className='spacer' />
              <div className='spacer' />
            </div>

            <div className='spacer' />
            <div className='row'>

              <div className='col-md-6 d-none d-md-block'>
                <div className='p-3'>
                  <img
                    className='img-fluid'
                    src={require('../img/noImage.jpg')}
                    style={{maxHeight: '25vh', borderRadius: '18px', width: '100%', opacity: '0.0'}}
                  />
                </div>
              </div>

              <div className='col-md-6'>
                <SlidePic>
                  <picture className='fixed-ratio' style={{paddingBottom: '20.25%'}}>
                    <div className='p-3'>
                      <Img
                        style={{maxHeight: '25vh', borderRadius: '18px', width: '100%'}}
                        src={[this.schoolStore.schoolImageUrl, require('../img/noImage.jpg')]}
                        className='wrapper__img'
                      />
                    </div>
                  </picture>
                </SlidePic>
              </div>
            </div>
          </div>
        ) : null}
        <div className='spacer' style={{height: '30px'}} />
        {/* <h1 className='text-center dashboard-header'>Pick Your Major</h1> */}

        <div className='form-group dashboard-form'>
          <label>Search Major</label>
          <div className='input-group input-group-alternative mb-4'>
            <div className='input-group-prepend'>
              <span className='input-group-text'>
                <i className='ni ni-zoom-split-in' />
              </span>
            </div>
            <input className='form-control form-control-lg form-control-alternative' placeholder='Search' type='text' onChange={this.onChange} />
          </div>
        </div>

        <div className='album py-5'>
          <div style={{justifyContent: 'center', display: 'flex'}}>
            {this.schoolStore.majorSearchResults.length == 0 && this.state.loading == true ? <CircularProgress size={80} /> : null}
          </div>

          <div className='row row-eq-height'>
            {this.schoolStore.majorSearchResults.map(major => (
              <div onClick={() => this.schoolStore.goToResults(major)} key={major.id} className='col-md-4'>
                <div className='card shadow-lg mb-3 quote-card '>
                  <div className='card-body text-dark'>
                    <h5 className='card-title'>{major['name'].toLowerCase()}</h5>
                    {/* <p>Avaliable Jobs: {major["Total"]}</p> */}
                    {/* <p>Median Salary: $ {major['mid_careeer_medium_salary']}</p> */}
                    <CurrencyFormat
                      value={major['mid_careeer_medium_salary']}
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={'$'}
                      renderText={value => <p>Median Salary: {value}</p>}
                    />
                  </div>
                </div>
              </div>
            ))}

            <div className='col-md-4' />
            <div className='col-md-4' />
          </div>
        </div>
      </div>
    );
  }
}
const authCondition = (authUser) => !!authUser;

// export default compose(withAuthorization(authCondition))(SearchSchools);
export default withApollo(SearchMajors);