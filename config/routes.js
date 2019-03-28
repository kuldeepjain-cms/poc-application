const express   =   require('express');
const router    =   express.Router();

const user  =   require('../app/controllers/user.controller');

router.get('/', user.fetch);
router.get('/:id', user.userDetails);
router.post('/create', user.create);
router.put('/:id/update', user.update);
router.delete('/:id/delete', user.delete);

module.exports  =   router;