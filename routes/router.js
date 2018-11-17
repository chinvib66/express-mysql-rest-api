const   router  = require('express').Router(),
        md5     = require('md5'),
        config  = require('../jwtconfig'),
        Sequelize   = require('sequelize'),
        jwt     = require('jsonwebtoken'),
        Op      = Sequelize.Op,
        passport = require('passport');
        //Linkedin = require('node-linkedin')(process.env.LINKEDIN_ID, process.env.LINKEDIN_SECRET, process.env.LINKEDIN_CALLBACK_URL);

var     {User,Profile, Post, Question, Note}  = require('../config/sequelize'),
        dateFormat      = require('dateformat');

var api_res = {
    status  : 0,
    value   : null,
    msg     : null,
    token   : null
}
// Console Logger
router.use(function (req, res, next) {
    //console.log('Time:', (Date.now()).toDateString())
    console.log(req.method," ",req.path, " ", dateFormat(Date.now(), "isoDateTime"));
    api_res.status  = 0,
    api_res.value   = null,
    api_res.msg     = null,
    next()
})

// Index Get
router.get('/',(req,res)=>{
    api_res.status  = 1;
    api_res.msg     = 'Index Page';
    res.json(api_res);
})

// Login Get
router.get('/login', (req, res )=>{
    api_res.status  = 1;
    api_res.value   = 0;
    api_res.msg     = 'Login get';
    res.json(api_res);

})

// Login Post
router.post('/login', (req, res)=>{
    
    User.findOne(
        {
            where:{
                mail    : req.body.email,
                password: req.body.password
            }
        }
    ).then(user => {
        
        if(user != null){ 
            api_res.value = user
            token = jwt.sign({email: user.mail}, config.secret, { expiresIn: config.tokenLife})
            api_res.token   = token
            api_res.status = 1
            api_res.msg     = "Signed in successfully"
        }
        else
        {
            api_res.status  = 0
            api_res.value   = null
            api_res.msg     = "Incorrect email or password. Please check and try again"

        }
    
    })
    .then(()=>  {return res.json(api_res)})
    .catch(err =>{
        api_res.status  = 0
        api_res.value   = null
        api_res.msg     = "Some error occured. Please try again."
        return res.json(api_res)
    })
})

// Register Get
router.get('/register', (req, res)=>{
    api_res.status  = 1;
    api_res.value   = 0;
    api_res.msg     = 'Register get';
    res.json(api_res);
    
})

// Register Post

router.post('/register', (req, res)=>{
    User.findOrCreate({
        where: {
            //[Op.or]: [{mail: req.body.email }, {username: 13}]            
            mail    : req.body.email,
            name    : req.body.fullName,
            password: req.body.password
        }
    })
    .spread((user, created) => {
        //console.log(created)
        if(created){
            api_res.status  = 1
            api_res.value   = "User id = "+user.id
            api_res.msg     = "User registered successfully. Please login to continue"
            return res.json(api_res)
        }
        else{
            api_res.status  = 1
            api_res.value   = null
            api_res.msg     = "Email already exists. Please use another email or login"
            return res.json(api_res)
        }
        }
    )
    .catch(err=>{
        if(err.name == "SequelizeUniqueConstraintError"){
            api_res.status  = 0
            api_res.value   = err.errors[0].type
            api_res.msg     = "Credentials already exist. Please try another email"
            console.log(err)
            return res.json(api_res)
        }
        else{
            api_res.status  = 0
            api_res.value   = err.errors[0].type
            api_res.msg     = "Some Error occured on our side. We'll try to fix it ASAP."
            console.log(err)
            return res.json(api_res)
        }
        

    })
})



// No Auth
router.get('/posts',(req, res)=>{
    Post.findAll().then(posts =>{
        api_res.status  = 1
        api_res.value   = posts
        api_res.msg     = "Success"
        res.json(api_res)
    }).catch(err=>{ 
        api_res.value   = err
        api_res.msg     = "Some error occured"
        res.json(api_res)
    })
})

router.get('/post/:id',(req, res)=>{
    Post.findOne({
        where:{
            id: req.params.id
        }
    }).then(post =>{
        if(post != null){
        api_res.status  = 1
        api_res.value   = post
        api_res.msg     = "Success"
        res.json(api_res)
        }
        else {
        api_res.status  = 1
        api_res.value   = post
        api_res.msg     = "Post does not exist"
        res.json(api_res)
        }
    }).catch(err=>{ 
        api_res.value   = err
        api_res.msg     = "Some error occured"
        res.json(api_res)
    })
})

router.get('/forum',(req, res)=>{
    Question.findAll().then(ques =>{
        api_res.status  = 1
        api_res.value   = ques
        api_res.msg     = "Success"
        res.json(api_res)
    }).catch(err=>{ 
        api_res.value   = err
        api_res.msg     = "Some error occured"
        res.json(api_res)
    })
})

router.get('/ques/:id',(req, res)=>{
    Question.findOne({
        where:{
            id: req.params.id
        }
    }).then(ques =>{
        api_res.status  = 1
        api_res.value   = ques
        api_res.msg     = "Success"
        res.json(api_res)
    }).catch(err=>{ 
        api_res.value   = err
        api_res.msg     = "Some error occured"
        res.json(api_res)
    })
})

router.get('/notes',(req, res)=>{
    Note.findAll().then(notes =>{
        api_res.status  = 1
        api_res.value   = notes
        api_res.msg     = "Success"
        res.json(api_res)
    }).catch(err=>{ 
        api_res.value   = err
        api_res.msg     = "Some error occured"
        res.json(api_res)
    })
})

