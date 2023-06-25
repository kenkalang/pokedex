import React from 'react';
import { Modal } from 'react-bootstrap';
import AlertModal from './alertModal/';
import { storage } from '../storage';

class CatchModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemon: null,
            show: props.show,
            successCatch: null,
            diceNumber: null,
            alertShow: false,
            message: '',
        };
    }

    componentDidMount() {
        this.setState({
            pokemon: this.props.pokemon,
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.show !== this.props.show) {
            this.setState({
                open: this.props.show,
            });
        }
        if (prevProps.pokemon !== this.props.pokemon) {
            this.setState({
                pokemon: this.props.pokemon,
            });
        }
    }

    handleRollDice = () => {
        const randomNumber = Math.floor(Math.random() * 10) + 1;
        this.setState({
            diceNumber: randomNumber,
        });

        if (randomNumber <= 5) {
            this.setState({
                successCatch: true,
                message: 'You catch the Pokémon!',
                alertShow: true,
            });
            this.props.handleCatch();
            storage.setPokedex({
                name: this.state.pokemon.name,
                id: this.state.pokemon.id,
                types: this.state.pokemon.types,
            });
            clearInterval(this.intervalId);
            this.intervalId = setInterval(() => {
                this.props.handleClose();
                clearInterval(this.intervalId);
            }, 3000);
        } else {
            this.setState({
                successCatch: false,
            });
        }
    };

    render() {
        if (this.state.pokemon === null) {
            return null;
        }
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{this.state.pokemon.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="pokemon-img">
                        <img
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.state.pokemon.id}.png`}
                        />
                    </div>
                    <div className="dice-number">
                        <h3>
                            {this.state.diceNumber === null
                                ? 'Roll the dice!'
                                : this.state.diceNumber}
                        </h3>
                        {this.state.successCatch === false && <p>Try again!</p>}
                    </div>
                    <div className="pokemon-info">
                        <h3>{this.state.pokemon.name}</h3>
                        <p>{this.state.pokemon.categories}</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        className="btn"
                        onClick={this.handleRollDice}
                        disabled={this.state.successCatch === true}
                    >
                        Roll Number
                    </button>
                </Modal.Footer>
                <AlertModal
                    show={this.state.alertShow}
                    message={this.state.message}
                    closeModalFunction={() => {
                        this.setState({
                            alertShow: false,
                        });
                    }}
                />
            </Modal>
        );
    }
}

export default CatchModal;
