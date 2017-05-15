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
    this.state={};
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClickProceedPaiement = this.handleClickProceedPaiement.bind(this);
    this.authorizationOK = this.authorizationOK.bind(this);
  }

  authorizationOK(){
    if(!this.state.ok_monthly){
      Bert.alert('Vous devez accepter le paiement mensuel', 'danger');
      return false;
    }
    if(!this.state.ok_save){
      Bert.alert('Vous devez accepter la sauvegarde de vos coordonner bancaire', 'danger');
      return false;
    }
    if(!this.state.ok_refound){
      Bert.alert('Vous devez cocher la case je déclare être conscient que Kemono n’a aucune obligation concernant le pourcentage de remboursement effectif des demandes.', 'danger');
      return false;
    }
    return true;
  }

  handleClickProceedPaiement(){
    const self = this;
    if(!this.authorizationOK()) return;

    // Create registration card
    Meteor.call("createCardRegistration", (err, retour) => {
      if(err) {
        console.log(err);
      } else {
        // construct card registration data with info provide by mangopay
        mangoPay.cardRegistration.baseURL = "https://api.sandbox.mangopay.com";
        mangoPay.cardRegistration.clientId = 'foobinou';
        mangoPay.cardRegistration.init({
            cardRegistrationURL : retour.CardRegistrationURL,
            preregistrationData : retour.PreregistrationData,
            accessKey : retour.AccessKey,
            Id : retour.Id,
         });

        var cardData = {
             cardNumber: self.state.cardNumber,
             cardExpirationDate: self.state.expirationDate,
             cardCvx: self.state.securityCode,
             cardType: 'CB_VISA_MASTERCARD'
        };
console.log(cardData);
        // register the card
        mangoPay.cardRegistration.registerCard(
            cardData,
            function(res) {
              console.log("REGISTRATION SUCCESS");
              let cardInfo = {id:res.CardId, type:res.CardType, currency:res.Currency, status:res.Status};
              Meteor.call("saveCardInfo", cardInfo,  (err, res) => {
                if(err) {
                  console.log(err);
                } else {
                  console.log(res);
                }
              });

              // update the card to confirme the registration
              regData = {Id:res.Id, RegistrationData:res.RegistrationData }
              Meteor.call("updateCardRegistration", regData, (err, res) => {
                if(err) {
                  console.log(err);
                } else {
                  console.log(res);

                  // make the initial paiement
                  let subscription = self.props.params.sub;
                  Meteor.call("initPaiementRegistration", subscription, (err, res) => {
                    if(err) {
                      console.log("paiement failed");
                      console.log(err);
                    } else {
                      console.log("paiement succeeded");
                      console.log(res);
                    }
                  });
                }
              });
            },
            function(error) {
              Bert.alert(error.ResultMessage,'danger');
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
            <FormGroup controlId='cardNumber'>
              <ControlLabel>N° de carte</ControlLabel>
              <FormControl name='cardNumber' componentClass="input" placeholder="N° de carte" style={{width :'350px'}} onChange={this.handleInputChange} />
            </FormGroup>
            <FormGroup controlId='name'>
              <ControlLabel>Nom</ControlLabel>
              <FormControl name='userName' componentClass="input" placeholder="Nom" style={{width :'350px'}} onChange={this.handleInputChange} />
            </FormGroup>
            <FormGroup controlId='expirationDate'>
              <ControlLabel>Date d'expiration</ControlLabel>
              <FormControl name='expirationDate' componentClass="input" placeholder="Forme MMYY (sans tiret)" style={{width :'350px'}} onChange={this.handleInputChange} />
            </FormGroup>
            <FormGroup controlId='securityCode'>
              <ControlLabel>Code de sécurité</ControlLabel>
              <FormControl name='securityCode' componentClass="input" placeholder="Code de sécurité" style={{width :'350px'}} onChange={this.handleInputChange} />
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
