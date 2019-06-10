import React, { Component } from 'react';
import posed from 'react-pose';
import Dropzone from 'react-dropzone'
import axios from 'axios';
import { toast } from 'react-toastify';
import Divider from '@material-ui/core/Divider';
import {inject, observer} from 'mobx-react';
import produce from "immer"
import { Bar } from 'react-chartjs-2';

const Slide = posed.div({
  enter: { x: 0, opacity: 1 },
  exit: { x: -50, opacity: 0 }
});

const config = { headers: { 'Content-Type': 'multipart/form-data' } };



class Home extends Component {


  state = {
    loading: false,
    summary: {},
    chartData: {
      labels: ['Trojan', 'Clean', 'Unknown', 'Virus', 'Pup'],
      datasets: [
        {
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: [0, 0, 0, 0, 0, 0, 0]
        }
      ]
    }
  };

  componentDidMount() {
    this.getMalwareCounts();
  }

  getMalwareCounts() {
    axios
      .get('/summary')
      .then(response => {
        const values = Object.values(response.data);

        this.setState(
          produce(this.state, draft => {
            draft.chartData.datasets[0].data = values;
            draft.summary = response.data;
          })
        );
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  uploadCSV(acceptedFiles) {
    const form = new FormData();
    form.append('data', acceptedFiles[0]);
    axios.post('/upload', form, config).then(res => {
      this.getMalwareCounts();
      toast('File Uploaded!');
    });
  }

  render() {
    return (
      <React.Fragment>
        <Slide>
          <div className='container container-dashboard'>
            <div className='spacer' />
            <div className='spacer' />
            <div className='spacer' />
            <h2 style={{marginBottom: '5px'}} className='display-3'>
              Upload CSV
            </h2>
            <Divider />
            <Dropzone onDrop={acceptedFiles => this.uploadCSV(acceptedFiles)}>
              {({getRootProps, getInputProps}) => (
                <div className='rsg--preview-60' data-preview='Class Components'>
                  <div {...getRootProps()}>
                    <section className='drop-container'>
                      <div tabIndex={0} className='dropzone'>
                        <input {...getInputProps()} multiple type='file' autoComplete='off' tabIndex={-1} style={{display: 'none'}} />
                        <p>Click or drop CSV file here</p>
                      </div>
                    </section>
                  </div>
                </div>
              )}
            </Dropzone>

            <div className='spacer' />
            <div className='spacer' />
            <h2 style={{marginBottom: '5px'}} className='display-3'>
              Malware Counts
            </h2>
            <Divider />
            <div style={{height: '16px'}} />
            <section>
              <div className='search-container'>
                <div className='row'>
                  <div className='col-md-2 count-text'>Trojan: {this.state.summary.trojanCount} </div>
                  <div className='col-md-2 count-text'>Clean: {this.state.summary.cleanCount}</div>
                  <div className='col-md-2 count-text'>Unknown: {this.state.summary.unknownCount}</div>
                  <div className='col-md-2 count-text'>Virus: {this.state.summary.virusCount}</div>
                  <div className='col-md-2 count-text'>Pup: {this.state.summary.pupCount}</div>
                </div>
                <div style={{height: '50px'}} />
                <Bar
                  data={this.state.chartData}
                  options={{
                    maintainAspectRatio: true,
                    legend: {
                      display: false
                    }
                  }}
                />
              </div>
            </section>
          </div>
        </Slide>
      </React.Fragment>
    );
  }
}

export default Home;