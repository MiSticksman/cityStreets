import React, { Component } from "react";
import { Table } from "reactstrap";
import NewStreetModal from "./NewStreetModal";

import ConfirmRemoveStreet from "./ConfirmRemoveStreet"

class StreetList extends Component {
  render() {
    const streets = this.props.streets;
    return (
      <Table dark>
        <thead>
          <tr>
            <th>Street</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {!streets || streets.length <= 0 ? (
            <tr>
              <td colSpan="6" align="center">
                <b>Ops, no one here yet</b>
              </td>
            </tr>
          ) : (
            streets.map(street => (
              <tr key={street.street_id}>
                <td>{street.street_name}</td>
                <td align="right">
                  <NewStreetModal
                    create={false}
                    street={street}
                    resetState={this.props.resetState}
                  />
                  &nbsp;&nbsp;
                  <ConfirmRemoveStreet
                    street_id={street.street_id}
                    resetState={this.props.resetState}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    );
  }
}

export default StreetList;
