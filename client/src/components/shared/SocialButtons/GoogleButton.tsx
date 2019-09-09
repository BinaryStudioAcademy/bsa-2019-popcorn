import React from 'react';
import { ReactComponent as GoogleLogo } from '../../../assets/icons/general/search.svg';
import './SocialButtons.scss';

const GoogleButton: React.FC = () => {
  return (<div className='social-button social-button-google'>
    <GoogleLogo />
    <div>Continue with Google</div>
  </div>);
}

export default GoogleButton;