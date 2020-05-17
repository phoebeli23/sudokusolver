import React from 'react';
import './Square.css'

function Square(props) {
    let classes = 'Square ' + props.border + ' ';
    if (props.inFocus) {
        classes += 'inFocus ';
    }
    if (props.sideFocus) {
        classes += 'sideFocus ';
    }
    if (props.inConflict) {
        classes += 'inConflict '
    }
    return (
        <button 
            className={classes}
            onClick={() => props.onClick(props.id)}>
           {props.value}
        </button> 
    );
}

export default Square;