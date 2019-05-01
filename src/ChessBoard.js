import React, { Component } from 'react';
import AlphabeticIndex from './AlphabeticIndex'
import TableComponent from './TableComponent';
import Character from './Character';

class ChessBoard extends Component {
  constructor(props) {
    super(props);
    this.width = 8;
    this.height = 8;
  }

  render() {
    return (
      <div>
        <TableComponent data={this.generateTable()} id={this.props.id} ref={this.tableRef} />
        <Character ref={this.props.characterRef} />
      </div>
    );
  }

  directionClick(e) {
    this.characterRef.current.moveForward();
  }

  generateTable() {
    var tableData = {
      columns: this.generateHeaders(),
      rows: [
        ["1", "", "", "", "", "", "", "", ""],
        ["2", "", "", "", "", "", "", "", ""],
        ["3", "", "", "", "", "", "", "", ""],
        ["4", "", "", "", "", "", "", "", ""],
        ["5", "", "", "", "", "", "", "", ""],
        ["6", "", "", "", "", "", "", "", ""],
        ["7", "", "", "", "", "", "", "", ""],
        ["8", "", "", "", "", "", "", "", ""],
      ]
    };

    let alphabeticIndex = new AlphabeticIndex();
    
    var red_count = 0;
    var green_count = 0;
    var blue_count = 0;
    Object.keys(this.props.config.setup).forEach(coord => {
      var col = alphabeticIndex.getCharIndex(coord[0]);
      var row = +coord[1];
      var exit = false;
      var color_holder="";
      while (exit == false) {
        var random =  Math.floor(Math.random() * 3)+1;

        switch (random) {
          case 1:
            if (red_count < 6) {
              color_holder = "red";
              red_count++;
              exit=true;
              break;
            }
          case 2:
            if (green_count < 6) {
              color_holder = "green";
              green_count++;
              exit=true;
              break;
            }
          case 3:
            if (blue_count < 6) {
              color_holder = "blue";
              blue_count++;
              exit=true;
              break;
            }
        }
      }
      tableData.rows[row - 1][col + 1] = <span id={row+"_"+col} style={{ color: color_holder }}>&#9679;</span>;
      console.log(row+"_"+col);
    });

    return tableData;
  }

  generateHeaders() {
    let alphabeticIndex = new AlphabeticIndex();
    return [" "].concat(alphabeticIndex.getIndexArray(this.width));
  }
}

export default ChessBoard;
