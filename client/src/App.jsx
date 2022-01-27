import React from 'react'
import Board from "./Board";
import { BrowserRouter, Route } from 'react-router-dom';

export default class App extends React.Component {

    constructor(props) {
        super(props);
    }
    
    render() {
        return(
            <BrowserRouter>
                <Route path="/" component={Board}/>
                <Route path="/regions/.*" component={Board}/>
            </BrowserRouter>
        );
    }
}