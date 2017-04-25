import React from 'react';
import {Meteor} from 'meteor/meteor';
import {HTTP} from 'meteor/http';
import { EJSON } from 'meteor/ejson';
import {Form, PageHeader, FormGroup, FormControl,Row, Grid, Col, Checkbox,
  Glyphicon, Button, ControlLabel, Radio, Panel, Image, Modal} from 'react-bootstrap'
import {browserHistory} from 'react-router';
import moment from 'moment';
import {Cropper} from 'react-image-cropper'

import Images from '../../api/files/images.js';
import ProfilImage from '../components/ProfilImage';
import {FormSelectDay, FormSelectYear, FormSelectMonth} from '../components/FormSelectDMY';

export class EditProfil extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    let userProfile = props.currentUser.profile;
    let bdDay = -1;
    let bdMonth = -1;
    let bdYear = -1;
    if(userProfile.birthday){
      bdDay = moment(userProfile.birthday).date();
      bdMonth = moment(userProfile.birthday).month();
      bdYear = moment(userProfile.birthday).year();
    }

    this.state = {
      'lastName':userProfile.lastName,
      'firstName':userProfile.firstName,
      'sex': userProfile.sex,
      'bdDay': bdDay, // not saved
      'bdMonth': bdMonth, // not saved
      'bdYear': bdYear, // not saved
      'address': userProfile.address,
      'zipCode':userProfile.zipCode,
      'city': userProfile.city,
      'country': 'France',
      'phone': userProfile.phone,
      'picture': userProfile.picture,
      'description': userProfile.description,
      'pictureUploaded': false // not saved
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.save = this.save.bind(this);
    this.getBdDate = this.getBdDate.bind(this);
  //  this.handleInputFile = this.handleInputFile.bind(this);
  //  this.handleUploadedFile = this.handleUploadedFile.bind(this);
  }

