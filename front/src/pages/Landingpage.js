import React, { Component } from "react";
import { Link } from "react-router-dom";
import { inject, observer } from 'mobx-react';
import posed from 'react-pose';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTable } from "@fortawesome/free-solid-svg-icons";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";

const Fade = posed.div({
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
});

@inject('routingStore', 'sessionStore')
@observer
class Landingpage extends Component {

  routingStore = this.props.routingStore;
  sessionStore = this.props.sessionStore;

  state = { isVisible: false };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isVisible: !this.state.isVisible });
    }, 500);
  }

  render() {

    return (
      <div>
        <main>
          <div className='position-relative'>
            <section className='section section-lg section-shaped pb-250'>
              <div className='container py-lg-md d-flex'>
                <div className='col px-0'>
                  <div className='row'>
                    <div className='col-lg-12 text-center'>
                      <Fade pose={this.state.isVisible ? 'visible' : 'hidden'}>
                        <h1 className='display-1'> APG Data Digest Tool</h1>

                        <h1 className='display-4'> McAfee Advanced Programs Group</h1>
                        <div className="spacer" />
                        <div className="spacer" />
                        <div className='d-flex justify-content-between' style={{width:"50%", margin:"auto"}}>
                          <FontAwesomeIcon className='icon-layers text-primary fa-2x' icon={faTable} />
                          <FontAwesomeIcon className='icon-layers text-primary fa-2x' icon={faLongArrowAltRight} />
                          <FontAwesomeIcon className='icon-layers text-primary fa-2x' icon={faDatabase} />
                          
                        </div>
                        <div className="spacer" />
                  
                        <div className="spacer" />
                        <div className="spacer" />

                      </Fade>
                      <div className='btn-wrapper'>
                      <Link to='/searchschools' className='btn btn-lg  btn-white btn-icon mb-3 mb-sm-0' style ={{width:"70%"}}>
                              <span className='btn-inner--text'>Enter</span>
                            </Link>

                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </section>
      
          </div>


        </main>
      </div>
    );
  }
}

export default Landingpage;
