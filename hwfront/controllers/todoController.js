
const todoSchema = require("../schemas/todoSchema")
const getTodosController = async(req,res)=>{
    const todos = await todoSchema.find();

    if(todos.length > 0){
        res.status(200).json({
            data:todos,
            message:"Data fetched successfully",
            success:true
        })
    }
    else{
        res.status(404).json({
            data:[],
            message:"No data found",
            success:false
        })

    }
}


const CreateTododController=(req,res)=>{
    const {name, title, description} = req.body;

    const todo = new todoSchema({
        name: name,
        title:title,
        description: description
    })
    if(todo){
        todo.save();
        res.status(201).json({
            data:todo,
            message:"Todo",
            success:true
        })
    }
    else {
        res.status(400).json({
            data:null,
            message:"Todo not created",
            success:false
        })
    }
}

const getTododByIdController= async (req,res)=>{
    const { id } = req.params;
    
    const findDataInDb = await todoSchema.findById(id);
    if(findDataInDb){
        res.status(200).json({
            data:findDataInDb,
            message:"Todo fetched",
            success:true
        })
    }
    else {
        res.status(404).json({
            data:null,
            message:"Todo not created",
            success:false
        })
    }

}

const deleteTodoByIdController = async(req,res)=>{
    const { id } = req.params;
    
    const findDataInDb = await todoSchema.findByIdAndDelete(id);
    if(findDataInDb){
        res.status(200).json({
            data:findDataInDb,
            message:"Todo fetched",
            success:true
        })
    }
    else {
        res.status(404).json({
            data:null,
            message:"Todo not created",
            success:false
        })
    }
}

const EditTodoController = async(req,res) => {
    const { id } = req.params;
    const {name, title, description} = req.body;
    const findTodo = await todoSchema.findById(id)
    if(findTodo){
        const updateTodo = await todoSchema.findByIdAndUpdate(id, {
            name:name,
            title:title,
            description:description
        }, {
            new:true
        }
    )
    res.status(200).json({
        data:updateTodo,
        message:"Todo updated successfully",
        success:true
    })

    }

    else{
        res.status(404).json({
            data:null,
            message:"Todo not updated ",
            success:false
        })
    }
}

// module.exports = router.get("/", async(req,res) => {
//     const todos = await todoSchema.find();

//     if(todos.length > 0){
//         res.status(200).json({
//             data:todos,
//             message:"Data fetched successfully",
//             success:true
//         })
//     }
//     else{
//         res.status(404).json({
//             data:[],
//             message:"No data found",
//             success:false
//         })

//     }
// })



module.exports = {
    getTodosController,
    CreateTododController,
    getTododByIdController,
    deleteTodoByIdController,
    EditTodoController
}