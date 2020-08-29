import React from 'react';
import "./Clear.css";

export const Clear = props =>(<div className="clear" onClick = {props.handleClear}>{props.children}</div>);
