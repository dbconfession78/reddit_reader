import React from 'react';
import '../styles/styles.css';
import Input from './Input';
import Watched from './Watched';
import Display from './Display';
import PostSection from './PostSection';
import $ from 'jquery';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      selected: 'news',
      watched: [],
      sections: [],
      dct: {},
      idx: 0,
      fresh: true,
      newsIsTracked: false
    };
  }

  initSubreddits () {
    if (localStorage.length === 0 || localStorage['subreddits'] === '[]') {
      localStorage.setItem('subreddits', JSON.stringify(['news']));
    }
    this.state.watched = JSON.parse(localStorage.getItem('subreddits'));
    for (let i = 0; i < this.state.watched.length; i++) {
      this.createSection(this.state.watched[i]);
    }
  }

  addSubreddit (subreddit) {
    if (subreddit === 'news') {
      if (this.state.newsIsTracked) {
        alert('You are already tracking this subreddit.');
        return false;
      } else {
        this.state.newsIsTracked = true;
        if ('news' in this.state.dct) {
          return true;
        }
      }
    } else {
      if (subreddit in this.state.dct) {
        alert('You are already tracking this subreddit.');
        return false;
      }
    }
    if (this.createSection(subreddit)) {
      if ('news' in this.state.dct) {
        if (this.state.newsIsTracked === false) {
          delete this.state.dct['news'];
          this.state.sections.splice(0, 1);
          this.state.watched.splice(0, 1);
        }
      }
      this.state.watched.push(subreddit);
      localStorage.setItem('subreddits', JSON.stringify(this.state.watched));
      document.getElementById('text').value = '';
    } else {
      return false;
    }
    this.setState({refresh: ''});
    return true;
  }

  delSubreddit (subreddit) {
    if (subreddit === 'news' && this.state.newsIsTracked) {
      this.state.newsIsTracked = false;
    }
    if (subreddit in this.state.dct) {
      const idx = this.state.watched.indexOf(subreddit);
      this.state.sections.splice(idx, 1);
      this.state.watched.splice(idx, 1);
      delete this.state.dct[subreddit];
      this.updateLocalStorage('del', idx);
      this.setState({sections: this.state.sections});
      document.getElementById('text').value = '';
      return true;
    }
    alert('error: you must type the name of a tracked subreddit before attempting to remove');
    return false;
  }

  addButtonActionPerformed (subreddit) {
    this.addSubreddit(subreddit);
  }

  delButtonActionPerformed (subreddit) {
    this.delSubreddit(subreddit);
  }

  delAllButtonActionPerformed () {
    this.state.newsIsTracked = false;
    const _len = this.state.watched.length;
    for (let i = 0; i < _len; i++) {
      this.delSubreddit(this.state.watched[0]);
    }
  }

  updateLocalStorage (op, val, idx) {
    let ls = JSON.parse(localStorage['subreddits']);
    if (op === 'del') {
      if (idx === null) {
        console.log("error: 'idx' param required to delete");
        return;
      }
      ls.splice(idx, 1);
    }
    if (op === 'push') {
      if (val === null) {
        console.log("error: 'val' param required to push");
        return;
      }
      ls.push(val);
    }
    if (ls.length === 0) {
      this.state.fresh = true;
    }
    localStorage.setItem('subreddits', JSON.stringify(ls));
  }

  createSection (subreddit) {
    const res = this.fetchPosts(subreddit);
    if (!res) {
      alert("error: this subreddit either doesn't exist or may be set as private");
      return false;
    }

    const postsList = this.buildPostsList(res, subreddit);
    const sectionPosts = this.buildSectionPosts(postsList, subreddit);
    const section = <PostSection subredditName={subreddit} sectionPosts={sectionPosts} />;
    this.state.sections.push(section);

    this.state.dct[subreddit] = postsList;
    return true;
  }

  fetchPosts (subreddit) {
    const retval = $.ajax({
      async: false,
      url: 'https://www.reddit.com/r/' + subreddit + '/.json',
      type: 'GET',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36',
      success: function (res) {
        return res;
      },
      error: function (err) {
        console.log(err.statusText);
      }
    });
    return retval['responseJSON'];
  }

  buildPostsList (res, subreddit) {
    let retlst = [];
    if ('data' in res) {
      const data = res['data'];
      const children = data['children'];
      const _len = children.length;
      let idx = 0;

      for (let i = 0; i < _len; i++) {
        const child = children[i];
        const author = child['data']['author'];
        const title = child['data']['title'];
        const selftext = child['data']['selftext'];
        const url = child['data']['url'];
        if (selftext || url) {
          retlst.push({'author': 'N/A', 'title': 'N/A', 'selftext': '', 'url': 'N/A'});
          if (author) {
            retlst[idx]['author'] = author;
          }
          if (title) {
            retlst[idx]['title'] = title;
          }
          if (url) {
            retlst[idx]['url'] = url;
          }
          if (selftext) {
            retlst[idx]['selftext'] = selftext;
          }
          idx += 1;
        }
      }
    }
    return retlst;
  }

  buildSectionPosts (postsList, subreddit) {
    const postCount = postsList.length;
    let retBuild = [];
    if (this.state.selected !== '') {
      for (let i = 0; i < postCount; i++) {
        retBuild.push(
          <div key={i} className='post-container'>
            <div>Subreddit: {subreddit}</div>
            <div>Author: {postsList[i]['author']}</div>
            <div><a href={postsList[i]['url']}>{postsList[i]['title']}</a></div>
            <div>{postsList[i]['selftext']}</div>
          </div>
        );
      }
    }
    return retBuild;
  }

  render () {
    if (this.state.fresh === true) {
      this.initSubreddits();
      this.state.fresh = false;
    }
    return (
      <div className='App'>
        <header />
        <main>
          <div className='Wrapper'>
            <div className='TopContainer'>
              <div className='WatchedContainer'>
                <p>Showing posts for these subreddits:</p>
                <Watched
                  watchedFromApp={this.state.watched}
                />
              </div>
              <p />
              <div className='InputComponent'>
                <Input
                  onClickAdd={evt => this.addButtonActionPerformed(evt)}
                  onClickDel={evt => this.delButtonActionPerformed(evt)}
                  onClickDelAll={evt => this.delAllButtonActionPerformed(evt)}
                />
                <p />
              </div>

            </div>
            <div className='DisplayContainer'>
              <Display
                sections={this.state.sections}
              />
            </div>
          </div>
        </main>
        <footer>Reddit Reader</footer>
      </div>
    );
  }
}

export default App;
