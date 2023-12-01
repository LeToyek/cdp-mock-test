const { PrismaClient } = require("@prisma/client");
const { cache } = require("ejs");
const prisma = new PrismaClient();

const addTodo = async (req, res, next) => {
  const { title, content } = req.body;
  try {
    const todo = await prisma.todo.create({
      data: {
        title,
        content,
        user: {
          connect: {
            id: req.user.id,
          },
        },
      },
    });
    res.json({
      status: true,
      message: "Todo created successfully",
      error: null,
      data: todo,
    });
  } catch (error) {
    next(error);
  }
};

const getTodo = async (req, res, next) => {
  try {
    const todos = await prisma.todo.findMany({
      where: {
        userId: req.user.id,
      },
    });
    res.json({
      status: true,
      message: "Todos fetched successfully",
      error: null,
      data: todos,
    });
  } catch (error) {
    next(error);
  }
}

const updateTodo = async (req, res, next) => {
  const { title, content } = req.body;
  const { id } = req.params;
  try {
    const todo = await prisma.todo.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title,
        content,
      },
    });
    res.json({
      status: true,
      message: "Todo updated successfully",
      error: null,
      data: todo,
    });
  } catch (error) {
    next(error);
  }
}

const deleteTodo = async (req, res, next) => {
  const { id } = req.params;
  try {
    const todo = await prisma.todo.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json({
      status: true,
      message: "Todo deleted successfully",
      error: null,
      data: todo,
    });
  } catch (error) {
    next(error);
  }
}
module.exports = {
  addTodo,
  getTodo,
  updateTodo,
  deleteTodo
}