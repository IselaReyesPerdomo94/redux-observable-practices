import React, {Fragment} from "react";
import {connect} from "react-redux";
import {search, cancel, setConfig,random} from '../reducer/beersActions'
import { BeerListing } from "./beerslist";

import './style.css';

export function Beers(props) {
    const {data,messages, status, random, cancel, config, setConfig} = props;
    return (
        <Fragment>        
            <div className="App-inputs">
                <select 
                    name="per-page" 
                    defaultValue={config.perPage}
                    onChange={(e) => setConfig({perPage: Number(e.target.value)})}
                    >
                        {[1,2,3,4,5,6,7,8,9,10].map(value => {
                        return <option key={value} value={value}>{value} results</option>
                        })}
                    </select>
                    {/* Changing input for a button to return random beers */}
                    <button type="button" onClick={random}>Random!</button>
                {/* <input type="text"
                    placeholder="Search beers"
                    onChange={(evt)=> search(evt.target.value)}/> */}

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

const mapState = (state) => {
    return {
        ...state.beers,
        config: state.config
    }
}

export default connect(mapState, {search, random, cancel, setConfig})(Beers);