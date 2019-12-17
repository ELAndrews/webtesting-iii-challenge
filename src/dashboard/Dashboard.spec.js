// Test away
import React, { Component } from "react";
import * as rtl from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Dashboard from "./Dashboard";
import Display from "../display/Display";
import Controls from "../controls/Controls";

afterEach(rtl.cleanup);

let wrapper;
let Unlocked = () => wrapper.queryByText("Unlocked");
let Open = () => wrapper.queryByText("Open");
let Lock = () => wrapper.queryByText("Lock Gate");
let CloseGate = () => wrapper.queryByText("Close Gate");
let Closed = () => wrapper.queryByText("Closed");
let Locked = () => wrapper.queryByText("Locked");
let OpenGate = () => wrapper.queryByText("Open Gate");
let UnlockGate = () => wrapper.queryByText("Unlock Gate");

beforeEach(() => {
  wrapper = rtl.render(<Dashboard />);
});

describe("Dashboard component, freshly rendered", () => {
  it("renders without crashing", () => {
    //   wrapper.debug();
    expect(wrapper.container).toMatchSnapshot();
    // if it fails you can update snapshot by pressing 'u' after the fail. All snapshots are saved into a new automated file
  });

  it('renders an "unlocked" text node as default', () => {
    // expect(wrapper.queryByText('Unlocked')).toBeInTheDocument();
    // expect(wrapper.queryByText('Unlocked')).toBeVisbile();
    expect(Unlocked()).toBeInTheDocument();
    expect(Unlocked()).toBeVisible();
  });

  it('renders an "open" text node, as default', () => {
    expect(Open()).toBeInTheDocument();
    expect(Open()).toBeVisible();
  });

  it('renders a "lock gate" text node, which is part of controls', () => {
    expect(Lock()).toBeInTheDocument();
    expect(Lock()).toBeVisible();
    expect(Lock()).toBeDisabled();
  });

  it('renders a "Close gate" text node, which is part of controls', () => {
    expect(CloseGate()).toBeInTheDocument();
    expect(CloseGate()).toBeVisible();
  });

  it("renders the correct class names of 'green-led'", () => {
    expect(wrapper.container.firstChild.firstChild).toHaveClass("green-led");
    expect(wrapper.container.firstChild.lastChild).toHaveClass("green-led");
  });
});

describe("Dashboard component, when we CLOSE the gate", () => {
  it("matches snapshot after closing gate, displaying closed", () => {
    rtl.fireEvent.click(CloseGate());
    expect(wrapper.container).toMatchSnapshot();
  });

  it("clicking close makes close button disapppear", () => {
    expect(CloseGate()).toBeInTheDocument();
    rtl.fireEvent.click(CloseGate());
    expect(CloseGate()).toBe(null);
  });

  it("clicking close makes open button apppear", () => {
    rtl.fireEvent.click(CloseGate());
    expect(OpenGate()).toBeInTheDocument();
  });
});

describe("Dashboard component, when we CLOSE and LOCK the gate", () => {
  it("matches snapshot after closing and locking gate", () => {
    rtl.fireEvent.click(CloseGate());
    rtl.fireEvent.click(Lock());
    expect(wrapper.container).toMatchSnapshot();
  });

  it("disabled the open/close button when the gate is locked", () => {
    rtl.fireEvent.click(CloseGate());
    rtl.fireEvent.click(Lock());
    expect(OpenGate()).toBeDisabled();
  });

  it("displays Locked and Closed in the display component", () => {
    rtl.fireEvent.click(CloseGate());
    rtl.fireEvent.click(Lock());
    expect(Locked()).toBeInTheDocument();
    expect(Closed()).toBeInTheDocument();
  });

  it("render the Unlock Gate button", () => {
    rtl.fireEvent.click(CloseGate());
    rtl.fireEvent.click(Lock());
    expect(UnlockGate()).toBeInTheDocument();
  });

  it("renders the correct class names of 'red-led'", () => {
    rtl.fireEvent.click(CloseGate());
    rtl.fireEvent.click(Lock());
    expect(wrapper.container.firstChild.firstChild).toHaveClass("red-led"); // Could have used the variables above i.e. Open()
    expect(wrapper.container.firstChild.lastChild).toHaveClass("red-led");
  });
});

describe("Controls Component", () => {
  it("provide buttons to toggle the `closed` and `locked` states, which reflects the state of the door", () => {
    expect(CloseGate()).toBeVisible();
    rtl.fireEvent.click(CloseGate());
    expect(OpenGate()).toBeVisible();
  });

  it("the closed toggle button is disabled if the gate is locked", () => {
    expect(CloseGate()).toBeVisible();
    expect(Lock()).toBeDisabled();
  });

  it("the locked toggle button is disabled if the gate is open", () => {
    expect(Open()).toBeVisible();
    expect(Lock()).toBeInTheDocument();
  });
});
