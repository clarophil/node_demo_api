// Get an instance of the express Router and set routes
let express = require('express');
let router = express.Router();              

// Import contact controller
var userController = require('./controllers/userController');
var userControllerApi = require('./controllers/userControllerApi');

router.get('/', (request, response) => response.redirect('/user'));

router.get('/user', userController.userList);
router.get('/user/add', userController.userFormAdd);
router.post('/user/new', userController.userNew);
router.get('/user/update/:iduser', userController.userFormUpdate);
router.get('/user/delete/:iduser', userController.userRemove);

router.get('/api/users', userControllerApi.userList);
router.post('/api/users', userControllerApi.userNew);
router.put('/api/users/:iduser', userControllerApi.userUpdate);
router.delete('/api/users/:iduser', userControllerApi.userRemove);

 module.exports = router;