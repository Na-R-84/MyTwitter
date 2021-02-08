import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import UseStyles from './Styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import { toast } from 'react-toastify';
import Axios from 'axios';
import { TextField } from '@material-ui/core';

const LOGIN_TAB_VALUE = 1;
const REG_TAB_VALUE = 2;

const LogInPage = () => {
  const classes = UseStyles();

  const [tab, setTab] = useState(LOGIN_TAB_VALUE);

  //login state
  const [userNameLogin, setUsernameLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');

  //register state
  const [emailRegister, setEmailRegister] = useState('');
  const [fullNameRegister, setFullNameRegister] = useState('');
  const [userNameRegister, setUsernameRegister] = useState('');
  const [passwordRegister, setPasswordRegister] = useState('');
  const [confPasswordRegister, setConfPasswordRegister] = useState('');

  const handleChangeTab = (e, newValue) => {
    setTab(newValue);
  };

  const validateLogin = (user) => {
    if (!user.userName) return ' Användarnamn är obligatoriskt';
    if (!user.password) return 'Lösenord är obligatoriskt';
  };
  const validateRegister = (user) => {
    if (!user.userName) return 'Användarnamn är obligatoriskt';
    if (!user.name) return 'Namn  är obligatoriskt';
    if (!user.password) return 'Ange Lösenord';
    if (user.password !== user.confPasswordRegister) return 'Upprepa lösenord';
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const user = {
      name: fullNameRegister,
      userName: userNameRegister,
      password: passwordRegister,
      confPasswordRegister: confPasswordRegister,
    };
    const error = validateRegister(user);
    if (error) return toast.warn('försök igen');
    user.confPasswordRegister = undefined;
    try {
      const { data } = await Axios.post('/api/users', {
        email: emailRegister,
        fullName: fullNameRegister,
        userName: userNameRegister,
        password: passwordRegister,
      });
      toast.success('Skapad');
      localStorage.setItem('fullName', data.user.fullName);
      localStorage.setItem('image', data.user.image);
      localStorage.setItem('userName', data.user.userName);
      localStorage.setItem('token', data.user.token);
      // window.location.reload();
    } catch (err) {
      toast.error('försök igen');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = {
      userName: userNameLogin,
      password: passwordLogin,
    };
    const error = validateLogin(user);
    if (error) return toast.warn('försök igen');
    try {
      const { data } = await Axios.post('/api/users/login', {
        userName: userNameLogin,
        password: passwordLogin,
      });
      toast.success('Skapad');
      localStorage.setItem('fullName', data.user.fullName);
      localStorage.setItem('image', data.image);
      localStorage.setItem('userName', data.userName);
      localStorage.setItem('token', data.user.token);
      window.location.reload();
    } catch (err) {
      toast.error('försök igen');
    }
  };

  return (
    <Paper className={classes.container}>
      <Typography className={classes.headerText}>Välkommen</Typography>
      <Tabs
        value={tab}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChangeTab}
        aria-label="disabled tabs example"
      >
        <Tab label="logga in" value={LOGIN_TAB_VALUE} className={classes.tab} />
        <Tab
          label="skapa konto "
          value={REG_TAB_VALUE}
          className={classes.tab}
        />
      </Tabs>

      {/* Login Tabs */}

      {tab === LOGIN_TAB_VALUE && (
        <form className={classes.containerInput} onSubmit={handleLogin}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Användarnamn"
            name="userNameLogin"
            type="text"
            onChange={(e) => setUsernameLogin(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Lösenord"
            name="passwordLogin"
            type="password"
            onChange={(e) => setPasswordLogin(e.target.value)}
          />
          <Button color="primary" variant="contained" type="submit">
            logga in
          </Button>
        </form>
      )}
      {/* register Tabs */}
      {tab === REG_TAB_VALUE && (
        <form className={classes.containerInput} onSubmit={handleRegister}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Epost-adress"
            name="emailRegister"
            type="email"
            value={emailRegister}
            onChange={(e) => setEmailRegister(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Namn"
            name="fullName"
            type="text"
            onChange={(e) => setFullNameRegister(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Användarnamn"
            name="userName"
            type="text"
            onChange={(e) => setUsernameRegister(e.target.value)}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Lösenord"
            name="passwordRegister"
            type="password"
            onChange={(e) => setPasswordRegister(e.target.value)}
          />

          <TextField className={classes.TextField}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Upprepa lösenord"
            name="confPasswordRegister"
            type="password"
            onChange={(e) => setConfPasswordRegister(e.target.value)}
          />

          <Button type="submit" color="primary" variant="contained">
            Skapa konto
          </Button>
        </form>
      )}
    </Paper>
  );
};

export default LogInPage;
