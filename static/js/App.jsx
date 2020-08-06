import React from 'react'
import Board from "./Board";
import { BrowserRouter, Route } from 'react-router-dom';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = { done: false };

    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ done: true });
        }, 1000);

    }

    render() {
        return (
            <React.Fragment>
                <BrowserRouter>
                    <Route path="/" component={Board} />
                    <Route path="/regions/.*" component={Board} />
                </BrowserRouter>

            </React.Fragment>
        );
    }
}