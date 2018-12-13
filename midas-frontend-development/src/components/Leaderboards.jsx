import React, { Component } from "react";
import { Table } from "react-bootstrap";


class Leaderboards extends Component {
  render() {
    return <div className="leaderboard container">
	<Table striped bordered condensed hover>
  	<thead>
    <tr>
      <th>Rank</th>
      <th>Avatar</th>
      <th>Username</th>
      <th>Portfolio Value</th>
    </tr>
  	</thead>
  	<tbody>
  	<tr>
      <td>1</td>
      <td><img src="../../assets/person-1.jpg"></img></td>
      <td>@marvel</td>
      <td>$15,000</td>
    </tr>
  	<tr>
      <td>2</td>
      <td><img src="../../assets/person-2.jpg"></img></td>
      <td>@jane</td>
      <td>$8,500</td>
    </tr>
    <tr>
      <td>3</td>
      <td><img src="../../assets/person-3.jpg"></img></td>
      <td>@spiderman</td>
      <td>$8,000</td>
    </tr>

    <tr>
      <td>4</td>
      <td>Peter</td>
      <td>@spiderman</td>
      <td>$8,000</td>
    </tr>
    <tr>
      <td>5</td>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <td>6</td>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <td>7</td>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <td>8</td>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <td>9</td>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <td>10</td>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>

  	</tbody>
	</Table>
    </div>;
  }
}

export default Leaderboards;