import React from 'react';
import './style.css';
import { withRouter } from '../witRouter';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: 'Home',
        };
    }

    componentDidMount() {
        const { pathname } = this.props.location;
        switch (pathname) {
            case '/':
                this.setState({ active: 'Home' });
                break;
            case '/pokedex':
                this.setState({ active: 'Pokedex' });
                break;
            default:
                this.setState({ active: 'Home' });
                break;
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            const { pathname } = this.props.location;
            switch (pathname) {
                case '/':
                    this.setState({ active: 'Home' });
                    break;
                case '/pokedex':
                    this.setState({ active: 'Pokedex' });
                    break;
                default:
                    this.setState({ active: 'Home' });
                    break;
            }
        }
    }

    handleRouteOnclick = (route) => {
        this.props.navigate(route);
    };

    render() {
        let Active = this.state.active;
        return (
            <div className="navbar">
                <div className="logo">
                    <img
                        onClick={() => this.handleRouteOnclick('/')}
                        src="/src/common/assets/logo.png"
                    />
                </div>
                <ul className="navbar-item">
                    <li
                        className={Active === 'Home' ? 'active' : ''}
                        onClick={() => this.handleRouteOnclick('/')}
                    >
                        Home
                    </li>
                    <li
                        className={Active === 'Pokedex' ? 'active' : ''}
                        onClick={() => this.handleRouteOnclick('/pokedex')}
                    >
                        Pokedex
                    </li>
                </ul>
            </div>
        );
    }
}

export default withRouter(Navbar);
