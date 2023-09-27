const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const history = require('connect-history-api-fallback');

const Rescue = require('./model/rescue.model');

const app = express();
const port = process.env.PORT || 80;
mongoose.connect('mongodb+srv://elainerose0316:ILTaCb8Vct3vKBic@cluster0.u0fxycb.mongodb.net/palaboy');

// Middleware
app.use(cors());

app.use(bodyParser.json());

// When dockerizing
// app.use(express.static(path.join(__dirname, 'dist/ecotopia-capstone')));

// app.get('/', (req, res) => {
//         res.
//         sendFile(path.join(__dirname, 'dist/ecotopia-capstone/index.html'));
// });

app.get('/admin-rescue', async (req, res)=>{
        try{
                const rescue = await Rescue.find();
                res.json(rescue);
        } catch(err){
                console.error(err);
                res.status(500).json({ message: "Internal server error"});
        }
})

app.put("/admin-rescue/:id", async (req, res) =>{
        try{
                const upstream_data = await Rescue.findByIdAndUpdate(
                        req.params.id,
                        req.body,
                        { new: true }
                );
                res.send(upstream_data);
        } catch (err){
                res.status(500).send(err.message);
        }
})

app.listen(port, ()=>{
        console.log(`Listening on ${port}`);
})