import React from 'react';
import $ from 'jquery';

function testFunc() {
  return null;
}
let flag = 0;
class Watched extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: "",
      watched: [],
      idx: 0,
    }
  }

  render() {
    console.log("RENDERING WATCHED.JS")
    const _len = this.props.watchedFromApp.length;
    let watchedDivs = []

    for (let i=0; i < _len; i++) {
      const _this = this.props.watchedFromApp[i]
      watchedDivs[this.state.idx] = <div id={_this}><li id="post">{_this}</li></div>
      this.state.idx++;
    }

    watchedDivs = watchedDivs.map(function(elem, i) {
      const handleDelClick = function(evt) {
        const id = elem.props.id
        $("#"+id).remove();
        $("#"+i).remove();
        let ls = JSON.parse(localStorage.subreddits);
        ls.splice(ls.indexOf(id), 1)
        localStorage.subreddits = JSON.stringify(ls)
        console.log(localStorage.subreddits)
        console.log(flag)
        flag = 1;
        console.log(flag)
        // this.setState({"refresh": ""})

      }
      return (
        <div>{elem}</div>
        
      );
    });

    watchedDivs = watchedDivs.map(function(elem, i) {
      return (
        elem.props.children
      );
    });

    return (
      <div className="Watched">
        {watchedDivs}
      </div>
    );
  };
}

export default Watched;
