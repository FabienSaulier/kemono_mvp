import React from 'react';
import {Meteor} from 'meteor/meteor';
import {HTTP} from 'meteor/http';
import {Button, Modal, FormControl, Image} from 'react-bootstrap'
import {Cropper} from 'react-image-cropper'
import Images from '../../api/files/images.js';


export class UploadFileModalWithCropper extends React.Component {
constructor(props){
  super(props);
  this.state={
    showModal:false,
    displayPic:'none',
    displayCroppedPic:'non'

  }
  this.handleInputFile = this.handleInputFile.bind(this);
  this.handleUploadedFile = this.handleUploadedFile.bind(this);
  this.close = this.close.bind(this);
  this.open = this.open.bind(this);
  this.checkImageAvailable = this.checkImageAvailable.bind(this);
  this.handleHttpResponse = this.handleHttpResponse.bind(this);
  this.cropAndSavePicture = this.cropAndSavePicture.bind(this);
  this.savePic = this.savePic.bind(this);

}

handleInputFile(event){
  this.setState({displayPic:'none'})
  const newFile = new FS.File(event.target.files[0]);
  newFile.user_id = Meteor.userId();
  var self = this;
  Images.insert(newFile, function (error, fileObj){
    if (error) {
      console.log(error);
      event.target.value=null; // reset the input file
      Bert.alert(error.reason, 'danger');
    } else {
      self.handleUploadedFile(fileObj);
      Bert.alert("uploaded on s3: succès", 'success');
    }
  });
}

handleUploadedFile(fileObj){
  this.setState({pictureId: fileObj._id+"-"+fileObj.original.name})
  this.checkImageAvailable();
  this.open();
}

open() {
  this.setState({ showModal: true });
  document.getElementsByName("fileUpToCrop").value = "";
}

close() {this.setState({ showModal: false })}

checkImageAvailable(){
  const imgUrl = "https://s3.eu-central-1.amazonaws.com/kemono1/Images/"+this.state.pictureId
  HTTP.get(imgUrl, this.handleHttpResponse);
}

handleHttpResponse(error, response) {
  const self = this;
  if ( error ) {
      Meteor.setTimeout(function(){
        self.checkImageAvailable();
      },2000);
  } else {
    this.setState({displayPic:'block'})
}}

cropAndSavePicture(){
  console.log("cropAndSavePicture");
  let node = this.refs['piccrop'];
  const self = this;
  this.setState({
      ['piccrop']: node.crop()
  }, ()=>{self.savePic()});
}

savePic(){
  const f = this.state.piccrop;
  console.log(f);
  const newFile = new FS.File(f);
  newFile.user_id = Meteor.userId();
  var self = this;
  Images.insert(newFile, function (error, fileObj){
    if (error) {
      console.log(error);
      Bert.alert(error.reason, 'danger');
    } else {
      console.log(fileObj);
      self.props.handleValidatedPic(fileObj._id+"-"+fileObj.original.name)
      Bert.alert("Uploadé avec succès", 'success');
      self.close();
    }
  });
}

displayCropper(){
  if(this.state.displayPic=='block'){
    return  (
      <div>
        <Cropper originX={100} originY={100} allowNewSelection={false} ref="piccrop"
          src={"https://s3.eu-central-1.amazonaws.com/kemono1/Images/"+this.state.pictureId} />
      </div>
    )
  } else
    return (
      "loading"
    )
}

render() {
  return (
    <div>
      <FormControl type="file" placeholder="Photo portrait" name='fileUpToCrop' onChange={this.handleInputFile} style={{float:'left'}} />
      {this.state.piccrop ? <img src={this.state.piccrop} style={{height:'200px', width:'200px', marginTop:'10px'}}/> : null}
      <Modal show={this.state.showModal} onHide={this.close}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          {this.displayCropper()}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.cropAndSavePicture}>Valider</Button>
          <Button onClick={this.close}>Annuler</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
}
