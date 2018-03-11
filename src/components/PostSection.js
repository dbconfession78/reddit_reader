import React from 'react';

class PostSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: "",
    }
  }

  render() {
    console.log(this.props.sectionPosts)
    return (
      <div>{this.props.sectionPosts}</div>
    );
  }
}

export default PostSection;
