const { Configuration, OpenAIApi } = require("openai");
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// Open AI Configuration
const configuration = new Configuration({
    organization: "org-i16GdI3biVetsydNnhzCYRLs",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

// Express Configuration
const app = express()
const port = 3080

app.use(bodyParser.json())
app.use(cors())
app.use(require('morgan')('dev'))


// Routing 

// Primary Open AI Route
app.post('/api', async (req, res) => {
	const { message } = req.body;
	console.log(message)
	const response = await openai.createCompletion({
		model: `text-davinci-003`,// "text-davinci-003",
		prompt: `${message}`,
		max_tokens: 100, 
		temperature: 0.5
	  });
	  console.log(response.data.choices[0].text)
	res.json({
		message: response.data.choices[0].text,
	})
});

// all other requests go to the public folder
app.use(express.static('public'));

// Start the server
app.listen(port, () => {
	  console.log(`Example app listening at http://localhost:${port}`)
});