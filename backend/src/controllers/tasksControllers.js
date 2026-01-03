import Task from "../models/Task.js";

export const getAllTasks = async (request, response) => {
	try {
		const { filter = "today" } = request.query;
		const now = new Date();

		let startDate;

		switch (filter) {
			case "today":
				startDate = new Date(
					now.getFullYear(),
					now.getMonth(),
					now.getDate()
				);
				break;
			case "week":
				const firstDayOfWeek =
					now.getDate() -
					(now.getDate() - 1) -
					(now.getDay() === 0 ? 7 : 0);
				startDate = new Date(
					now.getFullYear(),
					now.getMonth(),
					firstDayOfWeek
				);
				break;
			case "month":
				startDate = new Date(now.getFullYear(), now.getMonth(), 1);
				break;
			case "all":
				startDate = null;
				break;
			default:
				startDate = new Date(
					now.getFullYear(),
					now.getMonth(),
					now.getDate()
				);
		}

		const query = startDate
			? //gte: greater than or equal to
			  { createdAt: { $gte: startDate } }
			: {}; //lay tat ca
		const result = await Task.aggregate([
			{ $match: query },
			{
				$facet: {
					tasks: [{ $sort: { createdAt: -1 } }],
					activeCount: [
						{ $match: { status: "active" } },
						{ $count: "count" },
					],
					completeCount: [
						{ $match: { status: "complete" } },
						{ $count: "count" },
					],
				},
			},
		]);

		const tasks = result[0].tasks;
		const activeCount = result[0].activeCount[0]?.count || 0;
		const completeCount = result[0].completeCount[0]?.count || 0;
		response.status(200).json({ tasks, activeCount, completeCount });
	} catch (error) {
		console.error("Error fetching tasks:", error);
		response.status(500).json({ message: "Server Error" });
	}
};

export const createTask = async (request, response) => {
	try {
		const { title } = request.body;
		const newTask = new Task({ title });
		const savedTask = await newTask.save();
		response.status(201).json(savedTask);
	} catch (error) {
		console.error("Error creating task:", error);
		response.status(500).json({ message: "Server Error" });
	}
};

export const updateTask = async (request, response) => {
	try {
		const { title, status, completedAt } = request.body;
		const updateTask = await Task.findByIdAndUpdate(
			request.params.id,
			{ title, status, completedAt },
			{ new: true, timestamps: false } //tra ve gia tri sau khi cap nhat
		);

		if (!updateTask) {
			return response.status(404).json({ message: "Task not found" });
		}
		response.status(200).json(updateTask);
	} catch (error) {
		console.error("Error updating task:", error);
		response.status(500).json({ message: "Server Error" });
	}
};

export const deleteTask = async (request, response) => {
	try {
		const deletedTask = await Task.findByIdAndDelete(request.params.id);

		if (!deletedTask) {
			return response.status(404).json({ message: "Task not found" });
		}

		response.status(200).json({ message: "Task deleted successfully" });
	} catch (error) {
		console.error("Error deleting task:", error);
		response.status(500).json({ message: "Server Error" });
	}
};
