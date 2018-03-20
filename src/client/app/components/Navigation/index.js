import React, { Component } from "react";
import {
    Route,
    Link,
    Switch,
    HashRouter
} from "react-router-dom";
import Adding from '../Adding';
import ImagesList from '../ImagesList';
import Editing from '../Editing';
import Preview from '../Preview';
import Styles from './styles.scss';

export default class Navigation extends Component {

    render () {

        const Header = () => (
            <header>
                <nav className={Styles.nav}>
                    <ul>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/Adding'>Add Image</Link></li>
                    </ul>
                </nav>
            </header>
        );

        const Main = () => (
            <main>
                <Switch>
                    <Route exact path='/' component={ImagesList}/>
                    <Route path='/Adding' component={Adding}/>
                    <Route path='/Editing' component={Editing}/>
                    <Route path='/Preview' component={Preview}/>
                </Switch>
            </main>
        );

        const Result = () => (
            <div>
                <Header />
                <Main />
            </div>
        );

        return (
            <HashRouter>
                <Result />
            </HashRouter>
        )
    }
}