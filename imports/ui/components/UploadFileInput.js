import React from 'react';
import {Meteor} from 'meteor/meteor';
import {HTTP} from 'meteor/http';
import {Button, Modal, FormControl, Image} from 'react-bootstrap'
import {Cropper} from 'react-image-cropper'
import Images from '../../api/files/images.js';


export class UploadFileInput extends React.Component {
constructor(props){
  super(props);
  this.state={
    displayPic:'none',
    picId:''
  }
  this.handleInputFile = this.handleInputFile.bind(this);
  this.checkImageAvailable = this.checkImageAvailable.bind(this);
  this.handleHttpResponse = this.handleHttpResponse.bind(this);
  this.displayUploadedPic = this.displayUploadedPic.bind(this);
}

handleInputFile(event){
  this.setState({displayPic:'none'})
  const file = event.target.files[0];
  const newFile = new FS.File(file);
  newFile.user_id = Meteor.userId();
  var self = this;
  Images.insert(newFile, function (error, fileObj){
    if (error) {
      console.log(error);
      Bert.alert(error.reason, 'danger');
    } else {
      console.log(fileObj);
      const picId = fileObj._id+"-"+fileObj.original.name;

      self.setState({picLoading:true, picId:picId},
        ()=>{self.checkImageAvailable()});
      self.props.handleUploadedPic(picId);
      Bert.alert("Uploadé avec succès", 'success');
    }
  });
}

checkImageAvailable(){
  const imgUrl = "https://s3.eu-central-1.amazonaws.com/kemono1/Images/"+this.state.picId
  HTTP.get(imgUrl, this.handleHttpResponse);
}

handleHttpResponse(error, response) {
  const self = this;
  if ( error ) {
      Meteor.setTimeout(function(){
        self.checkImageAvailable();
      },2000);
  } else {
    this.setState({displayPic:'block', picLoading:false})
}}

displayUploadedPic(){
  if (this.state.picLoading){
    return "Loading..."
  }
  if(this.state.displayPic=='block'){
    return (
      <img src={S3_IMG_URL+this.state.picId} style={{height:'200px', width:'200px', marginTop:'10px'}}/>
    )
  }
  if(this.state.displayPic=='none' && this.props.currentPic){
    return (
      <img src={S3_IMG_URL+this.props.currentPic} style={{height:'200px', width:'200px', marginTop:'10px'}}/>
    )
  }
  return null;
}

render() {
  return (
    <div>
      <FormControl type="file" placeholder="Photo portrait" name='file' onChange={this.handleInputFile} style={{float:'left'}} />
      {this.displayUploadedPic()}
    </div>
  );
}
}
