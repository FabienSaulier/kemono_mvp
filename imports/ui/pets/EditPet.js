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
     const { sex } = this.state
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
          <Form.Field   required >
            <label>Date de naissance</label>
            <Input placeholder="DD/MM/YYYY"  name="birthday" value={this.state.birthday} onChange={this.handleInputChange} />
          </Form.Field>
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
