/* global it, describe, expect, beforeEach */

import React from "react";
import { mount } from "enzyme";
import MockAdapter from "axios-mock-adapter";
import configureStore from "redux-mock-store";
import promise from "redux-promise";

import API from "../../api";

import EditContributorForm from "./EditContributorForm";

describe("Site data test without overoccupation", () => {
  let enzymeWrapper;
  beforeEach(() => {
    const initialState = {
      contributors: {
        site: {
          id: 1,
          buildings: [
            {
              id: 1,
              floors: [
                {
                  id: 1,
                  capacity: 6,
                  occupation: 5,
                },
              ],
            },
          ],
        },
      },
      contributor: {
        contributor: {
          first_name: "Francisco Javier",
          last_name: "Galindo Alapont",
          business_unit: "906 - MKT-COM",
          code: "74297",
        },
      },
      workrooms: {
        workplaces: [
          {
            id: 1488,
            name: "Puesto 509",
          },
        ],
        workrooms: [
          {
            id: 50,
            name: "DSC0",
          },
        ],
      },
    };

    const mock = new MockAdapter(API);
    mock.onGet(`/sites/${process.env.REACT_APP_SITE_ID}/full.json`).reply(200, {});
    const middlewares = [promise];
    const mockStore = configureStore(middlewares);
    const store = mockStore(initialState);
    enzymeWrapper = mount(<EditContributorForm store={store} />);
  });

  it("should exist form ", () => {
    expect(enzymeWrapper.find("form").length).toEqual(1);
  });
  it("should disable select Workroom & Workplace on render", () => {
    expect(enzymeWrapper.findWhere(n => n.name() === "FormControl" && n.prop("disabled")).length).toEqual(2);
  });

  it("should enable workroom when you choose one Floor", () => {
    enzymeWrapper.find("#floor").simulate("change", { target: { value: 22 } });
    expect(enzymeWrapper.findWhere(n => n.name() === "FormControl" && n.prop("disabled")).length).toEqual(1);
  });

  it("should enable all when you select floor and workroom", () => {
    enzymeWrapper.find("#floor").simulate("change", { target: { value: 22 } });
    enzymeWrapper.find("#workroom").simulate("change", { target: { value: "DEC01" } });
    expect(enzymeWrapper.findWhere(n => n.name() === "FormControl" && n.prop("disabled")).length).toEqual(0);
  });
});
