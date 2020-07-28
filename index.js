const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');
//app has multiple properties
const app = express();

//set value for property-> telling which engine we are using
app.set('view engine','ejs');

//__dirname is making it dynamic
app.set('views', path.join(__dirname,'views'));

// Middleware
app.use(express.urlencoded());

app.use(express.static('assets'));

//Middleware -> making new
// app.use(function(request,response,next){
//    console.log('Middleware 1 called');
//   request.myName = "Arpan";
//    next();
// });

// app.use(function(request,response,next){
//    console.log('My name is ',request.myName);
//    next();
// });

var contactList = [
    {
        name:"Arpan",
        phone:"26262626626"
    },
    {
        name:"Krishh",
        phone:"26262623426"
    },
    {
        name:"Kartikay",
        phone:"26262567626"
    },
    {
        name:"Shreya",
        phone:"26262626677"
    },

]


app.get('/',function(request,response){

    Contact.find({},function(err,contacts){
    if(err){
        console.log('error in fetching contacts from db');
    }
    return response.render('home',{
        title:'Contacts List',
        contact_list:contacts
    });
    });
    
})

var arr = ["Krishh","Kt","Priya","Shreya","Trimurti"]

app.get('/practice',function(request,response){
    response.render('practice',{
        title:'My second page in express',
        listOfName: arr
    });
})

app.post('/create-contact',function(request,response){
        Contact.create({
            name : request.body.name,
            phone: request.body.phone
        },function(err,newContact){
            if(err){console.log('error in creating a contact!'); return;}
        
            console.log('**********', newContact);
            return response.redirect('back');
        });
    });
   
    
    app.get('/delete-contact/',function(request,response){
        //get query from url
         let id = request.query.id;
    
        // find the contact in datbase using if and delete
        Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('Error in deleting the contact from database');
            return;
        }
        return response.redirect('back');
        });     
    });
       

// app.get('/delete-contact/',function(request,response){
//     //get query from url
//      let phone = request.query.phone;

//      //get index of required contact to be deleted
//      let contactIndex = contactList.findIndex(contact => contact.phone == phone);

//      if (contactIndex != -1){
//          contactList.splice(contactIndex,1);
//      }

//      return response.redirect('back');
     
// });




app.listen(port,function(err){
if(err){
    console.log('Error in running the server: ' , err)
}

console.log('Port is running on port: ',port);
});


// 1) install ejs
// 2) app.set -> view engine
//         ->   view path
// 3) views directory + File
// 4) render-> response.render        