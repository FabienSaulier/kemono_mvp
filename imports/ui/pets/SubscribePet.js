import React from 'react';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import {Grid, Form, Panel, Image, FormGroup, FormControl,
  Modal, Col, Checkbox, Button, ControlLabel, Radio} from 'react-bootstrap';
import ProfilImage from '../components/ProfilImage';
import {Bert} from 'meteor/themeteorchef:bert';
import Spinner from 'react-spinkit';

export class SubscribePet extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      showLoadingModal: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClickPaiement = this.handleClickPaiement.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleClickPaiement(){
    Meteor.call('paiementToKemonoWallet',
      {
          sub:this.state.sub,
          ok_monthly: this.state.ok_monthly,
          ok_refound: this.state.ok_refound,
          pet_id: this.props.pet._id
      },
      (error, result) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          console.log(result);
          console.log(result.RedirectURL);
          console.log(result.Id);
          this.setState({showLoadingModal:true});
          window.location.replace(result.RedirectURL)
        }
      });
  }


  render(){
    const radioStyle = {
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '1em'
    };
    return(
      <div>
        <Modal show={this.state.showLoadingModal}>
          <Modal.Body>
            Vous allez être redirigé vers notre prestataire de paiement
            <br />
            <br />
            <Spinner spinnerName="three-bounce" />
          </Modal.Body>
        </Modal>

        <Image style={{float:'left', height:'100px'}} src="/img/04_Illustration_com_animaux.png" />
        <p>Vous souhaitez protéger {this.props.pet.name} en rejoignant la communauté des Kemonautes abonnés ?
  Excellente idée ! On vous explique tout les détails ci-dessous.</p>
        <br />
        <br />
        <br />
        <Image style={{float:'left', height:'100px'}} src="/img/monnaie_pieces.png" />
        <p>Chaque début de mois, les Kemonautes versent un abonnement qui vient remplir
          une cagnotte globale, que Kemono utilise pour rembourser les frais vétérinaires.
           Cette contribution vous donne le droit de créer une demande de remboursement,
           si {this.props.pet.name} tombe malade ou a un accident.
           Kemono réinjecte 80% des abonnements dans les demandes de remboursement afin de vous offrir la meilleure protection possible.</p>
        <br />
        <br />
        <Image style={{float:'left', height:'100px'}} src="/img/kemono_ordi.png" />
        <p>Vous avez le choix entre deux formules:</p>
        <br />
        <br />
        <br />
        <br />
        <Grid>
          <Col sm={2}>
          </Col>
          <Col sm={4}>
            <Panel>
              Formule basique
              <br />
              <p>15€ par mois</p>
              <p>Jusqu'à 800€ remboursé par an</p>
              <Radio style={radioStyle}  name='sub' value="basic" checked={"basic" == this.state.sub} onChange={this.handleInputChange} />
            </Panel>
          </Col>
          <Col sm={4}>
            <Panel>
              Formule premium
              <br />
              <p>45€ par mois</p>
              <p>Jusqu'à 2500€ remboursé par an</p>
              <Radio  style={radioStyle}  name='sub' value="premium" checked={"premium" == this.state.sub} onChange={this.handleInputChange} />
            </Panel>
          </Col>
          <Col sm={2}>
          </Col>
        </Grid>
        <Checkbox name='ok_monthly' onChange={this.handleInputChange} >
          En cochant cette case,
          je déclare être conscient du paiement mensuel, à date anniversaire. Je serais informé par email de chaque paiement et
          trouverais un récapitulatif sur /moncompte/. Je pourrais mettre fin à l'abonnement quand je le souhaite.
        </Checkbox>
        <Checkbox name='ok_refound' onChange={this.handleInputChange} >En cochant cette case,
          je déclare être conscient que Kemono n’a aucune obligation concernant le pourcentage de remboursement effectif des demandes.
        </Checkbox>
        <Button onClick={this.handleClickPaiement} >Abonner {this.props.pet.name} à la protection solidaire Kemono (paiement par carte bancaire)</Button>
        <p>Vous allez être redirigé vers notre prestataire de paiement.</p>
      </div>
    )
  }
}
