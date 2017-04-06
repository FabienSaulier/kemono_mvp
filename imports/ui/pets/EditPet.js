import React from 'react';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import {Form, PageHeader, FormGroup, FormControl, Col, Checkbox, Button, ControlLabel, Radio} from 'react-bootstrap'

 export class EditPet extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);

    const SELECT_INIT_VALUE_TYPE = "dog";
    const SELECT_INIT_VALUE_ORIGIN = "breeding";

    this.state = {
      name:'',
      picture:'',
      type:SELECT_INIT_VALUE_TYPE,
      sex:'',
      birthday:'',
      origin:SELECT_INIT_VALUE_ORIGIN,
      sterilized:'',
      vaccines:'',
      vaccinesPics:''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.save = this.save.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    let value = null;
    console.log(target.type);
    console.log(target.value);
    if(target.type ==='radio' && (target.value == 'true' || target.value == 'false' ))
      value = (target.value == 'true');
    else
      value =  target.value;

    this.setState({
      [target.name]: value
    });
    console.log(this.state);
  }


  save(event){
    event.preventDefault();
    console.log("save");
    console.log(this.state);

    let pet = this.state;
    Meteor.call('pets.upsert',
      pet
      , (error, res) => {
        if (error) {
          console.log(error);
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert(res, 'success');
          browserHistory.push('/pets');
        }
      });

  }

  render() {

    return (
      <div>
        <PageHeader as='h2'>Mes animaux de compagnie</PageHeader>

        <Form horizontal>

          <FormGroup controlId="formHorizontalEmail" bsSize="small">
            <Col componentClass={ControlLabel} sm={2}>
              Nom
            </Col>
            <Col sm={4}>
              <FormControl type="text" placeholder="Nom" />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalEmail" bsSize="small">
            <Col componentClass={ControlLabel} sm={2}>
              Photo
            </Col>
            <Col sm={4}>
              <FormControl type="file" placeholder="Photo" />
            </Col>
          </FormGroup>

          <FormGroup controlId="formControlsSelect" bsSize="small">
            <Col componentClass={ControlLabel} sm={2}>
              Type d'animal
            </Col>
            <Col sm={4}>
              <FormControl componentClass="select" placeholder="select">
                <option value='dog' >Chien</option>
                <option value='cat' >Chat</option>
                <option value='nac' >NAC</option>
              </FormControl>
            </Col>
          </FormGroup>


          <FormGroup controlId="formHorizontalPassword" bsSize="small">
            <Col componentClass={ControlLabel} sm={2}>
              Sexe
            </Col>
            <Col sm={4}>
              <Radio inline>Mâle</Radio>
              <Radio inline>Femelle</Radio>
            </Col>
          </FormGroup>



          <FormGroup controlId="formControlsSelect" bsSize="small">
            <Col componentClass={ControlLabel} sm={2}>
              Date de naissance
            </Col>
            <Col sm={4}>
              <FormControl componentClass="select" inline placeholder="select">
                <option value='dog' >Chien</option>
                <option value='cat' >Chat</option>
                <option value='nac' >NAC</option>
              </FormControl>
            </Col>
          </FormGroup>


          <FormGroup controlId="formControlsSelect" bsSize="small">
            <Col componentClass={ControlLabel} sm={2}>
              Origine de l'animal
            </Col>
            <Col sm={4}>
              <FormControl componentClass="select" inline placeholder="select">
                <option value='breeding'>&Eacute;levage</option>
                <option value='shelter'>Refuge</option>
                <option value='hostFamily'>Famille d'acceuil</option>
                <option value='given'>Donné contre bons soins</option>
                <option value='found'>Trouvé</option>
                <option value='other'>Autre</option>
              </FormControl>
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword" bsSize="small">
            <Col componentClass={ControlLabel} sm={2}>
              Animal stérilisé?
            </Col>
            <Col sm={4}>
              <Radio inline>Oui</Radio>
              <Radio inline>Non</Radio>
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword" bsSize="small">
            <Col componentClass={ControlLabel} sm={2}>
              Vaccins à jour?
            </Col>
            <Col sm={4}>
              <Radio inline>Oui</Radio>
              <Radio inline>Non</Radio>
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalEmail" bsSize="small">
            <Col componentClass={ControlLabel} sm={2}>
              Carnet de vaccins
            </Col>
            <Col sm={4}>
              <FormControl type="file" placeholder="Carnet de vaccins" />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={4}>
              <Button type="submit">
                Sign in
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    )
  }
};
