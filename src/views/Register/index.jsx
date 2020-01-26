import React, { useState } from 'react';
import { connect } from 'react-redux';
import { TextField } from '@material-ui/core';
import { Button } from '../../components';
import { registerFeedName, validateFeedName } from '../../store/user/actions';

let debounceTimeout;
const debounce = func => {
  if (debounceTimeout) {
    clearTimeout(debounceTimeout);
  }
  debounceTimeout = setTimeout(func, 500);
}

const Register = ({ dispatch }) => {
  const [feedname, setFeedname] = useState('');
  const [feednameIsValid, validateFeednameCallback] = useState(null);

  const feednameRegex = /[^a-z0-9._]/g;

  return <>
    <form
      onSubmit={() => dispatch(feedname)}
      autoComplete="off"
    >
      <TextField
        variant="outlined"
        label="Escolha seu feedname"
        fullWidth
        helperText={
          (feednameIsValid === false && "Este nome já foi escolhido") ||
          (feednameIsValid === null && "Sem espaços ou caracteres especiais")
        }
        name="feedname"
        onChange={e => {
          const value = e.target.value.toLowerCase().replace(feednameRegex, '');
          setFeedname(value);
          debounce(() => {
            dispatch(validateFeedName(value, validateFeednameCallback));
          });
        }}
        value={feedname}
        error={feednameIsValid === false}
      />
      <Button disabled={!feednameIsValid} onClick={() => dispatch(registerFeedName(feedname))}>
        Salvar
      </Button>
    </form>
  </>;
}

export default connect(
  null,
  dispatch => ({ dispatch })
)(Register);
