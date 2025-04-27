const router = require("express").Router()

const { getTodosController, CreateTododController, getTododByIdController, deleteTodoByIdController, EditTodoController } = require("../controllers/todoController");


router.get("/",getTodosController)

router.post("/create",CreateTododController) 

router.get('/:id', getTododByIdController)

router.delete('/:id', deleteTodoByIdController)

router.put('/:id', EditTodoController)

module.exports = router;