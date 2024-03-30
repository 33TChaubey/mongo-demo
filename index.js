const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB ...', err))


const courseSchema = new mongoose.Schema({
    name: {type: String, required: true},
    author: String,
    tags: [ String ],
    date : {type: Date, default: Date.now},
    isPublished: Boolean,
    price: Number
});


const Course = mongoose.model('Course', courseSchema);


async function createCourse(){
    const course = new Course({
        // name: "Angular course",
        author: "Mosh",
        tags: ['Angular', 'frontend'],
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