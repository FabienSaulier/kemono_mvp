import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Header, Form} from 'semantic-ui-react'
//import {updateUser} from '../../api/users/methods'

 export class EditProfil extends React.Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      //TODO init
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
    console.log("save");
    console.log(this.state);

    Meteor.call('updateUserProfil',
      {userProfil: this.state}
      , (error, res) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert(res, 'success');
        }
      });
  }

  render() {
    let user = this.props.currentUser.profile;

    return (
      <div>
        <Header size='large'>Mon profil</Header>


        Edit Profil: {user.firstName} {user.lastName}

        <Form size='huge'>
          <Form.Field inline required>
            <label>birthday</label>
            <input placeholder='birthday' name='birthday' value={user.birthday} onChange={this.handleInputChange}/>
          </Form.Field>
          <Form.Field inline>
            <label>picture</label>
            <input placeholder='picture' name='picture' value={user.picture} onChange={this.handleInputChange}/>
          </Form.Field>
          <Form.Field inline>
            <label>phone</label>
            <input placeholder='phone' name='phone' value={user.phone} onChange={this.handleInputChange}/>
          </Form.Field>
          <Form.Field inline>
            <label>address.street</label>
            <input placeholder='addressStreet' name='addressStreet' onChange={this.handleInputChange}/>
          </Form.Field>
          <Form.Field inline>
            <label>address.city</label>
            <input placeholder='addressCity' name='addressCity'  onChange={this.handleInputChange} />
          </Form.Field>
          <Form.Field inline>
            <label>address.country</label>
            <input placeholder='addressCountry' name='addressCountry' onChange={this.handleInputChange}/>
          </Form.Field>
          <Form.Field inline>
            <label>address.zip</label>
            <input placeholder='addressZip' name='addressZip' onChange={this.handleInputChange} />
          </Form.Field>
          <Button type='submit' content='Enregistrer' onClick={this.save} icon='save' size='big' labelPosition='left' >Submit</Button>
        </Form>
      </div>
    )
  }
};
