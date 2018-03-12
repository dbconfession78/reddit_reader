import React from 'react';

class Watched extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      watched: [],
      idx: 0
    };
  }

  render () {
    const _len = this.props.watchedFromApp.length;
    let watchedDivs = [];

    for (let i = 0; i < _len; i++) {
      const _this = this.props.watchedFromApp[i];
      watchedDivs[this.state.idx] = <div id={_this}><li id='post'>{_this}</li></div>;
      this.state.idx++;
    }

    watchedDivs = watchedDivs.map(function (elem, i) {
      return (
        <div>{elem}</div>
      );
    });

    watchedDivs = watchedDivs.map(function (elem, i) {
      return (
        elem.props.children
      );
    });

    return (
      <div className='Watched'>
        {watchedDivs}
      </div>
    );
  }
}

export default Watched;
