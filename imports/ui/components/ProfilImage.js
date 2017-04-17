import React from 'react';
import PropTypes from 'prop-types';
import {Image} from 'react-bootstrap';

const ProfilImage = (props) => {
  if(props.idImage)
    return <Image responsive rounded src={'https://s3.eu-central-1.amazonaws.com/kemono1/Images/'+props.idImage} />
  else{
    if(props.type == "human")
      return <Image responsive rounded src='/img/no_pic_human.png' />
    else
      return <Image responsive rounded src='/img/no_pic_cat.jpg' />
  }
}

ProfilImage.propTypes = {
  idImage: PropTypes.string,
  type: PropTypes.string
}

export default ProfilImage;
