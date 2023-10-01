const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Login
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Login = require('./model/login.model');
const bcrypt = require('bcrypt');

const history = require('connect-history-api-fallback');

const Rescue = require('./model/rescue.model');
const AfterCare = require('./model/after-care.model');

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

// Admin Rescue
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

// Admin After Care
app.get('/admin-aftercare', async (req, res)=>{
        try{
                const aftercare = await AfterCare.find();
                res.json(aftercare);
        } catch(err){
                console.error(err);
                res.status(500).json({ message: "Internal server error"});
        }
})

app.put("/admin-aftercare/:id", async (req, res) =>{
        try{
                const upstream_data = await AfterCare.findByIdAndUpdate(
                        req.params.id,
                        req.body,
                        { new: true }
                );
                res.send(upstream_data);
        } catch (err){
                res.status(500).send(err.message);
        }
})

const generateSecretKey = () =>{
        const byteLength = 32;
        const buffer = crypto.randomBytes(byteLength);

        return buffer.toString('hex');
}

const secretKey = generateSecretKey();

// eyfairies elaineadmin || admin admin 
app.post('/login', async (req, res) =>{
        const { username, password} = req.body;

        try{
                const user = await Login.findOne({username});

                if(!user){
                        return res.status(404).json({ message: "User not found SHeet!"});
                }

                const isPasswordValid = await bcrypt.compare(password, user.password);
        
                if(!isPasswordValid){
                        return res.status(401).json({ message: 'Invalid credentails'});
                }

                const token = jwt.sign({user: user._id}, secretKey, {expiresIn: '24h'});

                res.status(200).json({ token });
        } catch (err){
                console.log(err);
                console.log(req.body);
                res.status(500).json({message: "Internal server error1"});
        }
})

// After Care
app.get('/aftercare', async(req, res) =>{
        try{
                const aftercare = await AfterCare.find();
                res.json(aftercare);
        }catch(err){
                console.error();
                res.status(500).json({ message: 'Internal server error'});
        }
})

// Rescue
app.get('/rescue', async(req, res) =>{
        try{
                const rescue = await Rescue.find();
                res.json(rescue);
        }catch(err){
                console.error();
                res.status(500).json({ message: 'Internal server error'});
        }
})

app.listen(port, ()=>{
        console.log(`Listening on ${port}`);
})

// const bcrypt = require('bcrypt');

// const password = 'admin';

// const saltRounds = 10;

// bcrypt.genSalt(saltRounds, (err, salt) =>{
//         if(err){
//                 console.error('Error generating salt:', err);
//         }else{
//                 bcrypt.hash(password, salt, (err, hash) =>{
//                         if(err){
                                
//                         }else{
//                                 console.log(hash);
//                         }
//                 })
//         }
// })