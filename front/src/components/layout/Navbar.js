import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import AvatarMenu from './avatar-menu';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";

const Nav = styled.div`
  z-index: 1;
 
 
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
`;

const AvatarImg = styled.img`
  height: 25px !important;
  padding-bottom: 3px !important;
`;

const ViewSwitcher = styled.span`
  textdecoration: none;
  color: #1890ff;
`;

@inject('routingStore', 'sessionStore', 'spotStore', 'uiStore')
@observer
class Navbar extends Component {
  routingStore = this.props.routingStore;
  sessionStore = this.props.sessionStore;
  spotStore = this.props.spotStore;
  uiStore = this.props.uiStore;

  render() {
    const NavigationNonAuth = () => (
      <nav className='navbar navbar-expand-lg py-2 fixed-top' style={{backgroundColor: 'white'}}>
        <div className='container'>
          <Link style={{textDecoration: 'none'}} to='/searchschools'>
          <FontAwesomeIcon className="icon-layers text-primary fa-2x" icon={faGraduationCap}/>
            <b className='ml-3'>APG</b>
          </Link>

          <Link style={{textDecoration: 'none'}} to='/login' className='ml-auto mr-3 nav-text-style'>
            <b>LOGIN</b>
          </Link>
        </div>
      </nav>
    );

    const NavigationAuth = props => (
      <nav className='navbar navbar-expand-lg py-2'>
        <div className='container'>
          <Link style={{textDecoration: 'none'}} to='/searchschools'>
          <img className='rounded-circle avatar-image--icon' src={require("../../img/apg.png")} alt='Logo' />

            <b className='ml-3'>APG</b>
          </Link>


{/* <p onClick={this.uiStore.startTour}>test</p> */}
        </div>
      </nav>
    );

    return (
      <Nav id='app-navbar' className='doggo-nav'>
        {this.sessionStore.authUser ? (
          <NavigationAuth mapView={this.uiStore.mapView} photoURL={this.sessionStore.authUser.photoURL} />
        ) : (
          <NavigationNonAuth />
        )}
      </Nav>
    );
  }
}
export default Navbar;
