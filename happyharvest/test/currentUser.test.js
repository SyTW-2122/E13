import { expect } from 'chai'; 
import { createStore, combineReducers } from 'redux';
import currentUserReducer from '../src/reducers/current-user-reducer';
import signUpReducer from '../src/reducers/sign-up-reducer';
import signInReducer from '../src/reducers/sign-in-reducer';
import authReducer from '../src/reducers/auth-reducer';

import { setUser, logOut } from '../src/actions/user-actions'

const allReducers = combineReducers({
  currentUser: currentUserReducer,
  signIn: signInReducer,
  signUp: signUpReducer,
  auth: authReducer
}); 

let store 

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
        it('Should increment value on TEST_ACTION', () => {
            // El estado inicial debe ser igual a cadenas vacías
            expect(store.getState().currentUser.username).to.equal("");
            expect(store.getState().currentUser.fullname).to.equal("");
            expect(store.getState().currentUser.email).to.equal("");
            expect(store.getState().currentUser.registration).to.equal("");

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

            // dispatch LOG_OUT, el estado debe haber retornado a su valor inicial
            store.dispatch(logOut());
            expect(store.getState().currentUser.username).to.equal("");
            expect(store.getState().currentUser.fullname).to.equal("");
            expect(store.getState().currentUser.email).to.equal("");
            expect(store.getState().currentUser.registration).to.equal("");
            // dispatch una acción no registrada y esperar que el estado no cambie
            store.dispatch({ type: 'UNKNOWN_ACTION' });
            expect(store.getState().currentUser.username).to.equal("");
            expect(store.getState().currentUser.fullname).to.equal("");
            expect(store.getState().currentUser.email).to.equal("");
            expect(store.getState().currentUser.registration).to.equal("");
        });
    });
});