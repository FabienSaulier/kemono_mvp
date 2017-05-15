import React from 'react';
import { Meteor } from 'meteor/meteor';
import {Image, Button, Glyphicon, Checkbox, FormGroup, FormControl, ControlLabel} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router';
import mangoPay from 'mangopay-cardregistration-js-kit';


export class SubPetPaiement extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state={
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }


  handleClickProceedPaiement(){
    Meteor.call("createCardRegistration", (err, res) => {
      if(err) {
        console.log(err);
      } else {
        console.log(res);
        console.log("register card");
        mangoPay.cardRegistration.baseURL = "https://api.sandbox.mangopay.com";
        mangoPay.cardRegistration.clientId = 'foobinou';
        mangoPay.cardRegistration.init({
            cardRegistrationURL : res.CardRegistrationURL,
            preregistrationData : res.PreregistrationData,
            accessKey : res.AccessKey,
            Id : res.Id,
         });

        var cardData = {
             cardNumber: '4706750000000009',
             cardExpirationDate: '1120',
             cardCvx: '888',
             cardType: 'CB_VISA_MASTERCARD'
        };
        mangoPay.cardRegistration.registerCard(
            cardData,
            function(res) {
              console.log("REGISTRATION SUCCESS");
              console.log(res);
              regData = {
                Id:res.Id,
                RegistrationData:res.RegistrationData
              }

              Meteor.call("updateCardRegistration", regData, (err, res) => {
                if(err) {
                  console.log(err);
                } else {
                  console.log(res);
                }
              });

            },
            function(res) {
              console.log("REG FAILED");
              console.log(res);
            }
        );
      }
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  render() {
    return(
      <div>
        <h4>Paiement</h4>
        <div>
          <form>
            <FormGroup controlId='numCard'>
              <ControlLabel>N° de carte</ControlLabel>
              <FormControl componentClass="input" placeholder="N° de carte" style={{width :'350px'}} />
            </FormGroup>
            <FormGroup controlId='name'>
              <ControlLabel>Nom</ControlLabel>
              <FormControl componentClass="input" placeholder="Nom" style={{width :'350px'}} />
            </FormGroup>
            <FormGroup controlId='expirationDate'>
              <ControlLabel>Date d'expiration</ControlLabel>
              <FormControl componentClass="input" placeholder="Forme MMYY (sans tiret)" style={{width :'350px'}} />
            </FormGroup>
            <FormGroup controlId='securityCode'>
              <ControlLabel>Code de sécurité</ControlLabel>
              <FormControl componentClass="input" placeholder="Code de sécurité" style={{width :'350px'}} />
            </FormGroup>
            <Checkbox name='ok_monthly' onChange={this.handleInputChange} >
              En cochant cette case,
              je déclare être conscient du paiement mensuel, à date anniversaire. Je serais informé par email de chaque paiement et
              trouverais un récapitulatif sur /moncompte/. Je pourrais mettre fin à l'abonnement quand je le souhaite.
            </Checkbox>
            <Checkbox name='ok_save' onChange={this.handleInputChange} >
              En cochant cette case,
              j'autorise le prestataire bancaire à conserver les informations de ma carte pour le paiement mensuel.
            </Checkbox>
            <Checkbox name='ok_refound' onChange={this.handleInputChange} >En cochant cette case,
              je déclare être conscient que Kemono n’a aucune obligation concernant le pourcentage de remboursement effectif des demandes.
            </Checkbox>

            <Button onClick={this.handleClickProceedPaiement} >Abonner {this.props.pet.name} à la protection solidaire Kemono (paiement par carte bancaire)</Button>

          </form>

        </div>

      </div>

    )
  }
};
