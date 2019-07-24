import React from 'react';
// import logo from './logo.svg';
import './App.css'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LinearProgress from '@material-ui/core/LinearProgress';
import Search from '@material-ui/icons/Search';

class App extends React.Component {

  state = {
    memes: [],
    loading: false,
    text: ''
  }

  getMemes = async (e) => {
    e.preventDefault()
    this.setState({ loading: true })
    var key = 'U4Y94OVuCqKkP7GFAgta4vbthSQ5WRjQ'
    var url = `http://api.giphy.com/v1/gifs/search?q=${this.state.text}&api_key=${key}`
    var r = await fetch(url)
    var json = await r.json()
    this.setState({ memes: json.data, loading: false, text: '' })
  }

  render() {
    var { memes, loading, text } = this.state
    return (
      <div className="App">
        <form className="App-header" onSubmit={this.getMemes}>
          <TextField 
            id="outlined-search"
            label="Search for GIFs"
            type="search"
            margin="normal"
            variant="outlined"
            value={text}
            onChange={e => this.setState({ text: e.target.value })} 
            style = {{width: '90%', height: 55, margin: 10}}/>
          <Button 
            color="primary"
            variant="contained"
            disabled={loading || !text} 
            type="submit"
            style = {{height: 55, width: '10%', marginRight: 10}}>
            <Search />
            Search
          </Button>
        </form>
        { !loading || <LinearProgress /> }
        {memes.map(meme => {
          return <Meme key={meme.id} meme={meme} /> 
        })}
      </div>
    );
  }
}

export default App;

function Meme(props){
  var {meme} = props
  var url = meme.images.fixed_height.url
  return (<div className="meme-wrap" onClick={()=>window.open(url, '_blank')}>
    <img height="200" alt="meme" src={url} />
  </div>)
}