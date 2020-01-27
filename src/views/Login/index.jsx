import React from 'react';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { login } from '../../store/user/actions';
import { withTheme } from '../../theme';
import { Button } from '../../components';

const Login = props => <Grid container style={{ justifyContent: 'center' }}>
  <Button type="primary" onClick={() => props.dispatch(login())}>Entrar com sua conta Google</Button>
</Grid>;

// export default Login;
export default withTheme(connect(null, dispatch => ({ dispatch }))(Login));