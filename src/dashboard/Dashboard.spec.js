// Test away
import React from "react";
import * as rtl from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Dashboard from "./Dashboard";

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

describe("Dashboard comonent, freshly rendered", () => {
  it("renders without crashing", () => {
    //   wrapper.debug();
    expect(wrapper.container).toMatchSnapshot();
    // if it fails you can update snapshot by pressing 'u' after the fail. All snapshots are saved into a new automated file
  });

  it('renders an "unlocked" text node', () => {
    // expect(wrapper.queryByText('Unlocked')).toBeInTheDocument();
    // expect(wrapper.queryByText('Unlocked')).toBeVisbile();
    expect(Unlocked()).toBeInTheDocument();
    expect(Unlocked()).toBeVisible();
  });

  it('renders an "open" text node', () => {
    expect(Open()).toBeInTheDocument();
    expect(Open()).toBeVisible();
  });

  it('renders a "lock gate" text node', () => {
    expect(Lock()).toBeInTheDocument();
    expect(Lock()).toBeVisible();
  });

  it('renders a "Close gate" text node', () => {
    expect(CloseGate()).toBeInTheDocument();
    expect(CloseGate()).toBeVisible();
  });
});

describe("Dashboard component, when we CLOSE the gate", () => {
  it("matches snapshot after closing gate", () => {
    rtl.fireEvent.click(CloseGate());
    expect(wrapper.container).toMatchSnapshot();
  });

  it("clicking close makes close button disapppear", () => {
    expect(CloseGate()).toBeInTheDocument();
    rtl.fireEvent.click(CloseGate());
    expect(CloseGate()).toBe(null);
  });
});

describe("Dashboard component, when we CLOSE and Lock the gate", () => {
  it("matches snapshot after closing and locking gate", () => {
    rtl.fireEvent.click(CloseGate());
    rtl.fireEvent.click(Lock());
    expect(wrapper.container).toMatchSnapshot();
  });
});

// it('renders a "Closed" text node', () => {
//     expect(Closed()).toBeInTheDocument();
//     expect(Closed()).toBeVisible();
//     expect(Closed()).toBeDisabled();
//   });

//   it('renders a "Locked" text node', () => {
//     expect(Locked()).toBeInTheDocument();
//     expect(Locked()).toBeVisible();
//     expect(Closed()).toBeDisabled();
//   });

//   it('renders an "Close gate" text node', () => {
//     expect(OpenGate()).toBeInTheDocument();
//     expect(OpenGate()).toBeVisible();
//   });

//   it('renders an "Unlock gate" text node', () => {
//     expect(UnlockGate()).toBeInTheDocument();
//     expect(UnlockGate()).toBeVisible();
//   });
