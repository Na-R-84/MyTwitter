import React from 'react';
import UseStyles from './Styles';
import RightSidebar from '../rightSidebar/RightSidebar';
import LeftSidebar from '../leftsidebar/LeftSidebar';
import Divider from '@material-ui/core/Divider';

const Layout = (props) => {
  const classes = UseStyles();

  return (
    <div className={classes.root}>
      <RightSidebar />
      <Divider orientation={'vertical'} className={classes.divider} />
      <div className={classes.content}>{props.children}</div>
      <Divider orientation={'vertical'} className={classes.divider} />
      <LeftSidebar />
    </div>
  );
};

export default Layout;
