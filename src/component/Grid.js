import React from 'react';
import Square from './Square';
import './Grid.css';

class Grid extends React.Component {
    render() {
        const grid = [];
        const inFocus = this.props.inFocus;
        let focusRow = -1, focusCol = -1;
        if (inFocus >= 0) {
            focusRow = Math.floor(inFocus / 9);
            focusCol = inFocus % 9;
        }

        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                let border = '';
                if (r === 0) {
                    border += 'top ';
                } else if (r === this.rows - 1) {
                    border += 'bottom ';
                } else if (r % 3 === 2) {
                    border += 'bottom-light ';
                }
                if (c === 0) {
                    border += 'left ';
                } else if (c === this.cols - 1) {
                    border += 'right ';
                } else if (c % 3 === 2) {
                    border += 'right-light ';
                }
                let key = r * 9 + c;
                let inFocus = false;
                let sideFocus = false;
                let inConflict = false;

                if (r === focusRow && c === focusCol) {
                    inFocus = true;
                } else if (r === focusRow) {
                    sideFocus = true;
                } else if (c === focusCol) {
                    sideFocus = true;
                }
                if (this.props.inConflict.has(key)) {
                    inConflict = true;
                }

                grid.push(
                    <Square
                        key={key}
                        id={key}
                        value={this.props.squares[key]}
                        onClick={(i) => this.props.handleClick(i)}
                        border={border}
                        inFocus={inFocus}
                        inConflict={inConflict}
                        sideFocus={sideFocus}
                    />
                );
            }
        }
        return (
            <div className='grid'>
                {grid}
            </div>
        );
    }

}
export default Grid;