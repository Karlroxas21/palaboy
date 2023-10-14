const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const sharp = require('sharp');
const {validationResult} = require('express-validator');

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
app.use(history());

app.use(express.static(path.join(__dirname, 'dist/palaboy')));

app.get('/', (req, res) => {
        res.
        sendFile(path.join(__dirname, 'dist/palaboy/index.html'));
});

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

                const errors = validationResult(req);
                if(!errors.isEmpty()){
                        return res.status(400).json({ errors: errors.array()});
                }else{
                        const upstream_data = await Rescue.findByIdAndUpdate(
                                req.params.id,
                                req.body,
                                { new: true }
                        );
                }
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
                const errors = validationResult(req);
                if(!errors.isEmpty()){
                        return res.status(400).json({ errors: errors.array()});
                }else{
                        const upstream_data = await AfterCare.findByIdAndUpdate(
                                req.params.id,
                                req.body,
                                { new: true }
                        );
                        res.send(upstream_data);
                }
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

const storage1 = multer.diskStorage({
        destination: (req, file, cb) =>{
                // cb(null, './dist/palaboy/assets');
                cb(null, '../src/assets');
        },
        filename: (req, file, cb) => {
                cb(null, 'badfood.png');
        }
})
const upload1 = multer({
        storage: storage1,
        limits: { fileSize: 1000000}, // 1 MB
});

app.post('/upload1', upload1.single('image'),(req, res) =>{
        if(!req.file){
                return res.status(400).json({ error: 'No file uploaded'});  
        }

        sharp(req.file.path)
        .metadata().then((metadata) =>{
                const { width, height } = metadata;
                const maxWidth = 675;
                const maxHeight = 1033;

                if(width > maxWidth || height > maxHeight){
                        return res.status(400).json({ error: 'Image dimensions are too large.' });   
                }

                return res.status(200).send('File uploaded successfully.');
        }).catch((err) =>{
                return res.status(500);
        });
})

// // Error handling middleware for Multer "File too large" error
// app.use((err, req, res, next) => {
//         if (err instanceof multer.MulterError) {
//           if (err.code === 'LIMIT_FILE_SIZE') {

//                 const clientScript = `
//                         <script>
//                         toastr.error('File is too large. Maximum file size is 1MB.');
//                         </script>
//                 `;
//             return res.status(400).send(clientScript);
//           }
//         }
//         next(err); // Pass the error to the default error handler
//       });

const storage2 = multer.diskStorage({
        destination: (req, file, cb) =>{
                // cb(null, './dist/palaboy/assets');
                cb(null, '../src/assets');
        },
        filename: (req, file, cb) => {
                cb(null, 'bathe.png');
        }
})
const upload2 = multer({
        storage: storage2,
        limits: { fileSize: 1000000}, // 1mb      
});

app.post('/upload2', upload2.single('image'),(req, res) =>{
        if(!req.file){
                return res.status(400).json({ error: 'No file uploaded'});  
        }
        sharp(req.file.path)
        .metadata().then((metadata) =>{
                const { width, height } = metadata;
                const maxWidth = 1728;
                const maxHeight = 2665;

                if(width > maxWidth || height > maxHeight){
                        return res.status(400).json({ error: 'Image dimensions are too large.' });   
                }

                return res.status(200).send('File uploaded successfully.');
        }).catch((err) =>{
                return res.status(500);
        });
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