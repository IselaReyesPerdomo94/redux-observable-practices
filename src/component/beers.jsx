import React, {Fragment} from "react";
import {connect} from "react-redux";
import {search, cancel} from '../reducer/beersActions'
import { BeerListing } from "./beerslist";

import './style.css';

export function Beers(props) {
    const {data,messages, status, search, cancel} = props;
    return (
        <Fragment>        
            <div className="App-inputs">
                <input type="text"
                    placeholder="Search beers"
                    onChange={(evt)=> search(evt.target.value)}/>
                {status === "pending" && (
                    <Fragment>
                        <button type="button" onClick={cancel}>Cancel</button>
                        <span className="App-spinner">
                            wait :)
                        </span>
                    </Fragment>
                    )}
            </div>
              {status === "success" &&(
                  <div className="App-content">
                      <BeerListing beers={data}/>
                  </div>
              )}
              {status === "Failure" &&(
                  <div className="App-content">
                    <p>OOPS! {messages[0].text}</p>
                  </div>
              )}
        </Fragment>
    )
}

export default connect(state => state.beers, {search, cancel})(Beers);