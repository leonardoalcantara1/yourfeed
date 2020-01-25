import React from 'react';
import { Grid } from '@material-ui/core';
import { withTheme } from '../../theme';
import { Button } from '../../components';

const Login = () => <Grid container style={{ justifyContent: 'center' }}>
  <Button type="primary">Entrar com sua conta Google</Button>
</Grid>;

// export default Login;
export default withTheme(Login);