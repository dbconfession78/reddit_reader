import React from 'react';

class PostSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: "",
    }
  }

  render() {
    return (
      <div>
      <div id="heading">/r/{this.props.subredditName}</div>
      <div>{this.props.sectionPosts}</div>
      <p/>
    </div>
    );
  }
}

export default PostSection;
