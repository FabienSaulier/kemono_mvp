import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Header, Form, Input } from 'semantic-ui-react'
import { browserHistory } from 'react-router';


 export class EditPet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
    console.log("save");
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
    return (
      <div>
        <Header size='large'>Ajout d'un animal</Header>
        <Form style={{width:'400px'}} size='huge'>
          <Form.Field   required >
            <label>Date de naissance</label>
            <Input placeholder="DD/MM/YYYY"  name="birthday" value={this.state.birthday} onChange={this.handleInputChange} />
          </Form.Field>
          <Form.Field   >
            <label>Photo de profil</label>
            <Input type="file" id="fileinput"  name='picture' value={this.state.picture} onChange={this.handleInputChange} />
          </Form.Field>
          <Form.Field  >
            <label>N° de téléphone</label>
            <Input placeholder='phone'    name='phone' value={this.state.phone} onChange={this.handleInputChange}/>
          </Form.Field>
          <Form.Field  >
            <label>Addresse</label>
            <Input placeholder='addressStreet'  name='addressStreet' onChange={this.handleInputChange}/>
          </Form.Field>
          <Form.Field  >
            <label>Ville</label>
            <Input placeholder='addressCity'  name='addressCity'  onChange={this.handleInputChange} />
          </Form.Field>
          <Form.Field   >
            <label>Code postal</label>
            <Input placeholder='addressZip'  name='addressZip' onChange={this.handleInputChange} />
          </Form.Field>
          <Form.Field  >
            <label>Pays</label>
            <Input placeholder='addressCountry'     name='addressCountry' onChange={this.handleInputChange}/>
          </Form.Field>
          <Button type='submit' onClick={this.save}  size='big'>Enregistrer</Button>
        </Form>
      </div>
    )
  }
};
