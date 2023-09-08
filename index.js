import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

const PORT = 1900;

const app = express();
app.disable('x-powered-by');
app.use(helmet());
app.use(cors());

const DaysOfTheWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

app.get('/api', async(req, res)=>{

    let slack_name = req.query.slack_name;
    let track = req.query.track;

    if(slack_name && track) {

        res.status(200).send({
            "slack_name": slack_name,
            "current_day": DaysOfTheWeek[new Date().getDay()],
            "utc_time": new Date().toISOString(),
            "track": track,
            "github_file_url": "https://github.com/oem18/repo/blob/main/file_name.ext",
            "github_repo_url": "https://github.com/oem18/repo",
            "status_code": 200
        });

    } else res.status(200).send({ "status_code": 404 });

});

app.listen(PORT, ()=>{
    console.log(`Live on port http://localhost:${PORT}`);
});

// Catch any process ending error
process.on('unhandledRejection', (reason, _promise) => {
    try {
      console.log('Unhandled Rejection :', reason.stack || reason);
    } catch (error) {
        console.log("Error: ", error);
    }
});