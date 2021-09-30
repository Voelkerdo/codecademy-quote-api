const express = require('express');
const app = express();
const responseTime = require('response-time');

const { quotes } = require('./data');
const { getRandomElement, filterByValue } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

//Middleware
app.use(responseTime((req, res, time) => {
  console.log(`${req.url}: ${time / 1000}s`);
}));


app.get('/api/quotes/random', (req, res, next) => {
  const randomQuote = {};
  randomQuote.quote = getRandomElement(quotes);
  res.status(200).send(randomQuote);
});

app.get('/api/quotes', (req, res, next) => {
  const queryParamValue = req.query.person;
  if (!queryParamValue) {
    res.status(200).send({quotes});
  } else {
    const filteredQuotes = filterByValue(quotes, 'person', queryParamValue);
    //console.log(JSON.stringify(filteredQuotes));
    if (filteredQuotes) {
      res.status(200).send({"quotes": filteredQuotes});
    } else {
      res.status(200).send([]);
    }
  }
});

app.post('/api/quotes', (req, res, next) => {
  const query = req.query;
  if (query.person && query.quote) {
    quotes.push(query);
    res.status(201).send({'quote':query});
  } else {
    res.status(400).send();
  }
});

app.listen(PORT, () => {
  console.log(`Server is now up and running!`);
})

