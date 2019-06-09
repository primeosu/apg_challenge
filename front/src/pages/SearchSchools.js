import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import posed from 'react-pose';
import { gql } from "apollo-boost";
import { withApollo } from 'react-apollo';
import * as CurrencyFormat from 'react-currency-format';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dropzone from 'react-dropzone'
import axios from 'axios';
import { toast } from 'react-toastify';

const photo = require("../img/diploma.png");

const Slide = posed.div({
  enter: { x: 0, opacity: 1 },
  exit: { x: -50, opacity: 0 }
});
const config = { headers: { 'Content-Type': 'multipart/form-data' } };


@inject('sessionStore', 'spotStore', 'uiStore', 'schoolStore')
@observer
class SearchSchools extends Component {
  sessionStore = this.props.sessionStore;
  spotStore = this.props.spotStore;
  uiStore = this.props.uiStore;
  schoolStore = this.props.schoolStore;

  state = {
    loading: false,
    summary: {}
  };

  componentDidMount() {
    this.getMalwareCounts();
  }

  getMalwareCounts() {
    axios
      .get('/summary')
      .then(response => {
        this.setState({summary: response.data});
        console.log(response);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      })
      .finally(function() {
        // always executed
      });
  }

  uploadCSV(acceptedFiles) {
    console.log(acceptedFiles);
    const form = new FormData();
    form.append('data', acceptedFiles[0]);
    axios.post('/upload', form, config).then(res => {
      this.getMalwareCounts();
      toast("File Uploaded!");
    });
  }

  render() {
    return (
      <React.Fragment>
        <Slide>
          <div className='container container-dashboard'>
            <div className='spacer' />
            <div className='spacer' />

            <h2 className='display-3'>Counts</h2>

            <section>
              <div className='search-container'>
                <div className='row'>
                  <div className='col-md-2 count-text'>Trojan: {this.state.summary.trojanCount} </div>
                  <div className='col-md-2 count-text'>Clean: {this.state.summary.cleanCount}</div>
                  <div className='col-md-2 count-text'>Unknown: {this.state.summary.unknownCount}</div>
                  <div className='col-md-2 count-text'>Virus: {this.state.summary.virusCount}</div>
                  <div className='col-md-2 count-text'>Pup: {this.state.summary.pupCount}</div>
                </div>
              </div>
            </section>

            <div className='spacer' />
            <div className='spacer' />
            <div className='spacer' />
            <h2 className='display-3'>Upload CSV</h2>
            <Dropzone onDrop={acceptedFiles => this.uploadCSV(acceptedFiles)}>
              {({getRootProps, getInputProps}) => (
                <div className='rsg--preview-60' data-preview='Class Components'>
                  <div {...getRootProps()}>
                    <section className='drop-container'>
                      <div tabIndex={0} className='dropzone'>
                        <input {...getInputProps()} multiple type='file' autoComplete='off' tabIndex={-1} style={{display: 'none'}} />
                        <p>Drag 'n' drop some files here, or click to select files</p>
                      </div>
                    </section>
                  </div>
                </div>
              )}
            </Dropzone>

            <div className='album py-5'>
              {this.schoolStore.schoolSearchResults.length == 0 && this.state.loading == true ? (
                <p className='text-center'>
                  <b>Heroku Free Tier. Takes a while to load =P</b>
                </p>
              ) : null}
              <div style={{justifyContent: 'center', display: 'flex'}}>
                {this.schoolStore.schoolSearchResults.length == 0 && this.state.loading == true ? <CircularProgress size={80} /> : null}
              </div>

              <div className='row row-eq-height'>
                {this.schoolStore.schoolSearchResults.map(school => (
                  <div key={school.unit_id} className='col-md-4'>
                    <div className='card shadow-lg mb-3 quote-card' style={{height: '90%'}} onClick={() => this.schoolStore.selectSchool(school)}>
                      <div className='card-body text-dark'>
                        <h5 className='card-title'>{school['name']}</h5>
                        <CurrencyFormat
                          value={school['net_price']}
                          displayType={'text'}
                          thousandSeparator={true}
                          prefix={'$'}
                          renderText={value => <h6>{value}</h6>}
                        />

                        <h6>{school['sector_name']}</h6>
                      </div>
                    </div>
                  </div>
                ))}

                <div className='col-md-4' />
                <div className='col-md-4' />
              </div>
            </div>
          </div>
        </Slide>
      </React.Fragment>
    );
  }
}

export default withApollo(SearchSchools);