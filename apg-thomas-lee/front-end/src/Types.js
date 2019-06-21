import React from 'react';
import './bootswatch.css';
import './styles.css';
import './App.css';

class Types extends React.Component {
  constructor(props) {
    super(props);
    this.state = {results: []};
  }

  getTypes() {
    fetch('http://localhost:3001/types')
      .then(response => response.json())
      .then(data => {
        this.setState({results: data});
        console.log(this.state.results);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.getTypes();
          }}
        >
          Show Classification Types
        </button>
        <br />
        <br />
        <table className="table table-hover">
          {this.state.results.map(result => {
            return (
              <tr className="table-primary" key={result.md5}>
                <td>Classification:</td>
                <td>{result.classificationtype}</td>
                <td>Count:</td>
                <td>{result.count}</td>
              </tr>
            );
          })}
        </table>
      </div>
    );
  }
}

export default Types;
