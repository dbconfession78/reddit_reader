import React from 'react';

class Input extends React.Component {
  render() {
    console.log("RENDERING INPUT.JS")
    return (
      <div className="Input">
        <input id="text"></input>
        <button onClick={() => this.props.onClickAdd(document.getElementById("text").value)}>Add subreddit</button>
        <button onClick={() => this.props.onClickDel(document.getElementById("text").value)}>Delete subreddit</button>
        <button onClick={() => this.props.onClickDelAll(document.getElementById("text").value)}>Delete all</button>
      </div>
    );
  };
}

export default Input;
