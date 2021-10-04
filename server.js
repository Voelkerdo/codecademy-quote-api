const express = require('express');
const app = express();
const morgan = require('morgan');

const { quotes } = require('./data');
const { getRandomElement, filterByValue } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

//Morgan open source middleware for logging
app.use(morgan('tiny'));


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

//My route with person as route parameter
app.get('/api/quotes/:person', (req, res, next) => {
  const person = req.params.person;
  const quote = quotes.find(quote => quote.person === person);
  if (quote) {
    res.status(200).json(quote);
  } else {
    try {
      throw new Error(`Error: No quote found for person ${person}`);
    } catch (err) {
      err.status = 404;
      next(err);
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

//Error Handling middleware
app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(err.status).send(err.message);
});

app.listen(PORT, () => {
  console.log(`Server is now up and running!`);
})

