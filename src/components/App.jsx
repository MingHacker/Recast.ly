import VideoList from '../../src/components/VideoList.js';
import VideoPlayer from '../../src/components/VideoPlayer.js';
import Search from './Search.js';

class App extends React.Component {
  constructor(props) {
    var blankProps = [{
      kind: '',
      etag: '',
      id: {
        kind: '',
        videoId: ''
      },
      snippet: {
        publishedAt: '',
        channelId: '',
        title: '',
        description: '',
        thumbnails: {
          default: {
            url: '',
            width: 120,
            height: 90
          },
          medium: {
            url: '',
            width: 320,
            height: 180
          },
          high: {
            url: '',
            width: 480,
            height: 360
          }
        },
        channelTitle: '',
        liveBroadcastContent: ''
      }
    }];
    super(props);
    if (props.videos) {
      this.state = {
        playingVideo: props.videos[0],
        allVideos: props.videos,
        autoplay: false};
    } else {
      this.state = {
        playingVideo: blankProps[0],
        allVideos: blankProps,
        autoplay: false};
    }

    this.debounceSearchHandler = this.debounceHandler(this.searchHandler.bind(this));

  }

  autoplayToggle() {
    this.setState({
      autoplay: !this.state.autoplay
    });
  }

  clickVideoList(event) {
    event.persist();
    this.setState({
      playingVideo: _.find(this.state.allVideos, video => video.id.videoId === event.currentTarget.id)
    });
  }

  componentDidMount() {
    this.props.searchYouTube({}, (videos) => {
      this.setState({
        playingVideo: videos[0],
        allVideos: videos
      });
    });
  }

  /*
  onChange={this.debouncedUpdate} // WRONG!
  onChange={({ target: { value } }) => this.debouncedUpdate(value)}
  */
  debounceHandler(func) {
    var debounceFunc = _.debounce(func, 500);
    return function(event) {
      event.persist();
      return debounceFunc(event);
    };
  }
  // SearchText:  build a variable for query, when type in the text input field is changed, then update that query
  searchHandler(event) {
    this.props.searchYouTube({query: event.target.value}, (videos) => {
      this.setState({
        playingVideo: videos[0],
        allVideos: videos
      });
    });
  }


  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <Search searchHandler = {this.debounceSearchHandler.bind(this)} autoplayToggle={this.autoplayToggle.bind(this)} />
          </div>
        </nav>
        <div className="row">
          <div className="col-md-7">
            <VideoPlayer video = {this.state.playingVideo} autoplayState = {this.state.autoplay} />
          </div>
          <div className="col-md-5">
            <VideoList videos = {this.state.allVideos} onClick = {this.clickVideoList.bind(this)} />
          </div>
        </div>
      </div>
    );
  }
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default App;

