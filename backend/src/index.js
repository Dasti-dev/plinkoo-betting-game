import express from 'express';
import cors from 'cors';
import { outcomes } from "./outcomes";

const app = express();

app.use(cors());

const TOTAL_DROPS = 16;

const MULTIPLIERS = {
    0: 16,
    1: 9,
    2: 2,
    3: 1.4,
    4: 1.4,
    5: 1.2,
    6: 1.1,
    7: 1,
    8: 0.5,
    9: 1,
    10: 1.1,
    11: 1.2,
    12: 1.4,
    13: 1.4,
    14: 2,
    15: 9,
    16: 16
}

app.post('/game', (req,res) => {
    let outcome = 0;
    const pattern = [];

    for(let i = 0; i < TOTAL_DROPS; i++) {
        if(Math.random() > 0.5) {
            pattern.push("R")
            outcome++;
        } else {
            pattern.push("L");
        }
    }

    const multiplier = MULTIPLIERS[outcome];
    const possibleOutcome = outcomes[outcome];

    const point = possibleOutcome.length > 0 
    ? possibleOutcome[Math.floor(Math.random() * possibleOutcome.length)]
    : null;

    res.send({
        point,
        multiplier,
        pattern
    })
})

app.listen(8000,() => {
    console.log(`server running at 8000`);
})