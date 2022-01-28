import React from "react";
import {configure, shallow} from "enzyme";
import chai, {expect} from "chai";
import chaiEnzyme from "chai-enzyme";
import Adapter from "enzyme-adapter-react-16";
import SignIn from "../src/components/SignIn";
import SignUp from "../src/components/SignUp";
import { LoginForm } from "../src/components/page-elements/LoginForm";
import { SignUpForm } from "../src/components/page-elements/SignUpForm";
import { Header } from "../src/components/page-elements/Header";
import Footer from "../src/components/page-elements/Footer";
import FarmElement from "../src/components/FarmElement";
import Homepage from "../src/components/Homepage";
import { CropViewer } from "../src/components/CropViewer";


configure({
   adapter: new Adapter()
});

describe("Testing <SignIn/> Component", () => {
   it("Should render main component when there isn't a registered user", () => {
      const wrapper = shallow(<SignIn props={{username: ""}} />);
      expect(wrapper.find("Main").length).to.equals(1);
   });

   it("Should navigate to root when there is a registered user", () => {
      const wrapper = shallow(<SignIn props={{username: "test"}} />);
      expect(wrapper.find("Navigate").length).to.equals(1);
   });
   chai.use(chaiEnzyme());
});

describe("Testing <SignUp/> Component", () => {
   it("Should render main component when there isn't a registered user", () => {
      const wrapper = shallow(<SignUp props={{username: ""}} />);
      expect(wrapper.find("Main").length).to.equals(1);
   });

   it("Should navigate to root when there is a registered user", () => {
      const wrapper = shallow(<SignUp props={{username: "test"}} />);
      expect(wrapper.find("Navigate").length).to.equals(1);
   });
   chai.use(chaiEnzyme());
});

describe("Testing <LoginForm/> Component", () => {
   it("Should update username", () => {
      let fakeState = {username: "", password: "", msg: ""};
      expect(fakeState.username).to.be.equal("");
      const wrapper = shallow(<LoginForm signIn={fakeState} onUpdateSignInForm= {(e) => { fakeState[e.target.name] = e.target.value }} />);
      let input = wrapper.find({name: "username"});
      input.simulate("change", {target: {name: "username", value: "test"}});
      expect(fakeState.username).to.be.equal("test");
   });

   it("Should update password", () => {
      let fakeState = {username: "", password: "", msg: ""};
      expect(fakeState.password).to.be.equal("");
      const wrapper = shallow(<LoginForm signIn={fakeState} onUpdateSignInForm= {(e) => { fakeState[e.target.name] = e.target.value }} />);
      let input = wrapper.find({name: "password"});
      input.simulate("change", {target: {name: "password", value: "test"}});
      expect(fakeState.password).to.be.equal("test");
   });
   chai.use(chaiEnzyme());
});

describe("Testing <SignUpForm/> Component", () => {
   let fakeState = {};
   beforeEach(() => {
      fakeState = {username : "",
      password : "",
      email : "", 
      passwordRepeat : "",
      register: false,
      validUser : "",
      validPassword : "",
      validEmail : "" };
   });

   it("Should update username", () => {
      expect(fakeState.username).to.be.equal("");
      const wrapper = shallow(<SignUpForm signUp={fakeState} onUpdateSignUpForm= {(e) => { fakeState[e.target.name] = e.target.value }} />);
      let input = wrapper.find({name: "username"});
      input.simulate("change", {target: {name: "username", value: "test"}});
      expect(fakeState.username).to.be.equal("test");
   });

   it("Should update password", () => {
      expect(fakeState.password).to.be.equal("");
      const wrapper = shallow(<SignUpForm signUp={fakeState} onUpdateSignUpForm= {(e) => { fakeState[e.target.name] = e.target.value }} />);
      let input = wrapper.find({name: "password"});
      input.simulate("change", {target: {name: "password", value: "test"}});
      expect(fakeState.password).to.be.equal("test");
   });

   it("Should update email", () => {
      expect(fakeState.email).to.be.equal("");
      const wrapper = shallow(<SignUpForm signUp={fakeState} onUpdateSignUpForm= {(e) => { fakeState[e.target.name] = e.target.value }} />);
      let input = wrapper.find({name: "email"});
      input.simulate("change", {target: {name: "email", value: "test@example.com"}});
      expect(fakeState.email).to.be.equal("test@example.com");
   });

   it("Should update passwordRepeat", () => {
      expect(fakeState.passwordRepeat).to.be.equal("");
      const wrapper = shallow(<SignUpForm signUp={fakeState} onUpdateSignUpForm= {(e) => { fakeState[e.target.name] = e.target.value }} />);
      let input = wrapper.find({name: "passwordRepeat"});
      input.simulate("change", {target: {name: "passwordRepeat", value: "test"}});
      expect(fakeState.passwordRepeat).to.be.equal("test");
   });

   chai.use(chaiEnzyme());
});

