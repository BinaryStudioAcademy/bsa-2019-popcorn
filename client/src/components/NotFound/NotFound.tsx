import React from 'react';
import { NavLink } from 'react-router-dom';
import './NotFound.scss';

const NotFound = () => (
    <section className="notFound-container">
        <div className="notFound-main">
            <h2 className="notFound-title">404 Not Found</h2>
            <p className="notFound-body">
                {'Go to '}
                <NavLink to="/" className="notFound-link">Home</NavLink>
                {' page'}
            </p>
        </div>
    </section>
);

export default NotFound;