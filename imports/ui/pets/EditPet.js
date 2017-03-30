import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Header, Form, Input, Radio, Select } from 'semantic-ui-react'
import { browserHistory } from 'react-router';


 export class EditPet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'name': '',
      'picture': '',
      'type': '',
      'birthday': '',
      'sex':'male'

    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.save = this.save.bind(this);
  }


  handleChange = (e, { value }) => {
    console.log(e);
    console.log(value);
    this.setState({ value })
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
      console.log(this.state);
  }


  save(event){
    event.preventDefault();
    console.log("save");
    console.log(this.state);
    /*
    let userToUpdate = this.state;
    Meteor.call('updateUserProfil',
      {userProfil: userToUpdate}
      , (error, res) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert(res, 'success');
          browserHistory.push('/profil');
        }
      });
      */
  }

  render() {
     const { sex } = this.state
    return (
      <div>
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
          <Form.Field  required name='type' label='Type' control='select' >
            <option value='dog' onChange={this.handleInputChange} >Chien</option>
            <option value='cat' onChange={this.handleInputChange} >Chat</option>
            <option value='nac' onChange={this.handleInputChange} >Nac</option>
          </Form.Field>
          <Form.Group inline>
            <label>Sexe</label>
            <Form.Field control={Radio} label='Mâle' value='male' checked={sex === 'male'} onChange={this.handleChange} />
            <Form.Field control={Radio} label='Femelle' value='female' checked={sex === 'female'} onChange={this.handleChange} />
          </Form.Group>

          <Form.Field   required >
            <label>Date de naissance</label>
            <Input placeholder="DD/MM/YYYY"  name="birthday" value={this.state.birthday} onChange={this.handleInputChange} />
          </Form.Field>
          <Button type='submit' onClick={this.save}  size='big'>Enregistrer mon animal</Button>
        </Form>
      </div>
    )
  }
};
