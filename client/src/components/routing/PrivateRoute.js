import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading }
}) => {
  const navigate = useNavigate();
  if (!loading && !isAuthenticated) navigate('/login');
  if (isAuthenticated) return <Component />;
  
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);

    
  