import React from 'react';
import { Meteor } from 'meteor/meteor';
import {Form, PageHeader, FormGroup, FormControl,Row, Grid, Col, Checkbox, Button, ControlLabel, Radio, Panel, Image} from 'react-bootstrap'
import { browserHistory } from 'react-router';
import  moment from 'moment';

 export class EditProfil extends React.Component {
  constructor(props) {
    super(props);
    let userProfile = props.currentUser.profile;
    let bdDay = moment(userProfile.birthday).date();
    let bdMonth = moment(userProfile.birthday).month();
    let bdYear = moment(userProfile.birthday).year();
    this.state = {
      'lastName':userProfile.lastName,
      'firstName':userProfile.firstName,
      'sex': userProfile.sex,
      'bdDay': bdDay,
      'bdMonth': bdMonth,
      'bdYear': bdYear,
      'address': userProfile.address,
      'zipCode':userProfile.zipCode,
      'city': userProfile.city,
      'country': 'France',
      'phone': userProfile.phone,
      'picture': userProfile.picture,
      'description': userProfile.description
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.save = this.save.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  save(event){
    event.preventDefault();
    let userToUpdate = this.state;
    let birthday = moment({year:this.state.bdYear,month:this.state.bdMonth, day:this.state.bdDay}).toDate();
    userToUpdate.birthday = birthday;
    Meteor.call('updateUserProfil',
      {userProfil: userToUpdate}
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
        <Image responsive rounded src='/img/no_picture.png'  />
      </Col>
      <Col sm={10}>
        <Form horizontal>

          <Panel header="Informations privées - Cela reste entre vous et nous !"  >
            <FormGroup controlId="formHorizontalEmail" bsSize="small">
              <Col componentClass={ControlLabel} sm={2}>
                Nom
              </Col>
              <Col sm={6}>
                <FormControl type="text" placeholder="Nom" name='lastName' value={this.state.lastName} onChange={this.handleInputChange} />
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalEmail" bsSize="small">
              <Col componentClass={ControlLabel} sm={2}>
                Prénom
              </Col>
              <Col sm={6}>
                <FormControl type="text" placeholder="Prénom" name='firstName' value={this.state.firstName} onChange={this.handleInputChange} />
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalPassword" bsSize="small">
              <Col componentClass={ControlLabel} sm={2}>
                Sexe
              </Col>
              <Col sm={6}>
                <Radio inline  name='sex' value="man" checked={"man" == this.state.sex} onChange={this.handleInputChange} >Homme</Radio>
                <Radio inline  name='sex' value="woman" checked={"woman" == this.state.sex}  onChange={this.handleInputChange} >Femme</Radio>
              </Col>
            </FormGroup>
            <FormGroup controlId="formControlsSelect" bsSize="small">
              <Col componentClass={ControlLabel} sm={2}>
                Date de naissance
              </Col>
              <Col sm={1} style={{marginRight:'32px'}}>
                <FormControl componentClass="select" name="bdDay" value={this.state.bdDay} onChange={this.handleInputChange} >
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
                <FormControl componentClass="select" name="bdMonth" value={this.state.bdMonth} onChange={this.handleInputChange}  >
                  <option value={-1}>Mois</option>
                  <option value={0}>Janvier</option>
                  <option value={1}>Février</option>
                  <option value={2}>Mars</option>
                  <option value={3}>Avril</option>
                  <option value={4}>Mai</option>
                  <option value={5}>Juin</option>
                  <option value={6}>Juillet</option>
                  <option value={7}>Août</option>
                  <option value={8}>Septembre</option>
                  <option value={9}>Octobre</option>
                  <option value={10}>Novembre</option>
                  <option value={11}>Décembre</option>
                </FormControl>
              </Col>
              <Col sm={1} style={{marginRight:'32px'}}>
                <FormControl componentClass="select" name="bdYear" value={this.state.bdYear} onChange={this.handleInputChange} >
                  <option value={0}>Année</option>
                  <option value={1990}>1990</option>
                  <option value={1991}>1991</option>
                  <option value={1992}>1992</option>
                  <option value={1993}>1993</option>
                  <option value={1994}>1994</option>
                  <option value={1995}>1995</option>
                  <option value={1996}>1996</option>
                  <option value={1997}>1997</option>
                  <option value={1998}>1998</option>
                  <option value={1999}>1999</option>
                  <option value={2000}>2000</option>
                  <option value={2001}>2001</option>
                  <option value={2002}>2002</option>
                  <option value={2003}>2003</option>
                  <option value={2004}>2004</option>
                  <option value={2005}>2005</option>
                  <option value={2006}>2006</option>
                  <option value={2007}>2007</option>
                  <option value={2008}>2008</option>
                  <option value={2009}>2009</option>
                  <option value={2010}>2010</option>
                  <option value={2011}>2011</option>
                  <option value={2012}>2012</option>
                  <option value={2013}>2013</option>
                  <option value={2014}>2014</option>
                  <option value={2015}>2015</option>
                  <option value={2016}>2016</option>
                  <option value={2017}>2017</option>
                </FormControl>
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalEmail" bsSize="small">
              <Col componentClass={ControlLabel} sm={2}>
                N° et rue
              </Col>
              <Col sm={6}>
                <FormControl type="text" placeholder="N° et rue" name='address' value={this.state.address} onChange={this.handleInputChange} />
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalEmail" bsSize="small">
              <Col componentClass={ControlLabel} sm={2}>
                Code postal
              </Col>
              <Col sm={6}>
                <FormControl type="text" placeholder="Code postal" name='zipCode' value={this.state.zipCode} onChange={this.handleInputChange} />
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalEmail" bsSize="small">
              <Col componentClass={ControlLabel} sm={2}>
                Ville
              </Col>
              <Col sm={6}>
                <FormControl type="text" placeholder="Ville" name='city' value={this.state.city} onChange={this.handleInputChange} />
              </Col>
            </FormGroup>
            <FormGroup controlId="formControlsSelect" bsSize="small">
              <Col componentClass={ControlLabel} sm={2}>
                Pays
              </Col>
              <Col sm={6}>
                <FormControl disabled componentClass="select" placeholder="Pays" name='country' value={this.state.country} onChange={this.handleInputChange} >
                  <option value='france' >France</option>
                </FormControl>
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalEmail" bsSize="small">
              <Col componentClass={ControlLabel} sm={2}>
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
                <FormControl type="file" placeholder="Photo portrait" name='picture' onChange={this.handleInputChange}  />
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
