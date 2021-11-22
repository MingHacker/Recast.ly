var Search = (props) => (
  <div className="search-bar form-inline">
    <input className="form-control" type="text" onChange={props.searchHandler}/>
    <button className="btn hidden-sm-down" onClick={props.searchHandler}>
      <span className="glyphicon glyphicon-search"></span>
    </button>
    <label className="switch">
      <input type="checkbox" onChange={props.autoplayToggle}/>
      <span className="slider round"></span>
    </label>
    <p className="autoplay">Autoplay</p>
  </div>
);

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default Search;

