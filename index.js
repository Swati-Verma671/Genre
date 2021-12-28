const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const genres = [
    { id:1, name:'Action'},
    { id:2, name:'Adventure'},
    { id:3, name:'Romance'},
    { id:4, name:'Comedy'},
    { id:5, name:'Mystery'},
    { id:6, name:'Drama'},
    { id:7, name:'Fantasy'},
    { id:8, name:'Horror'},
    { id:9, name:'Western'}

];

app.get('/',(req,res) =>{
    res.send("Welcome :). A Beginner's attempt in creating a REST API using end points that utilise GET, POST, PUT and DELETE. ")
})

app.get('/api/genres',(req,res) =>{
    res.send(genres);
});



app.post('/api/genres',(req,res) =>{
    const {error}= validateGenre(req.body);
    if (error){
        res.status(400).send(error.details[0].message);
        return;
    }

    const genre={
        id:genres.length+1,
        name:req.body.name
    };
    genres.push(genre);
    res.send(genres);
});

app.put('/api/genres/:id',(req,res) =>{
    const genre=genres.find(c => c.id ===parseInt(req.params.id));
    if(!genre){
        res.status(404).send('The id does not exist');
        return
    }
    const {error}= validateGenre(req.body);
    if (error){
        res.status(400).send(error.details[0].message);
        return;
    }


    genre.name=req.body.name;
    res.send(genre);

});

app.get('/api/genres/:id',(req,res) =>{
    const genre=genres.find(c => c.id === parseInt(req.params.id));
    if(!genre){
        res.status(404).send('The genre id was not found.');
        return;
    }

    res.send(genre);


});

app.delete('/api/courses/:id',(req,res) =>{
    const genre=genres.find(c =>c.id === parseInt(req.params.id));
    if(!genre){
        res.status(404).send('The genre id was not found.');
        return;
    }
    

    const index=genres.indexOf(genre);
    genres.splice(index,1);

    res.send(genre);


    
})


function validateGenre(Genre){
    const schema= Joi.object({
        name:Joi.string().min(3).required()
    });
    return schema.validate(Genre);
}

const port = process.env.PORT || 3000;
app.listen(port,() => console.log(`Listening to the port ${port}.....`));

