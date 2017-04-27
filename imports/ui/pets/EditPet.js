import React from 'react';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import {Grid, Form, Panel, Image, FormGroup, FormControl, Col, Checkbox, Button, ControlLabel, Radio} from 'react-bootstrap'
import ProfilImage from '../components/ProfilImage';
import moment from 'moment';

import {FormSelectDay, FormSelectYearShort, FormSelectMonth} from '../components/FormSelectDMY';
import {UploadFileInput} from '../components/UploadFileInput';
import {UploadFileModalWithCropper} from '../components/UploadFileModalWithCropper';



 export class EditPet extends React.Component {
  constructor(props) {
    super(props);

    console.log(props.pet);

    const pet = props.pet;
    let bdDay = undefined;
    let bdMonth = undefined;
    let bdYear = undefined;
    if(pet && pet.birthday){
      bdDay = moment(pet.birthday).date();
      bdMonth = moment(pet.birthday).month();
      bdYear = moment(pet.birthday).year();
    }

    this.state = {
      name: pet?pet.name:'',
      type:pet ? pet.type: "DOG",
      sex:pet? pet.sex:'',
      bdDay: bdDay,
      bdMonth: bdMonth,
      bdYear: bdYear,
      birthday:'',
      origin:pet ? pet.origin : "BREEDING",
      race:pet?pet.race:'',
      sterilized:pet?pet.sterilized:'',
      vaccines:pet?pet.vaccines:'',
      vaccinesPics:pet?pet.vaccinesPics:'',
      healthProblem:pet?pet.healthProblem:'',
      healthProblemDesc:pet?pet.healthProblemDesc:'',
      picture:pet?pet.picture:'',
      livingArea:pet ? pet.livingArea : "INSIDE_AND_OUTSIDE",
      description:pet?pet.description:''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getBdDate = this.getBdDate.bind(this);
    this.save = this.save.bind(this);
    this.handleUploadedVaccinesPic = this.handleUploadedVaccinesPic.bind(this);
    this.handleUploadedProfilPic = this.handleUploadedProfilPic.bind(this);
  }

  handleUploadedProfilPic(fileId){
    this.setState({'picture':fileId}, ()=>{console.log(this.state)});
  }

  handleUploadedVaccinesPic(fileId){
    this.setState({'vaccinesPics':fileId}, ()=>{console.log(this.state)});
  }

  handleInputChange(event) {
    const target = event.target;
    let value = null;
    switch(target.type){
      case 'checkbox':{
        value = target.checked;
        break;
      }
      case 'radio':{
        if(target.value == 'true' || target.value == 'false') // case "Male" / "Female"
          value = (target.value == 'true');
        else
          value = target.value;
        break;
      }
      default:{
        value = target.value;
        break;
      }
    }
//    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleUploadedFile(fileObj){
    const uploadedFileName = fileObj._id+"-"+fileObj.original.name;
    this.setState({'picture':uploadedFileName});
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
    console.log("save");

    let petToUpsert = {};
    petToUpsert = Object.assign(petToUpsert, this.state)

    if(this.props.pet)
      petToUpsert._id = this.props.pet._id;

    petToUpsert.birthday = this.getBdDate();

    delete petToUpsert.bdDay;
    delete petToUpsert.bdMonth;
    delete petToUpsert.bdYear;

    Meteor.call('pets.upsert',
      petToUpsert
      , (error, res) => {
        if (error) {
          console.log(error);
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert("Enregistré avec succès", 'success');
          browserHistory.push('/pets');
        }
      });
  }

  render() {
    return (
      <Grid>
      <Col sm={2}>
        <ProfilImage idImage={this.props.pet ? this.props.pet.picture : undefined} type='pet' />
      </Col>
      <Col sm={10}>
        <Form horizontal>
          <Panel header="Obligatoire"  >

            <FormGroup controlId="formHorizontalEmail" bsSize="small">
              <Col componentClass={ControlLabel} sm={2}>
                Nom
              </Col>
              <Col sm={4}>
                <FormControl type="text" placeholder="Nom" name='name' value={this.state.name} onChange={this.handleInputChange} />
              </Col>
            </FormGroup>

            <FormGroup controlId="formControlsSelect" bsSize="small">
              <Col componentClass={ControlLabel} sm={2}>
                Type
              </Col>
              <Col sm={4}>
                <FormControl componentClass="select" name="type" placeholder="select"  onChange={this.handleInputChange}
                  value={this.state.type} >
                  <option value='DOG' >Chien</option>
                  <option value='CAT' >Chat</option>
                  <option value='NAC' >NAC</option>
                </FormControl>
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword" bsSize="small">
              <Col componentClass={ControlLabel} sm={2}>
                Sexe
              </Col>
              <Col sm={6}>
                <Radio inline  name='sex' value="MALE" checked={"MALE" == this.state.sex} onChange={this.handleInputChange} >Mâle</Radio>
                <Radio inline  name='sex' value="FEMALE" checked={"FEMALE" == this.state.sex}  onChange={this.handleInputChange} >Femelle</Radio>
              </Col>
            </FormGroup>

            <FormGroup controlId="formControlsSelect" bsSize="small">
              <Col componentClass={ControlLabel} sm={2}>
                Date de naissance
              </Col>
              <Col sm={1} style={{marginRight:'32px'}}>
                <FormSelectDay bdDay={this.state.bdDay} handleInputChange={this.handleInputChange} />
              </Col>
              <Col sm={1} style={{marginRight:'32px'}}>
                <FormSelectMonth bdMonth={this.state.bdMonth} handleInputChange={this.handleInputChange} />
              </Col>
              <Col sm={1} style={{marginRight:'32px'}}>
                <FormSelectYearShort bdYear={this.state.bdYear} handleInputChange={this.handleInputChange} />
              </Col>
            </FormGroup>

            <FormGroup controlId="formControlsSelect" bsSize="small">
              <Col componentClass={ControlLabel} sm={2}>
                Origine de l'animal
              </Col>
              <Col sm={4}>
                <FormControl componentClass="select" name="origin" placeholder="select"  onChange={this.handleInputChange}
                  value={this.state.origin} >
                  <option value='BREEDING'>&Eacute;levage</option>
                  <option value='SHELTER'>Refuge</option>
                  <option value='HOSTFAMILY'>Famille d'acceuil</option>
                  <option value='GIVEN'>Donné contre bons soins</option>
                  <option value='FOUND'>Trouvé</option>
                  <option value='OTHER'>Autre</option>
                </FormControl>
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalEmail" bsSize="small">
              <Col componentClass={ControlLabel} sm={2}>
                Race
              </Col>
              <Col sm={4}>
                <FormControl type="text" placeholder="Race" name='race' value={this.state.race} onChange={this.handleInputChange} />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword" bsSize="small">
              <Col componentClass={ControlLabel} sm={2}>
                Animal stérilisé?
              </Col>
              <Col sm={4}>
                <Radio inline  name='sterilized' value={true} checked={true === this.state.sterilized} onChange={this.handleInputChange} >Oui</Radio>
                <Radio inline  name='sterilized' value={false} checked={false === this.state.sterilized} onChange={this.handleInputChange} >Non</Radio>
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword" bsSize="small">
              <Col componentClass={ControlLabel} sm={2}>
                Vaccins à jour?
              </Col>
              <Col sm={4}>
                <Radio inline  name='vaccines' value={true} checked={true === this.state.vaccines} onChange={this.handleInputChange} >Oui</Radio>
                <Radio inline  name='vaccines' value={false} checked={false === this.state.vaccines} onChange={this.handleInputChange} >Non</Radio>
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalEmail" bsSize="small">
              <Col componentClass={ControlLabel} sm={2}>
                Copie de la page 1 du carnet de santé
              </Col>
              <Col sm={4}>
                <UploadFileInput handleUploadedPic={this.handleUploadedVaccinesPic} />
                {this.state.vaccinesPics ? <img src={S3_IMG_URL+this.state.vaccinesPics} style={{height:'200px', width:'200px', marginTop:'10px'}}/> : null}
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalPassword" bsSize="small">
              <Col componentClass={ControlLabel} sm={2}>
                Animal ne présente aucune maladie?
              </Col>
              <Col sm={4}>
                <Radio inline  name='healthProblem' value={true} checked={true === this.state.healthProblem} onChange={this.handleInputChange} >Oui</Radio>
                <Radio inline  name='healthProblem' value={false} checked={false === this.state.healthProblem} onChange={this.handleInputChange} >Non</Radio>
              </Col>
            </FormGroup>

            <FormGroup controlId="formControlsTextarea" bsSize="small">
              <Col componentClass={ControlLabel} sm={2}>
                Si non
              </Col>
              <Col sm={6}>
                <FormControl rows="10" componentClass="textarea" placeholder="Décrivez ici les problèmes de santés que rencontre votre animal."
                  name='healthProblemDesc' value={this.state.healthProblemDesc} onChange={this.handleInputChange}  />
              </Col>
            </FormGroup>
          </Panel>

          <Panel header="Facultatif" >
            <FormGroup controlId="formHorizontalEmail" bsSize="small">
              <Col componentClass={ControlLabel} sm={2}>
                Photo de portrait
              </Col>
              <Col sm={4}>
                <UploadFileModalWithCropper handleValidatedPic={this.handleUploadedProfilPic}/>
              </Col>
            </FormGroup>
            <FormGroup controlId="formControlsSelect" bsSize="small">
              <Col componentClass={ControlLabel} sm={2}>
                Zone de vie
              </Col>
              <Col sm={4}>
                <FormControl name="livingArea" componentClass="select" placeholder="Zone de vie" onChange={this.handleInputChange} value={this.state.livingArea} >
                  <option value='INSIDE_AND_OUTSIDE' >Intérieur et extéreur</option>
                  <option value='INSIDE_ONLY' >Intérieur uniquement</option>
                  <option value='OUTSIDE_ONLY' >Extérieur uniquement</option>
                </FormControl>
              </Col>
            </FormGroup>
            <FormGroup controlId="formControlsTextarea" bsSize="small">
              <Col componentClass={ControlLabel} sm={2}>
                Description
              </Col>
              <Col sm={6}>
                <FormControl rows="10" componentClass="textarea" placeholder="Si vous le souhaitez, vous pouvez nous laisser quelques lignes pour présenter votre animals aux autres Kemonautes."
                  name='description' value={this.state.description} onChange={this.handleInputChange}  />
              </Col>
            </FormGroup>
          </Panel>

        <Button type='submit' onClick={this.save}  size='big' style={{minWidth:'210px'}}>Enregistrer mon animal</Button>
      </Form>
    </Col>
    </Grid>

    )
  }
};
