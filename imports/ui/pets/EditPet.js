import React from 'react';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import {Grid, Form, Panel, Image, FormGroup, FormControl, Col, Checkbox, Button, ControlLabel, Radio} from 'react-bootstrap'

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
      <Grid>
      <Col sm={2}>
        <Image responsive rounded src='/img/no_pic_cat.jpg'  />
      </Col>
      <Col sm={10}>
        <Form horizontal>
          <Panel header="Obligatoire"  >

            <FormGroup controlId="formHorizontalEmail" bsSize="small">
              <Col componentClass={ControlLabel} sm={2}>
                Nom
              </Col>
              <Col sm={4}>
                <FormControl type="text" placeholder="Nom" />
              </Col>
            </FormGroup>

            <FormGroup controlId="formControlsSelect" bsSize="small">
              <Col componentClass={ControlLabel} sm={2}>
                Type
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
              <Col sm={1} style={{marginRight:'32px'}}>
                <FormControl componentClass="select"  >
                  <option value={0}>Jour</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={7}>7</option>
                  <option value={8}>8</option>
                  <option value={9}>9</option>
                  <option value={10}>10</option>
                  <option value={11}>11</option>
                  <option value={12}>12</option>
                  <option value={13}>13</option>
                  <option value={14}>14</option>
                  <option value={15}>15</option>
                  <option value={16}>16</option>
                  <option value={17}>17</option>
                  <option value={18}>18</option>
                  <option value={19}>19</option>
                  <option value={20}>20</option>
                  <option value={21}>21</option>
                  <option value={22}>22</option>
                  <option value={23}>23</option>
                  <option value={24}>24</option>
                  <option value={25}>25</option>
                  <option value={26}>26</option>
                  <option value={27}>27</option>
                  <option value={28}>28</option>
                  <option value={29}>29</option>
                  <option value={30}>30</option>
                  <option value={31}>31</option>
                </FormControl>
              </Col>
              <Col sm={1} style={{marginRight:'32px'}}>
                <FormControl componentClass="select" >
                  <option value={0}>Mois</option>
                  <option value={1}>Janvier</option>
                  <option value={2}>Février</option>
                  <option value={3}>Mars</option>
                  <option value={4}>Avril</option>
                  <option value={5}>Mai</option>
                  <option value={6}>Juin</option>
                  <option value={7}>Juillet</option>
                  <option value={8}>Août</option>
                  <option value={9}>Septembre</option>
                  <option value={10}>Octobre</option>
                  <option value={11}>Novembre</option>
                  <option value={12}>Décembre</option>
                </FormControl>
              </Col>
              <Col sm={1} style={{marginRight:'32px'}}>
                <FormControl componentClass="select" >
                  <option value={null}>Année</option>
                  <option value={2017}>2017</option>
                  <option value={2016}>2016</option>
                  <option value={2015}>2015</option>
                  <option value={2014}>2014</option>
                  <option value={2013}>2013</option>
                  <option value={2012}>2012</option>
                  <option value={2011}>2011</option>
                  <option value={2010}>2010</option>
                  <option value={2009}>2009</option>
                  <option value={2008}>2008</option>
                  <option value={2007}>2007</option>
                  <option value={2006}>2006</option>
                  <option value={2005}>2005</option>
                  <option value={2004}>2004</option>
                  <option value={2003}>2003</option>
                  <option value={2002}>2002</option>
                  <option value={2001}>2001</option>
                  <option value={2000}>2000</option>
                  <option value={1999}>1999</option>
                  <option value={1998}>1998</option>
                  <option value={1997}>1997</option>
                  <option value={1996}>1996</option>
                  <option value={1995}>1995</option>
                  <option value={1994}>1994</option>
                  <option value={1993}>1993</option>
                  <option value={1992}>1992</option>
                  <option value={1991}>1991</option>
                  <option value={1990}>1990</option>
                </FormControl>
              </Col>
            </FormGroup>

            <FormGroup controlId="formControlsSelect" bsSize="small">
              <Col componentClass={ControlLabel} sm={2}>
                Origine de l'animal
              </Col>
              <Col sm={4}>
                <FormControl componentClass="select"  placeholder="select">
                  <option value='breeding'>&Eacute;levage</option>
                  <option value='shelter'>Refuge</option>
                  <option value='hostFamily'>Famille d'acceuil</option>
                  <option value='given'>Donné contre bons soins</option>
                  <option value='found'>Trouvé</option>
                  <option value='other'>Autre</option>
                </FormControl>
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalEmail" bsSize="small">
              <Col componentClass={ControlLabel} sm={2}>
                Race
              </Col>
              <Col sm={4}>
                <FormControl type="text" placeholder="Race" />
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
                Copie de la page 1 du carnet de santé
              </Col>
              <Col sm={4}>
                <FormControl type="file" placeholder="Carnet de vaccins" />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword" bsSize="small">
              <Col componentClass={ControlLabel} sm={2}>
                Animal ne présente aucune maladie?
              </Col>
              <Col sm={4}>
                <Radio inline>Oui</Radio>
                <Radio inline>Non</Radio>
              </Col>
            </FormGroup>

            <FormGroup controlId="formControlsTextarea" bsSize="small">
              <Col componentClass={ControlLabel} sm={2}>
                Si non
              </Col>
              <Col sm={6}>
                <FormControl rows="10" componentClass="textarea" placeholder="Décrivez ici les problèmes de santés que rencontre votre animal."
                  name='healthProblemDesc' value={this.state.description} onChange={this.handleInputChange}  />
              </Col>
            </FormGroup>
          </Panel>

          <Panel header="Facultatif" >
            <FormGroup controlId="formHorizontalEmail" bsSize="small">
              <Col componentClass={ControlLabel} sm={2}>
                Photo de portrait
              </Col>
              <Col sm={4}>
                <FormControl type="file" placeholder="Photo de portrait" />
              </Col>
            </FormGroup>
            <FormGroup controlId="formControlsSelect" bsSize="small">
              <Col componentClass={ControlLabel} sm={2}>
                Zone de vie
              </Col>
              <Col sm={4}>
                <FormControl componentClass="select" placeholder="Zone de vie">
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
