
import * as React from 'react';
import Navbar from '../components/navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import Paper from '../components/paper';
import { Grid, Button, TextField } from '@mui/material';
import axios from 'axios';
import Stack from '@mui/material/Stack';

function App() {
    const [gameCode, setGameCode] = React.useState('');
    const [cards, setCards] = React.useState([]);
    const [inputValue, setInputValue] = React.useState('');

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://www.hyeumine.com/getcard.php?bcode=HEelhJos');
                const data = response.data;
                setCards([...cards, { playcard_token: data.playcard_token, card: data.card }]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleCheckWin = async (gameCode) => {
        try {
            const response = await axios.get('http://www.hyeumine.com/checkwin.php?playcard_token=' + gameCode);
            const isWinner = response.data === 1;
            if (isWinner) {
                alert('Congratulations! You won the Bingo! ' + gameCode);
            } else {
                alert('Sorry, no Bingo yet. Keep playing!' + gameCode);
            }
        } catch (error) {
            console.error('Error checking win:', error);
            alert('An error occurred while checking for a win. Please try again later.');
        }
    };

    const handleAddCard = async () => {
        try {
            const response = await axios.get('http://www.hyeumine.com/getcard.php?bcode=HEelhJos');
            const data = response.data;
            setCards([...cards, { playcard_token: data.playcard_token, card: data.card }]);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <Router>
            <div className="App">
                <Navbar />
                <Grid container justifyContent="center" alignItems="center" spacing={2}>
                    <Grid>
                        <Grid container justifyContent="center" alignContent="center" spacing={2}>
                            <Grid item >
                                <h1>Play Bingo Game</h1>
                                <TextField
                                    label="Enter Game Code"
                                    variant="outlined"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                />

                                <Button variant="contained" onClick={() => handleCheckWin(inputValue)} sx={{ marginTop: '10px', marginLeft: '10px' }}>
                                    Check Code
                                </Button>
                                <Button variant="contained" onClick={handleAddCard} sx={{ marginTop: '10px', marginLeft: '10px' }}>
                                    Add Card
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>
                <Grid container justifyContent="center" alignItems="center" sx={{ marginTop: '20px' }}>

                    <Stack direction="column" spacing={2}>
                        {cards.map((card, index) => (
                            <Paper key={index} elevation={24}>
                                <h2>Game Code: {card.playcard_token}</h2>
                                <Grid container spacing={2} alignItems="center" justifyContent="center">
                                    {Object.entries(card.card).map(([key, values]) => (
                                        <Grid container key={key} spacing={1} columnGap={1.5}>
                                            <Grid item>
                                                <Button variant="contained" disabled sx={{ marginLeft: '12px' }}>{key}</Button>
                                            </Grid>
                                            {values.map((number) => (
                                                <Grid item key={number}>
                                                    <Button variant="contained" sx={{ width: '30px', marginBottom: '10px' }}>
                                                        {number}
                                                    </Button>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    ))}
                                    <Button variant="contained" onClick={() => handleCheckWin(card.playcard_token)}>
                                        Check Win
                                    </Button>
                                </Grid>
                            </Paper>
                        ))}
                    </Stack>
                </Grid>
            </div>
        </Router>
    );
}

export default App;