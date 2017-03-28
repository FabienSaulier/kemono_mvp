import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Header, Form} from 'semantic-ui-react'

 export class EditProfil extends React.Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
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
  }

  render() {
    let user = this.props.currentUser.profile;

    return (
      <div>
        <Header size='large'>Mon profil</Header>


        Edit Profil: {user.firstName} {user.lastName}

        <Form size='huge'>
          <Form.Field inline>
            <label>birthday</label>
            <input placeholder='birthday' name='birthday' onChange={this.handleInputChange}/>
          </Form.Field>
          <Form.Field inline>
            <label>picture</label>
            <input placeholder='picture' name='picture'  onChange={this.handleInputChange}/>
          </Form.Field>
          <Form.Field inline>
            <label>phone</label>
            <input placeholder='phone' name='phone' onChange={this.handleInputChange}/>
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
