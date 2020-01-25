import React from 'react';
import { TextField } from '@material-ui/core';
import serialize from 'form-serialize';
import { Button } from '../../components';

const Register = () => {
  let registerForm;
  const submit = e => {
    e.preventDefault();
    const data = serialize(registerForm, { hash: true });
    console.log(data);
  };

  return <>
    <form
      onSubmit={submit}
      ref={el => registerForm = el}
    >
      <TextField
        variant="outlined"
        label="Escolha seu feedname"
        fullWidth
        helperText="Sem espaços ou caracteres especiais"
        name="feedname"
      />
      <Button>
        Salvar
      </Button>
    </form>
  </>;
}

export default Register;
