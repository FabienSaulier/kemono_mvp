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
  }
  this.handleInputFile = this.handleInputFile.bind(this);
  this.close = this.close.bind(this);
  this.open = this.open.bind(this);
  this.cropAndSavePicture = this.cropAndSavePicture.bind(this);
  this.savePic = this.savePic.bind(this);
}

handleInputFile(event){
  this.setState({displayPic:'none'})
  const file = event.target.files[0];
  const reader = new FileReader();
  const url = reader.readAsDataURL(file);
  const self = this;
  reader.onloadend = function (e) {
     this.setState({
         imgSrc: [reader.result],
         displayPic:'block'
     },()=>{console.log("to open"); self.open();})
   }.bind(this);
}

open() {
  console.log("oepn");
  this.setState({ showModal: true });
  document.getElementsByName("fileUpToCrop").value = "";
}

close() {this.setState({ showModal: false })}

cropAndSavePicture(){
  let node = this.refs['piccrop'];
  const self = this;
  this.setState({
      ['piccrop']: node.crop()
  }, ()=>{self.savePic()});
}

savePic(){
  const f = this.state.piccrop;
  const newFile = new FS.File(f);
  newFile.user_id = Meteor.userId();
  var self = this;
  Images.insert(newFile, function (error, fileObj){
    if (error) {
      console.log(error);
      Bert.alert(error.reason, 'danger');
    } else {
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
          src={this.state.imgSrc}/>
      </div>
    )
  } else
    return (
      "loading..."
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
