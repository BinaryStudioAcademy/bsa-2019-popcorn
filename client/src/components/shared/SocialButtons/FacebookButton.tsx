import React from 'react';
import { ReactComponent as FacebookLogo } from '../../../assets/icons/general/facebook.svg';
import './SocialButtons.scss';

const FacebookButton: React.FC = () => {
  return (<div className='social-button'>
    <FacebookLogo />
    <div>Continue with Facebook</div>
  </div>);
}

export default FacebookButton;