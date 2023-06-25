import React from 'react';
import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './common/store.js';
import Home from './common/home/home.jsx';
import PokemonDetail from './common/home/detail/pokemonDetail';
import Pokedex from './common/pokedex/pokedex';
import Navbar from './common/components/navbar';
import 'bootstrap/dist/css/bootstrap.css';

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <div>
                                    <Navbar />
                                    <Home />
                                </div>
                            }
                        />
                        <Route
                            path="/pokemon/:id"
                            element={
                                <div>
                                    <Navbar />
                                    <PokemonDetail />
                                </div>
                            }
                        />
                        <Route
                            path="/pokedex"
                            element={
                                <div>
                                    <Navbar />
                                    <Pokedex />
                                </div>
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
