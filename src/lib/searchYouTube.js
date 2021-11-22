import YOUTUBE_API_KEY from '../../src/config/youtube.js';

var searchYouTube = ({key = YOUTUBE_API_KEY, max = '5', query = ''}, callback = () => {}) => {
  var queryMessage = {
    key: key,
    maxResults: max,
    q: query,
    part: 'snippet',
    videoEmbeddable: 'true',
    type: 'video'
  };
  $.ajax({
    url: 'https://www.googleapis.com/youtube/v3/search',
    type: 'GET',
    data: queryMessage,
    contentType: 'application/json',
    success: data => {
      callback(data.items);
    },
    error: data => {
      console.log('Fail');
    }
  });
};

export default searchYouTube;

