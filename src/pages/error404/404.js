import { FormatAlignCenter } from '@material-ui/icons';
import React from 'react';

const P404= () => {


  return (
    <div>
      <h1>404</h1>
      <img src={"/images/errorImage.pnp"} style={FormatAlignCenter}/>
      <p>Det finns inget på den här sidan</p>
    </div>
  );
};

export default P404;