import React from 'react';

class Input extends React.Component {
  // constructor (props) {
  //   super(props);
  //   this.state = {
  //     refresh: ''
  //   };
  // }
  render () {
    return (
      <div className='InputWrapper'>
        <div id='input_field'>
          <input id='text' />
        </div>
        <div className='InputButtons'>
          <button type='button' id='add_button' onClick={() => this.props.onClickAdd(document.getElementById('text').value)} >Add</button>
          <button type='button' id='delete_button' onClick={() => this.props.onClickDel(document.getElementById('text').value)}>Remove</button>
          <button type='button' id='del_all_button' onClick={() => this.props.onClickDelAll()}>Remove all</button>
        </div>
      </div>
    );
  }
}

export default Input;
