//importo express
const express = require('express');
//creo l'istanza principale
const router = express.Router()

//importo il Controller
const postController = require('../controllers/postController')



//lista post index
router.get('', postController.index)

//show 
router.get('/:id', postController.show)


//store

router.post('', postController.store)

// update
router.put('/:id', postController.update)

// modify (U)
router.patch('/:id', postController.modify)

// destroy (D)
router.delete('/:id', postController.destroy)



//esporto
module.exports = router;
