import React, { Component } from 'react';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      charName: null,
      realm: null,
      char: null,
    }

    this.handleCharChange = this.handleCharChange.bind(this);
    this.handleRealmChange = this.handleRealmChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCharChange(event) {
    this.setState({charName: event.target.value});
  }

  handleRealmChange(event) {
    this.setState({realm: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.realm)
    fetch("http://localhost:4000/api/getCharSettings?realm=" + this.state.realm + "&charName=" + this.state.charName, {
      method: "POST"
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        this.setState({
          char: res
        })
      })
      .catch(e => {
        console.log(e)
      })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Wow character settings extractor</h1>
          <div id="contentContainer">
            <div id="formContainer">
              <h3>Input</h3>
              <form onSubmit={this.handleSubmit}>
                <label for="charNameInput">
                  Character <input id="charNameInput" className="input" type="text" value={this.state.charName} onChange={this.handleCharChange}></input>
                </label><br/>
                <label for="realmInput">
                  Realm <input id="realmInput" className="input" type="text" value={this.state.realm} onChange={this.handleRealmChange}></input>
                </label><br/>
                <input className="submit" type="submit" value="Get info" />
              </form>
            </div>
            <div id="resultContainer">
              <h3>{this.state.char ? this.state.char.name : "Woop Woop!"}</h3>
              <h4>{this.state.char ? this.state.char.realm : ""}</h4>
              
                {this.state.char ?
                  <table>
                    <tr>
                      <th className="charLabels">Face:</th>
                      <td>{this.state.char.appearance.faceVariation + 1}</td>
                    </tr>
                    <tr>
                      <th className="charLabels">Skin color:</th>
                      <td>{this.state.char.appearance.skinColor + 1}</td>
                    </tr>
                    <tr>
                      <th className="charLabels">Hairstyle:</th>
                      <td>{this.state.char.appearance.hairVariation + 1}</td>
                    </tr>
                    <tr>
                      <th className="charLabels">Feature:</th>
                      <td>{this.state.char.appearance.featureVariation + 1}</td>
                    </tr>
                  </table>
                  : ""
                }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
