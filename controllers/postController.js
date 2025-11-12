//Milestone 1

const posts = require('../data/post')

//index 
const index = (req, res) => {

    res.json(posts)
}

//show
const show = (req, res) => {

    const { id } = req.params
    console.log(id);


    const post = posts.find(item => item.id === parseInt(id))
    console.log(post);

    if (!post) {

        res.status(404).json({
            error: true,
            message: 'Resource not found'
        })
    }

    //res.send('Show the single pizza with ID:' + req.params.id)
    res.json(post)

}

//store 
const store = (req, res) => {
    console.log(req.body);
    //genero un nuovo id per il nuovo item
    const newId = posts[posts.length - 1].id + 1;
    //create a new object to add
    const { titolo, contenuto, immagine, tags } = req.body
    const newPost = {
        id: newId,
        titolo,
        contenuto,
        immagine,
        tags

    }
    console.log(newPost);
    //push into array
    posts.push(newPost)
    console.log(posts)
    //return response
    res.status(201);
    res.json(newPost)
    //res.send('Create a new post')
}

//update 
const update = (req, res) => {
    //recupero l'id 
    const id = parseInt(req.params.id)
    //cerco l'item tramite id 
    const post = posts.find(post => post.id == id);
    if (!post) {
        res.status(404);
        return res.json({
            error: "Non found",
            message: "post non trovato"
        })
    }
    //aggiorno il post 
    const { titolo, contenuto, immagine, tags } = req.body
    post.titolo = titolo;
    post.contenuto = contenuto;
    post.immagine = immagine;
    post.tags = tags;
    //controllo
    console.log(posts);
    //restituisco la risposta 
    res.json(posts);

    //res.send('Update the entire single post with ID:' + req.params.id)
}

//modify 
const modify = (req, res) => {
    res.send('Partial update for the single post with ID:' + req.params.id)
}

//destroy

const destroy = (req, res) => {
    const { id } = req.params
    console.log(id);


    const post = posts.find(item => item.id === parseInt(id))
    console.log(post);

    if (!post) {

        return res.status(404).json({
            error: true,
            message: 'Resource not found'
        })
    }

    posts.splice(posts.indexOf(post), 1);
    console.log(posts);

    res.sendStatus(204)
}


//esporto le azioni 
module.exports = {
    index,
    show,
    store,
    update,
    modify,
    destroy
}
//fare le prove con Postman per vedere se funziona
//Con Postman funziona! 