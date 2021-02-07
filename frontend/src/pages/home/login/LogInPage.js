import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import UseStyles from './Styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { toast } from 'react-toastify';
import Axios from 'axios';
import { TextField } from '@material-ui/core';

const LOGIN_TAB_VALUE = 1;
const REG_TAB_VALUE = 2;

const LogInPage = () => {
  const classes = UseStyles();

  const [tab, setTab] = useState(REG_TAB_VALUE);

  //login state
  const [usernameLogin, setUsernameLogin] = useState();
  const [passwordLogin, setPasswordLogin] = useState();

  //register state
  const [emailRegister, setEmailRegister] = useState();
  const [fullNameRegister, setFullNameRegister] = useState();
  const [usernameRegister, setUsernameRegister] = useState();
  const [passwordRegister, setPasswordRegister] = useState();
  const [confPasswordRegister, setConfPasswordRegister] = useState();

  const handleChangeTab = (e, newValue) => {
    setTab(newValue);
  };

  const validateLogin = (user) => {
    if (!user.username) return ' Användarnamn är obligatoriskt';
    if (!user.password) return 'Lösenord är obligatoriskt';
  };
  const validateRegister = (user) => {
    if (!user.username) return 'Användarnamn är obligatoriskt';
    if (!user.name) return 'Namn  är obligatoriskt';
    if (!user.password) return 'Ange Lösenord';
    if (user.password !== user.confPasswordRegister) return 'Upprepa lösenord';
  };

  const handleRegister = async (e) => {
    console.log('hi');
    e.preventDefault();
    const user = {
      name: fullNameRegister,
      username: usernameRegister,
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
        userName: usernameRegister,
        password: passwordRegister,
      });
      toast.success('Skapad');
      localStorage.setItem('name', data.name);
      localStorage.setItem('image', data.image);
      localStorage.setItem('username', data.username);
      localStorage.setItem('x-auth-token', data['x-auth-token']);
      window.location.reload();
    } catch (err) {
      toast.error('försök igen');
    }
  };
  const handleLogin = () => {
    const user = {
      username: usernameLogin,
      password: passwordLogin,
    };
    const error = validateLogin(user);
    if (error) return toast.warn('försök igen');
    // loginApi(user, (isOk, data) => {
    //   if (!isOk)
    //     return toast.error("försök igen");
    //   toast.success("Inloggad");
    //   localStorage.setItem("name", data.name);
    //   localStorage.setItem("image", data.image);
    //   localStorage.setItem("username", data.username);
    //   localStorage.setItem("x-auth-token", data["x-auth-token"]);
    //   window.location.reload();
    // })
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
        <div className={classes.containerInput}>
          <Typography className={classes.label}>Användarnamn</Typography>
          <Input
            className={'uni_m_b_small'}
            value={usernameLogin}
            onChange={(e) => setUsernameLogin(e.target.value)}
          ></Input>
          <Typography className={classes.label}>Lösenord</Typography>
          <Input
            className={'uni_m_b_small'}
            value={passwordLogin}
            onChange={(e) => setPasswordLogin(e.target.value)}
          />
          <Button variant={'contained'} onClick={handleLogin}>
            logga in
          </Button>
        </div>
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

          <TextField
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
