import React , { Component } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import Note from './Note';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';

const cookie_key = 'notes';

class App extends Component {
    constructor() {
        super();

        this.state = {
            text: '',
            notes: []
        }
    }

    componentDidMount() {
        // const notes = read_cookie(cookie_key);
        this.setState({ notes: read_cookie(cookie_key) });
        // es6^^
    }

    // submit() {
    //     const notes = this.state.notes;
    //     const newNote = { text: this.state.text };
    //     notes.push(newNote);
    //     this.setState({ notes: notes })
    // }
    submit() {
        const { notes, text } = this.state;
        notes.push({ text });
        this.setState({ notes});
        bake_cookie(cookie_key, this.state.notes);
        
    }
// es6^^^

clear() {
    delete_cookie(cookie_key);

    this.setState({ notes: [] });
  }

    render(){
        return (
            <div>
            <h2> Note To Self</h2>
            <Form inline>
                <FormControl onChange ={ event => this.setState({text: event.target.value}) }/>
                {' '}
                {/* <Button onClick={() => console.log(this.state)}>Submit</Button> */}
                <Button onClick={() => this.submit()}>Submit</Button>
            </Form>
            {
                this.state.notes.map( (note, index) => {
                    return (
                        <Note key={index} note={note} />
                    )
                })
            }
            <hr/>
            <Button onClick= {() => this.clear() }>Finished</Button>
            </div>
        )
    }
}

export default App;