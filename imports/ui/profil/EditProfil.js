import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Header, Form, Input } from 'semantic-ui-react'
import { browserHistory } from 'react-router';
//import DatePicker from 'react-datepicker'
//import moment from 'moment'
//import 'react-datepicker/dist/react-datepicker.css';

 export class EditProfil extends React.Component {
  constructor(props) {
    super(props);
    let userProfil = props.currentUser.profile;
    this.state = {
      'picture': userProfil.picture,
      'phone': userProfil.phone,
      'birthday': userProfil.birthday
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
  }

  render() {
    return (
      <div>
        <Header size='large'>Modifier le profil</Header>
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
          <Form.Field  name='addressCountry' label='Pays' control='select' >
            <option value='France' onChange={this.handleInputChange} >France</option>
          </Form.Field>
          <Button type='submit' onClick={this.save}  size='big'>Enregistrer</Button>
        </Form>
      </div>
    )
  }
};