describe("Testing <Header/> Component", () => {
   let styles = {};
   beforeEach(() => { styles = { //Esto realmente se usa?
         height: "10%",
         width: "100%",
         backgroundColor: "green",
         color: "white"
      };
   });

   it("Should render simple header if user is not logged", () => {
      const wrapper = shallow(<Header currentUser={{username: ""}} />);
      expect(wrapper.containsMatchingElement(<button>Login</button>)).to.be.true;
      expect(wrapper.containsMatchingElement(<button>Cerrar sesión</button>)).to.be.false;
   });

   it("Should render user header if user is logged", () => {
      const wrapper = shallow(<Header currentUser={{username: "test"}} />);
      expect(wrapper.containsMatchingElement(<button>Login</button>)).to.be.false;
      expect(wrapper.containsMatchingElement(<button>Cerrar sesión</button>)).to.be.true;
   });

   chai.use(chaiEnzyme());
});

describe("Testing <Footer/> Component", () => {
   it("Should render a footer", () => {
      const wrapper = shallow(<Footer />);
      expect(wrapper.find("footer").length).to.equals(1);
   });

   chai.use(chaiEnzyme());
});

describe("Testing <FarmElement/> Component", () => {
   it("Should render according to props", () => {
      let newDate = new Date();
      let auxDate = new Date(newDate.getTime() + (1000 * 60 * 60 * 48));
      const wrapper = shallow(<FarmElement elementInfo={{element: "crop",
         type: "Tomate",
         cycleTime: 48,
         lastProduction: newDate.getTime(),
         baseProduction: 1,
         icon: "some.example.url"}} />);
      expect(wrapper.containsMatchingElement(<p>Nombre: Tomate</p>)).to.be.true;
      expect(wrapper.containsMatchingElement(<p>Fecha de cultivo: {String(newDate.getDate()) + "/" + String(newDate.getMonth() + 1) + "/" + String(newDate.getFullYear()) + " " + String(newDate.getHours()) + ":" + String(newDate.getMinutes())}</p>)).to.be.true;         
      expect(wrapper.containsMatchingElement(<p> Fecha de recogida: {String(auxDate.getDate()) + "/" + String(auxDate.getMonth() + 1) + "/" + String(auxDate.getFullYear()) +  " " + String(auxDate.getHours()) + ":" + String(auxDate.getMinutes())}</p>)).to.be.true;
      expect(wrapper.containsMatchingElement(<img src="some.example.url" alt="" style={{width: "64px", height: "64px"}}></img>)).to.be.true;
   }); 

   chai.use(chaiEnzyme());
});

describe("Testing <Homepage/> Component", () => {
   it("Should render redirections if user is not logged", () => {
      const wrapper = shallow(<Homepage props={{username: ""}}/>);
      expect(wrapper.find(".Welcome").length).to.be.greaterThan(0);
      expect(wrapper.containsMatchingElement(<button>Login</button>)).to.be.true;
      expect(wrapper.containsMatchingElement(<button>Registro</button>)).to.be.true;

   });
   it("Should render main page if user is logged", () => {
      const wrapper = shallow(<Homepage props={{username: "test"}}/>);
      expect(wrapper.containsMatchingElement(<h1>Happy Harvest</h1>)).to.be.true;
   });

   chai.use(chaiEnzyme());
});

describe("Testing <CropViewer/> Component", () => {
   it("Should show user crops", () => {
      const wrapper = shallow(<CropViewer currentUser={{
         username: "test", 
         farmElements : {
            "cropSpaces" : 9,
            "animalSpaces" : 3,
            "currentCrops" : [],
            "currentAnimals" : [],
         },
      }}/>);
      expect(wrapper.find("FarmElement").length).to.be.equal(9);
   });
   chai.use(chaiEnzyme());
});