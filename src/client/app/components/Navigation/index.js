import React, { Component } from "react";
import {
    Route,
    Link,
    Switch,
    HashRouter
} from "react-router-dom";
import MainPanel from '../MainPanel';
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
                        <li><Link to='/MainPanel'>Add Image</Link></li>
                    </ul>
                </nav>
            </header>
        );

        const Main = () => (
            <main>
                <Switch>
                    <Route exact path='/' component={ImagesList}/>
                    <Route path='/MainPanel' component={MainPanel}/>
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