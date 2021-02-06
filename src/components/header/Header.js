import React from 'react';
import Typography from "@material-ui/core/Typography";
import UseStyles from './Styles'

// Use Props for headers to call it in all pages
const Header = ({title,icon}) => {
  const classes = UseStyles();
  return (
    <div className={classes.header}>
      {icon}
      <Typography className={classes.headerTitle}>
        {title}
      </Typography>
    </div>
  );
};

export default Header;