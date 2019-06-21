import React from 'react';
import './bootswatch.css';
import Types from './Types';
//import Fetch from 'react-fetch-component';
//import logo from './logo.svg';
import logo from './mcafee1.png';
import './App.css';
import CSVReader from 'react-csv-reader';
import './styles.css';

const handleFile = data => {
  data.shift();
  var length = data.length;
  var arrayObj = [];

  for (var i = 0; i < length - 1; i++) {
    var obj = {
      md5: data[i][0],
      classificationname: data[i][1],
      classificationtype: data[i][2],
      size: data[i][3],
      filetype: data[i][4]
    };
    arrayObj.push(obj);
  }

  fetch('http://localhost:3001/create', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      arrayObj
    })
  });
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="container">
        <CSVReader
          cssClass="react-csv-input"
          label=""
          onFileLoaded={handleFile}
        />

        <Types />
      </div>
    </div>
  );
}

export default App;
