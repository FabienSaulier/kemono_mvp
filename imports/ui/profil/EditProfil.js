import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Header, Form} from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

import 'react-datepicker/dist/react-datepicker.css';

 export class EditProfil extends React.Component {
  constructor(props) {
    console.log(props);
    super(props);

    let userProfil = props.currentUser.profile;
    this.state = {

      'birthday': moment().locale('fr'),
      'picture': userProfil.picture,
      'phone': userProfil.phone,
      'userProfile': '222',
      'test': {'a':'b','c':'d'}

      //TODO init
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.save = this.save.bind(this);
  }

  handleInputChange(event) {
    console.log(event);
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    console.log(this.state);
    this.setState({
      [name]: value
    });
  }

  handleDateChange(event){
    console.log(event);
    this.setState({'birthday': event});
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
          <Form.Field inline required  >
            <label>birthday</label>
            <DatePicker onChange={this.handleDateChange} selected={this.state.birthday} name="birthday"
               peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" placeholderText="Birthday" />
          </Form.Field>
          <Form.Field inline  >
            <label>picture</label>
            <input placeholder='picture' required  name='picture' value={this.state.picture} onChange={this.handleInputChange}/>
          </Form.Field>
          <Form.Field inline >
            <label>phone</label>
            <input placeholder='phone'    name='phone' value={this.state.phone} onChange={this.handleInputChange}/>
          </Form.Field>
          <Form.Field inline >
            <label>address.street</label>
            <input placeholder='addressStreet'  name='addressStreet' onChange={this.handleInputChange}/>
          </Form.Field>
          <Form.Field inline >
            <label>address.city</label>
            <input placeholder='addressCity'  name='addressCity'  onChange={this.handleInputChange} />
          </Form.Field>
          <Form.Field inline >
            <label>address.country</label>
            <input placeholder='addressCountry'     name='addressCountry' onChange={this.handleInputChange}/>
          </Form.Field>
          <Form.Field inline  >
            <label>address.zip</label>
            <input placeholder='addressZip'  name='addressZip' onChange={this.handleInputChange} />
          </Form.Field>
          <Button type='submit' onClick={this.save}  size='big' labelPosition='left' >Enregistrer</Button>
        </Form>
      </div>
    )
  }
};
