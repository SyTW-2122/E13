import { expect } from 'chai'; 
import { createStore, combineReducers } from 'redux';
import currentUserReducer from '../src/reducers/current-user-reducer';
import signUpReducer from '../src/reducers/sign-up-reducer';
import signInReducer from '../src/reducers/sign-in-reducer';
import authReducer from '../src/reducers/auth-reducer';

import { updateSignInForm, resetSignInForm, updateSignInMessage } from '../src/actions/sign-in-actions'
import { updateSignUpForm, resetSignUpForm, updateSignUpMessage } from '../src/actions/sign-up-actions';
import { setUser, logOut } from '../src/actions/user-actions'
import { setToken } from "../src/actions/auth-actions";

const allReducers = combineReducers({
  currentUser: currentUserReducer,
  signIn: signInReducer,
  signUp: signUpReducer,
  auth: authReducer
}); 

let store;

describe('Redux store test demonstration', () => {
    beforeEach(() => {
        store = createStore(allReducers, {
            currentUser: {
                username : "",
                fullname : "",
                email : "",
                registration : ""
            },
            signIn: {
                username : "",
                password : "",
                msg: ""
            },
            signUp: {
                username : "",
                password : "",
                email : "", 
                passwordRepeat : "",
                register: false,
                validUser : "",
                validPassword : "",
                validEmail : ""
            },
            auth: {
                authToken: ""
            }
        });
    });
    describe('currentUser Reducer test', () => {
        it('Initial state should be empty', () => {
            // El estado inicial debe ser igual a cadenas vacías
            expect(store.getState().currentUser.username).to.equal("");
            expect(store.getState().currentUser.fullname).to.equal("");
            expect(store.getState().currentUser.email).to.equal("");
            expect(store.getState().currentUser.registration).to.equal("");
        });
        it('Dispatch SET_USER should change the state', () => {
            // dispatch SET_USER, el estado debe haberse actualizado con los valores correspondientes
            let currDate = new Date().toDateString();
            store.dispatch(setUser({
                username: "Test",
                fullname: "TestUser",
                email: "test@example.com",
                registration: String(currDate)
            }));
            expect(store.getState().currentUser.username).to.equal("Test");
            expect(store.getState().currentUser.fullname).to.equal("TestUser");
            expect(store.getState().currentUser.email).to.equal("test@example.com");
            expect(store.getState().currentUser.registration).to.equal(String(currDate));

            expect(store.getState().currentUser.username).not.to.equal("");
            expect(store.getState().currentUser.fullname).not.to.equal("");
            expect(store.getState().currentUser.email).not.to.equal("");
            expect(store.getState().currentUser.registration).not.to.equal("");

        });
        it('Dispatch LOG_OUT should reset the state', () => {
            // dispatch LOG_OUT, el estado debe haber retornado a su valor inicial
            let currDate = new Date().toDateString();
            store.dispatch(setUser({
                username: "Test",
                fullname: "TestUser",
                email: "test@example.com",
                registration: String(currDate)
            }));
            expect(store.getState().currentUser.username).not.to.equal("");
            expect(store.getState().currentUser.fullname).not.to.equal("");
            expect(store.getState().currentUser.email).not.to.equal("");
            expect(store.getState().currentUser.registration).not.to.equal("");

            store.dispatch(logOut());
            expect(store.getState().currentUser.username).to.equal("");
            expect(store.getState().currentUser.fullname).to.equal("");
            expect(store.getState().currentUser.email).to.equal("");
            expect(store.getState().currentUser.registration).to.equal("");
        });
        it('Dispatch an unvalid action should not modify the state', () => {
            // dispatch una acción no registrada y esperar que el estado no cambie
            store.dispatch({ type: 'UNKNOWN_ACTION' });
            expect(store.getState().currentUser.username).to.equal("");
            expect(store.getState().currentUser.fullname).to.equal("");
            expect(store.getState().currentUser.email).to.equal("");
            expect(store.getState().currentUser.registration).to.equal("");
        });
    });


    describe('signIn Reducer test', () => {
        it('Initial state should be empty', () => {
            // El estado inicial debe ser igual a cadenas vacías
            expect(store.getState().signIn.username).to.equal("");
            expect(store.getState().signIn.password).to.equal("");
            expect(store.getState().signIn.msg).to.equal("");
        });
        it('Dispatch UPDATE_SI_FORM with name = username should modify only the username', () => {
            store.dispatch(updateSignInForm({
                target: {
                    name: "username",
                    value: "Test"
                }
            }));
            expect(store.getState().signIn.username).to.equal("Test");
            expect(store.getState().signIn.password).to.equal("");
            expect(store.getState().signIn.password).not.to.equal("Test");
            expect(store.getState().signIn.msg).to.equal("");
            expect(store.getState().signIn.msg).not.to.equal("Test");            
        });
        it('Dispatch UPDATE_SI_FORM with name = password should modify only the password', () => {
            store.dispatch(updateSignInForm({
                target: {
                    name: "password",
                    value: "TestPW"
                }
            }));
            expect(store.getState().signIn.username).to.equal("");
            expect(store.getState().signIn.username).not.to.equal("TestPW");
            expect(store.getState().signIn.password).to.equal("TestPW");
            expect(store.getState().signIn.msg).to.equal("");
            expect(store.getState().signIn.msg).not.to.equal("TestPW");            
        });
        it('Dispatch UPDATE_SI_FORM with name = UNKNOWN should not create a new property on the status', () => {
            store.dispatch(updateSignInForm({
                target: {
                    name: "UNKNOWN",
                    value: "Notvalid"
                }
            }));
            expect(store.getState().signIn.UNKNOWN).to.be.undefined;           
        });
        it('Dispatch UPDATE_SI_MSG should modify the msg property of the state', () => {
            expect(store.getState().signIn.msg).to.equal("");
            store.dispatch(updateSignInMessage("Este es un nuevo mensaje"));
            expect(store.getState().signIn.msg).to.equal("Este es un nuevo mensaje");
        });
        it('Dispatch RESET_SI_FORM should reset the state', () => {
            store.dispatch(updateSignInForm({
                target: {
                    name: "username",
                    value: "Test"
                }
            }));
            store.dispatch(updateSignInForm({
                target: {
                    name: "password",
                    value: "TestPW"
                }
            }));
            store.dispatch(updateSignInMessage("TestMSG"));

            expect(store.getState().signIn.username).to.equal("Test");
            expect(store.getState().signIn.password).to.equal("TestPW");
            expect(store.getState().signIn.msg).to.equal("TestMSG");
            
            //Reset
            store.dispatch(resetSignInForm());
            expect(store.getState().signIn.username).to.equal("");
            expect(store.getState().signIn.password).to.equal("");
            expect(store.getState().signIn.msg).to.equal("");
        });
    });
    
    
    describe('signUp Reducer test', () => {
        it('Initial state should be empty', () => {
            // El estado inicial debe ser igual a cadenas vacías
            expect(store.getState().signUp.username).to.equal("");
            expect(store.getState().signUp.password).to.equal("");
            expect(store.getState().signUp.email).to.equal("");
            expect(store.getState().signUp.passwordRepeat).to.equal("");
            expect(store.getState().signUp.register).to.equal(false);
            expect(store.getState().signUp.validUser).to.equal("");
            expect(store.getState().signUp.validPassword).to.equal("");
            expect(store.getState().signUp.validEmail).to.equal("");
        });
        it('Dispatch UPDATE_SU_FORM with name = username should modify only the username', () => {
            store.dispatch(updateSignUpForm({
                target: {
                    name: "username",
                    value: "Test"
                }
            }));

            expect(store.getState().signUp.username).to.equal("Test");
            expect(store.getState().signUp.password).to.equal("");
            expect(store.getState().signUp.email).to.equal("");
            expect(store.getState().signUp.passwordRepeat).to.equal("");
            expect(store.getState().signUp.register).to.equal(false);
            expect(store.getState().signUp.validUser).to.equal("");
            expect(store.getState().signUp.validPassword).to.equal("");
            expect(store.getState().signUp.validEmail).to.equal("");
        });
        it('Dispatch UPDATE_SU_FORM with name = password should modify only the password', () => {
            store.dispatch(updateSignUpForm({
                target: {
                    name: "password",
                    value: "Test"
                }
            }));

            expect(store.getState().signUp.username).to.equal("");
            expect(store.getState().signUp.password).to.equal("Test");
            expect(store.getState().signUp.email).to.equal("");
            expect(store.getState().signUp.passwordRepeat).to.equal("");
            expect(store.getState().signUp.register).to.equal(false);
            expect(store.getState().signUp.validUser).to.equal("");
            expect(store.getState().signUp.validPassword).to.equal("");
            expect(store.getState().signUp.validEmail).to.equal("");
        });
        it('Dispatch UPDATE_SU_FORM with name = email should modify only the email', () => {
            store.dispatch(updateSignUpForm({
                target: {
                    name: "email",
                    value: "Test"
                }
            }));

            expect(store.getState().signUp.username).to.equal("");
            expect(store.getState().signUp.password).to.equal("");
            expect(store.getState().signUp.email).to.equal("Test");
            expect(store.getState().signUp.passwordRepeat).to.equal("");
            expect(store.getState().signUp.register).to.equal(false);
            expect(store.getState().signUp.validUser).to.equal("");
            expect(store.getState().signUp.validPassword).to.equal("");
            expect(store.getState().signUp.validEmail).to.equal("");
        });
        it('Dispatch UPDATE_SU_FORM with name = passwordRepeat should modify only the passwordRepeat', () => {
            store.dispatch(updateSignUpForm({
                target: {
                    name: "passwordRepeat",
                    value: "Test"
                }
            }));

            expect(store.getState().signUp.username).to.equal("");
            expect(store.getState().signUp.password).to.equal("");
            expect(store.getState().signUp.email).to.equal("");
            expect(store.getState().signUp.passwordRepeat).to.equal("Test");
            expect(store.getState().signUp.register).to.equal(false);
            expect(store.getState().signUp.validUser).to.equal("");
            expect(store.getState().signUp.validPassword).to.equal("");
            expect(store.getState().signUp.validEmail).to.equal("");
        });
        it('Dispatch UPDATE_SU_FORM with name = register should modify only the register boolean', () => {
            store.dispatch(updateSignUpForm({
                target: {
                    name: "register",
                    value: true
                }
            }));

            expect(store.getState().signUp.username).to.equal("");
            expect(store.getState().signUp.password).to.equal("");
            expect(store.getState().signUp.email).to.equal("");
            expect(store.getState().signUp.passwordRepeat).to.equal("");
            expect(store.getState().signUp.register).to.equal(true);
            expect(store.getState().signUp.validUser).to.equal("");
            expect(store.getState().signUp.validPassword).to.equal("");
            expect(store.getState().signUp.validEmail).to.equal("");
        });
        it('Dispatch UPDATE_SU_FORM with name = UNKNOWN should not create a new property on the status', () => {
            store.dispatch(updateSignUpForm({
                target: {
                    name: "UNKNOWN",
                    value: "Test"
                }
            }));

            expect(store.getState().signUp.UNKNOWN).to.be.undefined;
        });
        it('Dispatch UPDATE_SU_MSG should modify the output messages properties', () => {
            expect(store.getState().signUp.validUser).to.equal("");
            expect(store.getState().signUp.validPassword).to.equal("");
            expect(store.getState().signUp.validEmail).to.equal("");

            store.dispatch(updateSignUpMessage({
                validUser: "Test"
            }));

            expect(store.getState().signUp.validUser).to.equal("Test");
            expect(store.getState().signUp.validPassword).to.equal("");
            expect(store.getState().signUp.validEmail).to.equal("");

            store.dispatch(updateSignUpMessage({
                validPassword: "Test"
            }));

            expect(store.getState().signUp.validUser).to.equal("Test");
            expect(store.getState().signUp.validPassword).to.equal("Test");
            expect(store.getState().signUp.validEmail).to.equal("");

            store.dispatch(updateSignUpMessage({
                validEmail: "Test"
            }));

            expect(store.getState().signUp.validUser).to.equal("Test");
            expect(store.getState().signUp.validPassword).to.equal("Test");
            expect(store.getState().signUp.validEmail).to.equal("Test");

            store.dispatch(updateSignUpMessage({
                validUser: "1",
                validPassword: "2",
                validEmail: "3"
            }));

            expect(store.getState().signUp.validUser).to.equal("1");
            expect(store.getState().signUp.validPassword).to.equal("2");
            expect(store.getState().signUp.validEmail).to.equal("3");
        });
        it('Dispatch RESET_SU_FORM should reset the state', () => {
            store.dispatch(updateSignUpForm({
                target: {
                    name: "username",
                    value: "Test"
                }
            }));
            store.dispatch(updateSignUpForm({
                target: {
                    name: "password",
                    value: "Test"
                }
            }));
            store.dispatch(updateSignUpForm({
                target: {
                    name: "email",
                    value: "Test"
                }
            }));
            store.dispatch(updateSignUpForm({
                target: {
                    name: "passwordRepeat",
                    value: "Test"
                }
            }));
            store.dispatch(updateSignUpForm({
                target: {
                    name: "register",
                    value: true
                }
            }));
            store.dispatch(updateSignUpMessage({
                validUser: "1",
                validPassword: "2",
                validEmail: "3"
            }));

            expect(store.getState().signUp.username).to.equal("Test");
            expect(store.getState().signUp.password).to.equal("Test");
            expect(store.getState().signUp.email).to.equal("Test");
            expect(store.getState().signUp.passwordRepeat).to.equal("Test");
            expect(store.getState().signUp.register).to.equal(true);
            expect(store.getState().signUp.validUser).to.equal("1");
            expect(store.getState().signUp.validPassword).to.equal("2");
            expect(store.getState().signUp.validEmail).to.equal("3");

            //Reset
            store.dispatch(resetSignUpForm());

            expect(store.getState().signUp.username).to.equal("");
            expect(store.getState().signUp.password).to.equal("");
            expect(store.getState().signUp.email).to.equal("");
            expect(store.getState().signUp.passwordRepeat).to.equal("");
            expect(store.getState().signUp.register).to.equal(false);
            expect(store.getState().signUp.validUser).to.equal("");
            expect(store.getState().signUp.validPassword).to.equal("");
            expect(store.getState().signUp.validEmail).to.equal("");
        });
    });


    describe('auth Reducer test', () => {
        it('Initial state should be empty', () => {
            // El estado inicial debe ser igual a cadenas vacías
            expect(store.getState().auth.authToken).to.equal("");
        });
        it('Dispatch SET_TOKEN should update the authToken value', () => {
            expect(store.getState().auth.authToken).to.equal("");
            
            store.dispatch(setToken("exampleAuxToken"));

            expect(store.getState().auth.authToken).to.equal("exampleAuxToken");
        });
    });
});