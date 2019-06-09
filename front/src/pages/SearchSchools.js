import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import posed from 'react-pose';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dropzone from 'react-dropzone'
import axios from 'axios';
import { toast } from 'react-toastify';
import Divider from '@material-ui/core/Divider';



const Slide = posed.div({
  enter: { x: 0, opacity: 1 },
  exit: { x: -50, opacity: 0 }
});
const config = { headers: { 'Content-Type': 'multipart/form-data' } };



class SearchSchools extends Component {

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
            <div className='spacer' />
            <h2 style={{marginBottom:"5px"}} className='display-3'>Upload CSV</h2>
            <Divider  />
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
            <h2 style={{marginBottom:"5px"}}  className='display-3'>Counts</h2>
            <Divider  />
            <div style={{height:"16px"}}></div>

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






          </div>
        </Slide>
      </React.Fragment>
    );
  }
}

export default SearchSchools;