/*
  handleUploadedFile(fileObj){
    const uploadedFileName = fileObj._id+"-"+fileObj.original.name;
    this.setState({'picture':uploadedFileName});
    this.setState({'pictureUploaded':true});
  }


  handleSelectedFile(file){
    const newFile = new FS.File(file);
    newFile.user_id = Meteor.userId();
    console.log(this.state);
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
*/
/*
  handleInputFile(event){
    const f = event.target.files[0];
    const newFile = new FS.File(f);
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
  */

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  getBdDate(){
    if( this.state.bdYear >=0  && this.state.bdMonth  >=0 && this.state.bdDay>=0){
      let bdDate = moment({year:this.state.bdYear,month:this.state.bdMonth, day:this.state.bdDay}).toDate();
      if(moment(bdDate).isValid())
        return bdDate;
      else
        return null;
    }
    else{
      return null;
    }
  }

  save(event){
    event.preventDefault();
    let userToUpdate = {};
    userToUpdate = Object.assign(userToUpdate, this.state)
    userToUpdate.birthday = this.getBdDate();
    delete userToUpdate.bdDay;
    delete userToUpdate.bdMonth;
    delete userToUpdate.bdYear;
    delete userToUpdate.pictureUploaded;

    Meteor.call('updateUserProfile',
      userToUpdate
      , (error, res) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert("Enregistré avec succès", 'success');
        }
      });
  }

  render() {
    return (
      <Grid>
      <Col sm={2}>
        <ProfilImage idImage={this.props.currentUser.profile.picture} type='human' />
      </Col>
      <Col sm={10}>
        <Form horizontal>
          <Panel header="Informations privées - Cela reste entre vous et nous !"  >
            <FormGroup controlId="formHorizontalEmail" bsSize="small">
              <Col className='required' componentClass={ControlLabel} sm={2}>
                Nom
              </Col>
              <Col sm={6}>
                <FormControl type="text" placeholder="Nom" name='lastName' value={this.state.lastName} onChange={this.handleInputChange} />
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalEmail" bsSize="small">
              <Col className='required' componentClass={ControlLabel} sm={2}>
                Prénom
              </Col>
              <Col sm={6}>
                <FormControl type="text" placeholder="Prénom" name='firstName' value={this.state.firstName} onChange={this.handleInputChange} />
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalPassword" bsSize="small">
              <Col className='required' componentClass={ControlLabel} sm={2}>
                Sexe
              </Col>
              <Col sm={6}>
                <Radio inline  name='sex' value="man" checked={"man" == this.state.sex} onChange={this.handleInputChange} >Homme</Radio>
                <Radio inline  name='sex' value="woman" checked={"woman" == this.state.sex}  onChange={this.handleInputChange} >Femme</Radio>
              </Col>
            </FormGroup>
            <FormGroup  controlId="formControlsSelect" bsSize="small">
              <Col className='required' componentClass={ControlLabel} sm={2}>
                Date de naissance
              </Col>
              <Col sm={1} style={{marginRight:'32px'}}>
                <FormSelectDay bdDay={this.state.bdDay} handleInputChange={this.handleInputChange} />
              </Col>
              <Col sm={1} style={{marginRight:'32px'}}>
                <FormSelectMonth bdMonth={this.state.bdMonth} handleInputChange={this.handleInputChange} />

              </Col>
              <Col sm={1} style={{marginRight:'32px'}}>
                <FormSelectYear bdYear={this.state.bdYear} handleInputChange={this.handleInputChange} />


              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalEmail" bsSize="small">
              <Col className='required' componentClass={ControlLabel} sm={2}>
                N° et rue
              </Col>
              <Col sm={6}>
                <FormControl type="text" placeholder="N° et rue" name='address' value={this.state.address} onChange={this.handleInputChange} />
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalEmail" bsSize="small">
              <Col className='required' componentClass={ControlLabel} sm={2}>
                Code postal
              </Col>
              <Col sm={6}>
                <FormControl type="text" placeholder="Code postal" name='zipCode' value={this.state.zipCode} onChange={this.handleInputChange} />
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalEmail" bsSize="small">
              <Col className='required' componentClass={ControlLabel} sm={2}>
                Ville
              </Col>
              <Col sm={6}>
                <FormControl type="text" placeholder="Ville" name='city' value={this.state.city} onChange={this.handleInputChange} />
              </Col>
            </FormGroup>
            <FormGroup controlId="formControlsSelect" bsSize="small">
              <Col className='required' componentClass={ControlLabel} sm={2}>
                Pays
              </Col>
              <Col sm={6}>
                <FormControl disabled componentClass="select" placeholder="Pays" name='country' value={this.state.country} onChange={this.handleInputChange} >
                  <option value='france' >France</option>
                </FormControl>
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalEmail" bsSize="small">
              <Col className='required' componentClass={ControlLabel} sm={2}>
                Téléphone
              </Col>
              <Col sm={6}>
                <FormControl type="text" placeholder="Téléphone mobile ou fixe" name='phone' value={this.state.phone} onChange={this.handleInputChange} />
              </Col>
            </FormGroup>
          </Panel>

          <Panel header="Votre profil public – Ce que les visiteurs du site Kemono peuvent voir à propos de vous." >
            <FormGroup controlId="formHorizontalEmail" bsSize="small">
              <Col componentClass={ControlLabel} sm={2}>
                Photo portrait
              </Col>
              <Col sm={6}>
                <div>display the existing picture miniature</div>
                <TestModal />
              </Col>
            </FormGroup>


            <FormGroup controlId="formControlsTextarea" bsSize="small">
              <Col componentClass={ControlLabel} sm={2}>
                Description
              </Col>
              <Col sm={6}>
                <FormControl rows="10" componentClass="textarea" placeholder="Si vous le souhaitez, vous pouvez nous laisser quelques lignes pour les autres Kemonautes."
                  name='description' value={this.state.description} onChange={this.handleInputChange}  />
              </Col>
            </FormGroup>
          </Panel>

          <Button type='submit' onClick={this.save}  size='big'>Enregistrer</Button>
        </Form>
      </Col>
      </Grid>
    )
  }
};

class TestModal extends React.Component {
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

  checkImageAvailable(){
    console.log("in checkImageAvailable");
    const imgUrl = "https://s3.eu-central-1.amazonaws.com/kemono1/Images/"+this.state.pictureId
    HTTP.get(imgUrl, this.handleHttpResponse);
  }

  handleHttpResponse(error, response) {
    const self = this;
    if ( error ) {
      console.log(error.response.statusCode);
        Meteor.setTimeout(function(){
          console.log("in timeout..");
          self.checkImageAvailable();
        },2000);
        console.log("after timout");
    } else {
      this.setState({displayPic:'block'})
  }}

  displayCropper(){
    if(this.state.displayPic=='block'){
      return  (
        <Cropper src={"https://s3.eu-central-1.amazonaws.com/kemono1/Images/"+this.state.pictureId} ref="cropper"/>
      )

    } else
      return (
        "loadgin"
      )
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
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
