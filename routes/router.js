const   router  = require('express').Router(),
        md5     = require('md5'),
        Sequelize   = require('sequelize'),
        Op      = Sequelize.Op;
        //passport = require('passport'),
        //Linkedin = require('node-linkedin')(process.env.LINKEDIN_ID, process.env.LINKEDIN_SECRET, process.env.LINKEDIN_CALLBACK_URL);

var     {User,Profile, Post, Question, Note}  = require('../config/sequelize'),
        dateFormat      = require('dateformat');

var api_res = {
    status  : 0,
    value   : null,
    msg     : null,
}

// Console Logger
router.use(function (req, res, next) {
    //console.log('Time:', (Date.now()).toDateString())
    console.log(req.method," ",req.path, " ", dateFormat(Date.now(), "isoDateTime"));
    api_res = {
        status  : 0,
        value   : null,
        msg     : null,
    }
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
    email       = req.body.email;
    password    = md5(req.body.password);
    User.findOne(
        {
            where:{
                email   : email,
                password: password
            }
        }
    ).then(user => user != null ? api_res.value = user : api_res.status = 0)
    .then(()=>  api_res.status = 1)
    .then(()=>  res.json(api_res))
})

// Register Get
router.get('/register', (req, res)=>{
    api_res.status  = 1;
    api_res.value   = 0;
    api_res.msg     = 'Register get';
    res.json(api_res);
    
})

// Register Post
router.post('/register', (req, res )=>{
    firstname   = req.body.firstname;
    lastname    = req.body.lastname;
    email       = req.body.email;
    password    = md5(req.body.password);
    User.findOne(
        {
            where:{
                email: email,
                password: password
            }
        }
    ).then(user => {
        if(user != null)
        {
            api_res.state   = 1
            api_res.value   = 0
            api_res.msg     = "User already exists"
            res.json(api_res)
            //()
        }
        else {
            User.create({
                where:{
                    first_name  : firstname,
                    last_name   : lastname,
                    mail        : email,
                    password    : password,
                }
            }).then(()=>{
                api_res.msg     = 'User created successfully.'
                res.json(api_res)

            }).catch(err=>{
                api_res.msg     =  'Some error occured'
                api_res.value   =  err
                res.json(api_res)
            })
        }
    })
    .catch(err=>{
        api_res.msg     =  'Some error occured'
        api_res.value   =  err
        res.json(api_res) 
    })
    
})


// CRUD for Posts
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

router.post('/post/create', (req, res)=>{
    Post.create({
        where:{
            title:req.body.title,
            content: req.body.content,
            author: req.body.username
        }
    }).then(()=>{
        api_res.status  = 1
        api_res.value   = 1
        api_res.msg     = 'Post created successfully.'
        res.json(api_res)

    }).catch(err=>{
        api_res.msg     =  'Some error occured'
        api_res.value       =  err
        res.json(api_res)
    })
})

router.get('/post/:id',(req, res)=>{
    Post.findOne({
        where:{
            id: req.params.id
        }
    }).then(post =>{
        api_res.status  = 1
        api_res.value   = post
        api_res.msg     = "Success"
        res.json(api_res)
    }).catch(err=>{ 
        api_res.value   = err
        api_res.msg     = "Some error occured"
        res.json(api_res)
    })
})

router.post('/post/:id/update',(req, res)=>{
    Post.findOne({
        where:{
            id: req.params.id
        }
    }).then((post) =>{
        post.updateAttributes({
            where: {
                title   : req.body.title,
                content : req.body.content
            }
        })
        .then(()=>{
        api_res.status  = 1
        api_res.value   = 1
        api_res.msg     = "Success"
        res.json(api_res)})
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

router.post('/ques/create', (req, res)=>{
    Question.create({
        where:{
            title   :req.body.title,
            desc    : req.body.des,
            author  : req.body.username
        }
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

router.post('/ques/:id/update',(req, res)=>{
    Question.findOne({
        where: {
            id  : req.params.id
        }
    }).then((ques) =>{
        ques.updateAttributes({
            where: {
                title   : req.body.title,
                desc    : req.body.desc
            }
        })
        .then(()=>{
        api_res.status  = 1
        api_res.value   = 1
        api_res.msg     = "Success"
        res.json(api_res)})
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

router.post('/note/create', (req, res)=>{
    Note.create({
        where:{
            title   :req.body.title,
            desc    : req.body.des,
            author  : req.body.username
        }
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

router.post('/note/:id/update',(req, res)=>{
    Note.findOne({
        where: {
            id  : req.params.id
        }
    }).then((note) =>{
        note.updateAttributes({
            where: {
                title   : req.body.title,
                desc    : req.body.desc
            }
        })
        .then(()=>{
        api_res.status  = 1
        api_res.value   = 1
        api_res.msg     = "Success"
        res.json(api_res)})
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