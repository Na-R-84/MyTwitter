import React from 'react';
import Twitt from "./Twitt";

const TwittList = ({data}) => {
  return (
    <div>
      {data.map(twitt => <Twitt data={twitt} />)}
    </div>
  );
};

export default TwittList;