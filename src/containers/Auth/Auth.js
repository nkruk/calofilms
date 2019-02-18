import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import ButtonMUI from '../../components/UI/Button/ButtonMUI';
import Spinner from '../../components/UI/Spinner/Spinner';
import Typography from '@material-ui/core/Typography';
import Alert from '../../components/UI/Alert/Alert';

import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';
class Auth extends Component {
    state = {
        controls: {
            email: {
                ref: 'email',
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Correo electrónico'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                ref: 'password',
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Contraseña'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignup: true,
        alertAuthError: false
    }

     componentDidMount () {
        if ( this.props.authRedirectPath !== '/' ) {
            this.props.onSetAuthRedirectPath();
        }
    } 

    
    inputChangedHandler = ( event, controlName ) => {
        const updatedControls = updateObject( this.state.controls, {
            [controlName]: updateObject( this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity( event.target.value, this.state.controls[controlName].validation ),
                touched: true
            } )
        } );
        this.setState( { controls: updatedControls } );
    }

    submitHandler = ( event ) => {
        event.preventDefault();
        this.props.onAuth( this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup );
    }

    switchAuthModeHandler = () => {
        this.setState( prevState => {
            return { isSignup: !prevState.isSignup };
        } );
     }

    alertClickHandler = () => {
        this.setState( prevState => {
            return { alertAuthError: !prevState.alertAuthError };
        } );
    }

    render () {

        const submitDisabled = this.state.controls.email.valid === true
                            && this.state.controls.password.valid === true
                            ? false : true;

        const formElementsArray = [];
        for ( let key in this.state.controls ) {
            formElementsArray.push( {
                id: key,
                config: this.state.controls[key]
            } );
        }

        let form = formElementsArray.map( formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                name={formElement.id}
                changed={( event ) => {
                    this.inputChangedHandler( event, formElement.id )}
                } />
        ) );


        if ( this.props.loading ) {
            form = <Spinner />
        }

        let errorMessage = null;

        if ( this.props.error ) {
            switch (this.props.error.message) {
                case 'EMAIL_EXISTS':
                  errorMessage = "Este correo electrónico ya ha sido registrado. Por favor pulsa sobre el botón 'Cambiar a Inicio de Sesión' e inténtalo nuevamente";
                  break; 
                case 'EMAIL_NOT_FOUND':
                  errorMessage = "No hay ningún usuario registrado con esa dirección de correo electrónico. Por favor pulsa sobre el botón 'Cambiar a Registro' e inténtalo nuevamente";
                  break; 
                case 'INVALID_PASSWORD':
                  errorMessage = "El usuario está correctamente registrado pero la contraseña es incorrecta.";
                  break; 
                default: 
                  errorMessage = `${this.props.error.message}`;
              }
        }

        let authRedirect = null;
        if ( this.props.isAuthenticated ) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className={classes.Auth} id="main">
            {this.state.isSignup ? <Typography variant="h5" gutterBottom>Registro de usuario</Typography> : <Typography variant="h5" gutterBottom>Inicio de sesión</Typography>}
                {authRedirect}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <ButtonMUI variant="contained" disabled={submitDisabled}>
                    ENVIAR</ButtonMUI>
                </form>
                <ButtonMUI
                    variant="contained"
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger">CAMBIAR A <br></br>{this.state.isSignup ? 'INICIO DE SESIÓN' : 'REGISTRO'}</ButtonMUI>
                { this.props.error ? 
                <Alert title={"Hemos encontrado el siguiente problema:"}
                       messageBody={errorMessage}/> : null}
            </div>
            
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: ( email, password, isSignup ) => dispatch( actions.auth( email, password, isSignup ) ),
        onSetAuthRedirectPath: () => dispatch( actions.setAuthRedirectPath( '/' ) ),
        toggleInAuth: (boolean) => dispatch(actions.toggleInAuth(boolean))
    };
};

export default connect( mapStateToProps, mapDispatchToProps )(Auth);