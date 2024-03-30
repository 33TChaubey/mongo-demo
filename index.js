const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB ...', err))


const courseSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 5, maxlength: 255},
    category:{
        type: String,
        required: true,
        enum:['web', 'mobile', 'network']
    },
    author: String,
    tags: {
        type: Array,
        validate:{
            validator: function(value) {
                return value.length > 0;
        },
        message: 'A course have at least one tag'
    },
    date : {type: Date, default: Date.now},
    isPublished: Boolean,
    price: {
        type: Number,
        required: function(){
            {return this.isPublished}
        }
    }
}});


const Course = mongoose.model('Course', courseSchema);


async function createCourse(){
    const course = new Course({
        name: "Angular Course",
        category: "web",
        author: "Mosh",
        tags: [],
        isPublished: true,
        price: 15
    });

    try{
        const result = await course.save();
        console.log(result);
    }   
    catch(err){
        console.log(err.message);
    }
    
    
    
}

async function getCourse(){
     const pageNumber =2;
     const pageSize = 10;

    const courses = await Course
        .find({author: 'Mosh', isPublished: true})
        .skip(( pageNumber - 1 ) * pageSize )
        .limit(pageSize)
        .sort({ name : 1 })
        .select({ name: 1, tags: 1 })
    console.log(courses);
}
createCourse();