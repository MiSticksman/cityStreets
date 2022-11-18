import React, { Component } from "react";
import { Table } from "reactstrap";
import NewHouseModal from "./NewHouseModal";

import ConfirmRemoveHouse from "./ConfirmRemoveHouse";

class HouseList extends Component {
  render() {
    const houses = this.props.houses;
    return (
      <Table dark>
        <thead>
          <tr>
            <th>House</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {!houses || houses.length <= 0 ? (
            <tr>
              <td colSpan="6" align="center">
                <b>Ops, no one here yet</b>
              </td>
            </tr>
          ) : (
            houses.map(house => (
              <tr key={house.house_id}>
                <td>{house.street}, {house.house_number}</td>
                <td align="right">
                  <NewHouseModal
                    create={false}
                    house={house}
                    resetState={this.props.resetState}
                  />
                  &nbsp;&nbsp;
                  <ConfirmRemoveHouse
                    house_id={house.house_id}
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

export default HouseList;
