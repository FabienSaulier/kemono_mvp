import React from 'react';
import { Meteor } from 'meteor/meteor';
import {Container, Button, Header, Form, Input, Radio, Select , Label} from 'semantic-ui-react'
import { browserHistory } from 'react-router';




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
      <Container>
        <Header size='large'>Ajouter un compagnon</Header>
        <Form style={{width:'400px'}} size='huge'>
          <Form.Field   required >
            <label>Nom</label>
            <Input placeholder="Nom"  name="name" value={this.state.name} onChange={this.handleInputChange} />
          </Form.Field>
          <Form.Field   >
            <label>Photo</label>
            <Input type="file" id="fileinput"  name='picture' value={this.state.picture} onChange={this.handleInputChange} />
          </Form.Field>
          <Form.Field  name='type' label="Type d'animal" control='select' onChange={this.handleInputChange}  required>
            <option value='dog' >Chien</option>
            <option value='cat' >Chat</option>
            <option value='nac' >NAC</option>
          </Form.Field>
          <Form.Field   required>
            <label>Sex</label>
            <input type="radio" name="sex" value='male' checked={this.state.sex === 'male'} onChange={this.handleInputChange} />
            <span>&nbsp;&nbsp;Mâle</span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="radio" name="sex" value='female' checked={this.state.sex === 'female'} onChange={this.handleInputChange} />
            <span>&nbsp;&nbsp;Femelle</span>
          </Form.Field>
          <label required>date de naissance</label>
          <Form.Group label="Jour" required >
            <Form.Field  name='bdDay' placeholder="Jour" control='select' onChange={this.handleInputChange} >
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
            </Form.Field>
            <Form.Field  name='bdMonth' placeholder="Mois" control='select' onChange={this.handleInputChange} >
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
            </Form.Field>
            <Form.Field  name='bdYear' placeholder="Année" control='select' onChange={this.handleInputChange} >
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
            </Form.Field>
          </Form.Group>



          <Form.Field  name='origin' label="Origine de l'animal" control='select' onChange={this.handleInputChange}   required >
            <option value='breeding'>&Eacute;levage</option>
            <option value='shelter'>Refuge</option>
            <option value='hostFamily'>Famille d'acceuil</option>
            <option value='given'>Donné contre bons soins</option>
            <option value='found'>Trouvé</option>
            <option value='other'>Autre</option>
          </Form.Field>
          <Form.Field   required>
            <label>Animal stérilisé?</label>
          <input type="radio" name="sterilized" value={true} checked={this.state.sterilized === true} onChange={this.handleInputChange} />
            <span>&nbsp;&nbsp;Oui</span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="radio" name="sterilized" value={false} checked={this.state.sterilized === false} onChange={this.handleInputChange} />
            <span>&nbsp;&nbsp;Non</span>
          </Form.Field>
          <Form.Field   required>
            <label>Vaccins a jour?</label>
            <input type="radio" name="vaccines" value={true} checked={this.state.vaccines === true} onChange={this.handleInputChange} />
            <span>&nbsp;&nbsp;Oui</span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="radio" name="vaccines" value={false} checked={this.state.vaccines === false} onChange={this.handleInputChange} />
            <span>&nbsp;&nbsp;Non</span>
          </Form.Field>
          <Form.Field  required >
            <label>Carnet de vaccins</label>
            <Input type="file" id="fileinput"  name='vaccinesPics' value={this.state.vaccinsPics} onChange={this.handleInputChange} />
          </Form.Field>
          <Button type='submit' onClick={this.save}  size='big'>Enregistrer mon animal</Button>
        </Form>
      </Container>
    )
  }
};
