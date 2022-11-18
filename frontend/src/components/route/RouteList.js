import React, { Component } from "react";
import { Table } from "reactstrap";
import NewRouteModal from "./NewRouteModal";

import ConfirmRemoveRoute from "./ConfirmRemoveRoute";

class RouteList extends Component {
  render() {
    const routes = this.props.routes;
    return (
      <Table dark>
        <thead>
          <tr>
            <th>Route</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {!routes || routes.length <= 0 ? (
            <tr>
              <td colSpan="6" align="center">
                <b>Ops, no one here yet</b>
              </td>
            </tr>
          ) : (
            routes.map(route => (
              <tr key={route.route_id}>
                <td>{route.route_name}</td>
                <td align="right">
                  <NewRouteModal
                    create={false}
                    route={route}
                    resetState={this.props.resetState}
                  />
                  &nbsp;&nbsp;
                  <ConfirmRemoveRoute
                    route_id={route.route_id}
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

export default RouteList;