router.get('/note/:id',(req, res)=>{
    Note.findOne({
        where:{
            id: req.params.id
        }
    }).then(note =>{
        api_res.status  = 1
        api_res.value   = note
        api_res.msg     = "Success"
        res.json(api_res)
    }).catch(err=>{ 
        api_res.value   = err
        api_res.msg     = "Some error occured"
        res.json(api_res)
    })
})




// Auth using JWT

router.use(require('./tokenCheck'))
router.use((req, res, next)=>{
    console.log(req.decoded)
    next()
})
router.get('/secure',(req,res)=>{
    api_res.status  = 1;
    api_res.msg     = 'Secure Page';
    res.json(api_res);
})

// CRUD for Posts

router.post('/post/create', (req, res)=>{
    console.log(req.body)
    console.log(req.decoded.email)
    Post.create({
            title   : req.body.title,
            content : req.body.content,
            author  : req.decoded.email
    }).then(val=>{
        api_res.status  = 1
        api_res.value   = val
        api_res.msg     = 'Post created successfully.'
        res.json(api_res)

    }).catch(err=>{
        api_res.msg     =  'Some error occured'
        api_res.value       =  err
        res.json(api_res)
    })
})

router.post('/post/:id/update',(req, res)=>{
    Post.update({
            title   : req.body.title,
            content : req.body.content
        },
        {
            where :{
                id: req.params.id,
                author: req.decoded.email
            }
        })
        .then((post)=>{
        api_res.status  = 1
        api_res.value   = post
        api_res.msg     = "Post updated successfully"
        res.json(api_res)
    }).catch(err=>{ 
        api_res.value   = err
        api_res.msg     = "Some error occured"
        res.json(api_res)
    })
})

router.post('/post/:id/delete',(req, res)=>{
    Post.destroy({
        where:{
            id: req.params.id
        }
    }).then(() =>{
        api_res.status  = 1
        api_res.value   = 1
        api_res.msg     = "Success"
        res.json(api_res)
    }).catch(err=>{ 
        api_res.value   = err
        api_res.msg     = "Some error occured"
        res.json(api_res)
    })
})

// CRUD for Forum

router.post('/ques/create', (req, res)=>{
    Question.create({
            title   :req.body.title,
            desc    : req.body.des,
            author  : req.body.username
    }).then(()=>{
        api_res.status  = 1
        api_res.value   = 1
        api_res.msg     = 'Post created successfully.'
        res.json(api_res)

    }).catch(err=>{
        api_res.msg     =  'Some error occured'
        api_res.value   =  err
        res.json(api_res)
    })
})

router.post('/ques/:id/update',(req, res)=>{
    Question.update({
        title   : req.body.title,
        desc    : req.body.desc
    },
    {
        where :{
            id: req.params.id,
            author: req.decoded.email
        }
    })
    .then((ques)=>{
    api_res.status  = 1
    api_res.value   = ques
    api_res.msg     = "Question updated successfully"
    res.json(api_res)
}).catch(err=>{ 
    api_res.value   = err
    api_res.msg     = "Some error occured"
    res.json(api_res)
})
})

router.post('/ques/:id/delete',(req, res)=>{
    Question.destroy({
        where:{
            id: req.params.id
        }
    }).then(() =>{
        api_res.status  = 1
        api_res.value   = 1
        api_res.msg     = "Success"
        res.json(api_res)
    }).catch(err=>{ 
        api_res.value   = err
        api_res.msg     = "Some error occured"
        res.json(api_res)
    })
})

// CRUD for Notes

router.post('/note/create', (req, res)=>{
    Note.create({
            title   :req.body.title,
            desc    : req.body.des,
            author  : req.body.username
    }).then(()=>{
        api_res.status  = 1
        api_res.value   = 1
        api_res.msg     = 'Post created successfully.'
        res.json(api_res)

    }).catch(err=>{
        api_res.msg     =  'Some error occured'
        api_res.value   =  err
        res.json(api_res)
    })
})

router.post('/note/:id/update',(req, res)=>{
    Note.update({
        content    : req.body.content
    },
    {
        where :{
            id: req.params.id,
            author: req.decoded.email
        }
    })
    .then((note)=>{
        api_res.status  = 1
        api_res.value   = note
        api_res.msg     = "Note updated successfully"
        res.json(api_res)
    }).catch(err=>{ 
        api_res.value   = err
        api_res.msg     = "Some error occured"
        res.json(api_res)
})
})

router.post('/note/:id/delete',(req, res)=>{
    Note.destroy({
        where:{
            id: req.params.id
        }
    }).then(() =>{
        api_res.status  = 1
        api_res.value   = 1
        api_res.msg     = "Success"
        res.json(api_res)
    }).catch(err=>{ 
        api_res.value   = err
        api_res.msg     = "Some error occured"
        res.json(api_res)
    })
})


/*
router.get('/api/linkedin',(req, res, ) => {
    const token = req.user.tokens.find(token => token.kind === 'linkedin');
    const linkedin = Linkedin.init(token.accessToken);
    linkedin.people.me((err, $in) => {
      if (err) { return (err); }
      res.render('api/linkedin', {
        title: 'LinkedIn API',
        profile: $in
      });
    });
  })

router.get('/auth/linkedin', passport.authenticate('linkedin', { state: 'SOME STATE' }));
router.get('/auth/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/login' }), (req, res) => {
res.redirect(req.session.returnTo || '/');
    });
*/


module.exports = router;