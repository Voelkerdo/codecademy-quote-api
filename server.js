const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement, filterByValue } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));


app.get('/api/quotes/random', (req, res, next) => {
  const randomQuote = {};
  randomQuote.quote = getRandomElement(quotes);
  res.status(200).send(randomQuote);
});

//5
app.get('/api/quotes', (req, res, next) => {
  const queryParamValue = req.query.person;
  if (!queryParamValue) {
    res.status(200).send({quotes});
  } else {
    const filteredQuotes = filterByValue(quotes, 'person', queryParamValue);
    console.log(JSON.stringify(filteredQuotes));
    if (filteredQuotes) {
      res.status(200).send({"quotes": filteredQuotes});
    } else {
      res.status(200).send([]);
    }
  }
});

//6

app.listen(PORT, () => {
  console.log(`Server is now up and running!`);
})

