import React from 'react';
import {Meteor} from 'meteor/meteor';
import {HTTP} from 'meteor/http';
import {Button, Modal, FormControl} from 'react-bootstrap'
import {Cropper} from 'react-image-cropper'
import Images from '../../api/files/images.js';


export class UploadFileModalWithCropper extends React.Component {
constructor(props){
  super(props);
  this.state={
    showModal:false,
    displayPic:'none'

  }
  this.handleInputFile = this.handleInputFile.bind(this);
  this.handleUploadedFile = this.handleUploadedFile.bind(this);
  this.close = this.close.bind(this);
  this.open = this.open.bind(this);
  this.checkImageAvailable = this.checkImageAvailable.bind(this);
  this.handleHttpResponse = this.handleHttpResponse.bind(this);
  this.crop = this.crop.bind(this);
  this.saveCroppedPicture = this.saveCroppedPicture.bind(this);

}

handleInputFile(event){
  this.setState({displayPic:'none'})
  const newFile = new FS.File(event.target.files[0]);
  newFile.user_id = Meteor.userId();
  var self = this;
  Images.insert(newFile, function (error, fileObj){
    if (error) {
      console.log(error);
      Bert.alert(error.reason, 'danger');
    } else {
      self.handleUploadedFile(fileObj);
      Bert.alert("Uploadé avec succès", 'success');
    }
  });
}

handleUploadedFile(fileObj){
  this.setState({pictureId: fileObj._id+"-"+fileObj.original.name})
  this.checkImageAvailable();
  this.open();
}

open() {this.setState({ showModal: true })}

close() {this.setState({ showModal: false })}

crop(){
  let node = this.refs['piccrop'];
  this.setState({
      ['piccrop']: node.crop()
  });
}

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

displayCropper(){
  if(this.state.displayPic=='block'){
    return  (
      <div>
        <Cropper src={"https://s3.eu-central-1.amazonaws.com/kemono1/Images/"+this.state.pictureId} ref="piccrop"/>
        <Button onClick={this.crop}>Crop</Button>
        {this.state.piccrop ? <img src={this.state.piccrop} alt=""/> : null}
      </div>
    )
  } else
    return (
      "loading"
    )
}

saveCroppedPicture(){
  console.log("saveCroppedPicture");
  const f = this.state.piccrop;
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
      this.close();
    }
  });
}

render() {
  return (
    <div>
      <FormControl type="file" placeholder="Photo portrait" name='picture' onChange={this.handleInputFile} style={{float:'left'}} />
      <Modal show={this.state.showModal} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.state.pictureId}
          <br />
          {this.displayCropper()}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.saveCroppedPicture}>Valider</Button>
          <Button onClick={this.close}>Annuler</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
}
