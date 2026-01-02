export const getAllTasks = (request, response) => {
	response.status(200).send("Get tasks");
};

export const createTask = (request, response) => {
	response.status(200).send("Create Task");
};

export const updateTask = (request, response) => {
	response.status(200).send("Update Task");
};

export const deleteTask = (request, response) => {
	response.status(200).send("Delete Task");
};
