import React from "react";
import {configure, shallow} from "enzyme";
import chai, {expect} from "chai";
import chaiEnzyme from "chai-enzyme";
import Adapter from "enzyme-adapter-react-16";
import SignIn from "../src/components/SignIn";

configure({
   adapter: new Adapter()
});
describe("Testing <SignIn/> Component", () => {
   it("", () => {
      const wrapper = shallow(<SignIn props={{username: ""}} />);
      expect(wrapper.find("Main").length).to.equals(1);
   });
   chai.use(chaiEnzyme());
});