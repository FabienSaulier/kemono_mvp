import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Header, Form, Input, Radio, Select , Label} from 'semantic-ui-react'
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
    this.handleSexChange = this.handleSexChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    console.log(event);
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





          <Button type='submit' onClick={this.save}  size='big'>Enregistrer mon animal</Button>
        </Form>
      </div>
    )
  }
};
