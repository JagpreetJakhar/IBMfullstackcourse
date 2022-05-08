const express = require('express');
const app = new express();
const dotenv= require('dotenv');
dotenv.config();
/*This tells the server to use the client 
folder for all static resources*/
app.use(express.static('client'));

/*This tells the server to allow cross origin references*/
const cors_app = require('cors');
app.use(cors_app());

/*Uncomment the following lines to loan the environment 
variables that you set up in the .env file*/

// const dotenv = require('dotenv');
// dotenv.config();

// const api_key = process.env.API_KEY;
// const api_url = process.env.API_URL;

function getNLUInstance() {
    /*Type the code to create the NLU instance and return it.
    You can refer to the image in the instructions document
    to do the same.*/
    let api_key=process.env.API_KEY;
    let api_url = process.env.API_URL;
    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');
    
    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
    version: '2021-03-13',
    authenticator: new IamAuthenticator({
        apikey: api_key,
    }),
    serviceUrl: api_url,
    });
    return naturalLanguageUnderstanding;
}
app.use(express.static('client'))


app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {

    const analyzeParamsEmotion = {
        'url': req.query.url,
        'features': {
            'emotion': {
            'limit': 5
            }
        }
    }
    
    getNLUInstance().analyze(analyzeParamsEmotion)
    .then(analysisResults => {
    console.log(JSON.stringify(analysisResults, null, 2));
    return res.send(analysisResults.result.emotion.document.emotion);
    })
    .catch(err => {
    console.log('error:', err);
    });
    
    //return res.send({"happy":"90","sad":"10"});
});

app.get("/url/sentiment", (req,res) => {

    const analyzeParamsSentiment = {
        'url': req.query.url,
        'features': {
            'sentiment': {
            }
        }
    }

    getNLUInstance().analyze(analyzeParamsSentiment)
    .then(analysisResults => {
    console.log(JSON.stringify(analysisResults, null, 2));
    return res.send(analysisResults.result.sentiment.document.label);
    })
    .catch(err => {
    console.log('error:', err);
    });

    //return res.send("url sentiment for "+req.query.url);
});

app.get("/text/emotion", (req,res) => {

    const analyzeParamsEmotion = {
        'text': req.query.text,
        'features': {
            'emotion': {
            'limit': 5
            }
        }
    }

    getNLUInstance().analyze(analyzeParamsEmotion)
    .then(analysisResults => {
    console.log(JSON.stringify(analysisResults, null, 2));
    return res.send(analysisResults.result.emotion.document.emotion);
    })
    .catch(err => {
    console.log('error:', err);
    });

    //return res.send({"happy":"10","sad":"90"});
});

app.get("/text/sentiment", (req,res) => {

    const analyzeParamsSentiment = {
        'text': req.query.text,
        'features': {
            'sentiment': {
            }
        }
    }

    getNLUInstance().analyze(analyzeParamsSentiment)
    .then(analysisResults => {
    console.log(JSON.stringify(analysisResults, null, 2));
    return res.send(analysisResults.result.sentiment.document.label);
    })
    .catch(err => {
    console.log('error:', err);
    });

    //return res.send("text sentiment for "+req.query.text);
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

