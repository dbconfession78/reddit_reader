import React from 'react';

class Display extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: "",
    }
  }
  render() {
    const s = this.props.sections.map(function(elem, i) {
      return(
        <div key={i} className="Section">{elem}</div>
      );
    });
    return (
      <div className="Display">
        {s}
      </div>
    );
  };
}

export default Display;
