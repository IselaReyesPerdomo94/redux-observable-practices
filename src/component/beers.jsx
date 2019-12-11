import React, {Fragment} from "react";
import {connect} from "react-redux";
import {search} from '../reducer/beersActions'
import { BeerListing } from "./beerslist";

export function Beers(props) {
    const {data,messages, status, search} = props;
    return (
        <Fragment>        
            <div className="App-inputs">
                <input type="text"
                    placeholder="Search beers"
                    onChange={(evt)=> search(evt.target.value)}/>
                {status === "pending" && (
                    <span className="App-spinner">
                        wait :)
                    </span>)}
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

export default connect(state => state.beers, {search})(Beers);