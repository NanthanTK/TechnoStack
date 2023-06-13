const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/newPost', function(req, res) {
    logged_in = true; 
    res.render('newPost');
  });

//route to create post
router.post("/newPost",  async (req, res) => {
    try {
      console.log(req.body);
      const newPost = await Post.create({
        ...req.body,
        user_id: req.session.user_id,
      });
      console.log(newPost);
  
      res.status(200).json(newPost);
    } catch (err) {
      res.status(400).json(err);
    }
  });

module.exports = router;