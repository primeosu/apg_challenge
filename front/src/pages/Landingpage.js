import React, { Component } from "react";
import { Link } from "react-router-dom";
import { inject, observer } from 'mobx-react';
import posed from 'react-pose';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faDollarSign} from '@fortawesome/free-solid-svg-icons';
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { faExchangeAlt } from "@fortawesome/free-solid-svg-icons";
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
                        {/* <p className='lead'>
                          Education impacts your entire life. Don't leave that up to chance. Compare the financial data of your favorite choice
                          schools. Make the best possible decision for your future.
                        </p> */}
                      </Fade>
                      <div className='btn-wrapper'>
                        <Fade pose={this.state.isVisible ? 'visible' : 'hidden'}>
                          {this.sessionStore.authUser ? (
                            <Link to='/searchschools' className='btn btn-lg  btn-white btn-icon mb-3 mb-sm-0' style ={{width:"70%"}}>
                              <span className='btn-inner--text'>Enter</span>
                            </Link>
                          ) : (
                            <Link to='/signup' className='btn btn-lg  btn-white btn-icon mb-3 mb-sm-0'>
                              <span className='btn-inner--text'>Enter</span>
                            </Link>
                          )}
                        </Fade>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </section>
      
          </div>

          {/* <section className="section section-lg white-bg">
    <div className="container">
      <div className="row row-grid align-items-center">
        <div className="col-md-4 order-md-2">
          <img
            src={require("../img/map.png")} 
            alt="Smiley face"
            className="img-fluid floating mx-auto d-block"
          />
        </div>
        <div className="col-md-6 order-md-1">
          <div className="pr-md-5">
            <div className="icon icon-lg icon-shape icon-shape-success shadow rounded-circle mb-5">
              <i className="ni ni-map-big" />
            </div>
            <h3>Google Maps Integration</h3>
            <p>
              Using the Google Maps API, DelishUs creates easy to use maps of all your favorite places, as well as the places of friends and family
            </p>
            <ul className="list-unstyled mt-5">
              <li className="py-2">
                <div className="d-flex align-items-center">
                  <div>
                    <div className="badge badge-circle badge-success mr-3">
                      <i className="ni ni-world-2" /> 
                    </div>
                  </div>
                  <div>
                    <h6 className="mb-0">
                      Search for Spots on the world map!
                    </h6>
                  </div>
                </div>
              </li>
              <li className="py-2">
                <div className="d-flex align-items-center">
                  <div>
                    <div className="badge badge-circle badge-success mr-3">
                      <i className="ni ni-favourite-28" />
                    </div>
                  </div>
                  <div>
                    <h6 className="mb-0">Save and share your favorite Spots!</h6>
                  </div>
                </div>
              </li>
              <li className="py-2">
                <div className="d-flex align-items-center">
                  <div>
                    <div className="badge badge-circle badge-success mr-3">
                      <i className="ni ni-pin-3" />
                    </div>
                  </div>
                  <div>
                    <h6 className="mb-0">
                      Check out a new Spot with the Random feature!
                    </h6>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section> */}
        </main>
      </div>
    );
  }
}

export default Landingpage;
