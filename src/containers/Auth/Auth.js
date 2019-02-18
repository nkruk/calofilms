import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import ButtonMUI from '../../components/UI/Button/ButtonMUI';
import Spinner from '../../components/UI/Spinner/Spinner';
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
        isSignup: true
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
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }

        let authRedirect = null;
        if ( this.props.isAuthenticated ) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className={classes.Auth} id="main">
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <ButtonMUI variant="contained" disabled={submitDisabled}>
                    ENVIAR</ButtonMUI>
                </form>
                <Button
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger">CAMBIAR A {this.state.isSignup ? 'INICIO DE SESIÓN' : 'REGISTRO'}</Button>
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