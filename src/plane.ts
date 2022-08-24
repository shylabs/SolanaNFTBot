import express from "express";
import pm2 from 'pm2'
import bodyParser from 'body-parser'

const app = express();
app.post('/bootstrap', bodyParser.json(), (req, res, next) => {
    /**
     * TODO: 
     * 1) parse typeform webhook app name
     * 2) 
     * 
     */
    console.log(req.body);
    /**
     *   TODO: 
     *   1) change path to the correct dist script not the dev one
     *   2) pass in the correct argument for process name
     *   3) review possible flags for PM2 to pass in
     */
    pm2.start({
        script    : '../dist/src/server.js',
        name      : 'AppName'
    }, function(err, apps) {
        if (err) {
            console.error(err)
            return pm2.disconnect()
        }
    })
    return res.status(204).send()
})

app.listen(4001, () => {
    console.log('Ctrl plane listening on Port 4001');
});