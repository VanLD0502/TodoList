import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "./ui/button";
import { Calendar, SquarePen, Trash2 } from "lucide-react";
import { Card } from "./ui/card";
import { CheckCircle, Circle } from "lucide-react";
import { Input } from "./ui/input";
import api from "@/lib/axios";
import { useState } from "react";
import { toast } from "sonner";
const TaskCard = ({ task, index, handleTaskChanged }) => {
	const [isEditting, setIsEditting] = useState(false);

	const [updateTaskTitle, setUpdateTaskTitle] = useState(task.title);

	const deleteTask = async (taskId) => {
		try {
			await api.delete(`/tasks/${taskId}`);
			toast.success("Task deleted successfully!");
			handleTaskChanged();
		} catch (error) {
			console.error("Error deleting task:", error);
			toast.error("Failed to delete task. Please try again.");
		}
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			updateTask();
		}
	};

	const updateTask = async () => {
		try {
			await api.put(`/tasks/${task._id}`, {
				title: updateTaskTitle,
			});
			toast.success("Task updated successfully!");
			handleTaskChanged();
			setIsEditting(false);
		} catch (error) {
			console.error("Error updating task:", error);
			toast.error("Failed to update task. Please try again.");
		}
	};

	const toggleTaskCompleteButton = async () => {
		try {
			if (task.status === "active") {
				await api.put(`/tasks/${task._id}`, {
					status: "complete",
					completedAt: new Date().toISOString(),
				});
				toast.success("Task marked as complete!");
			} else {
				await api.put(`/tasks/${task._id}`, {
					status: "active",
					completedAt: null,
				});
				toast.success("Task marked as active!");
			}
			handleTaskChanged();
		} catch (error) {
			console.error("Error toggling task complete status:", error);
			toast.error(
				"Failed to toggle task complete status. Please try again."
			);
		}
	};

	return (
		<Card
			className={cn(
				"p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
				task.status === "complete" && "opacity-75"
			)}
			style={{ animationDelay: `${index * 50}ms` }}
		>
			<div className="flex items-center gap-4">
				<Button
					variant="ghost"
					size="icon"
					className={cn(
						"shrink-0 size-8 rounded-full transition-all duration-200",
						task.status === "complete"
							? "text-success hover:text-success/80"
							: "text-muted-foreground hover:text-primary"
					)}
					onClick={toggleTaskCompleteButton}
				>
					{task.status === "complete" ? (
						<CheckCircle className="size-5" />
					) : (
						<Circle className="size-5" />
					)}
				</Button>

				{/*Hien thi chinh sua tieu de task*/}

				<div className="flex-1 min-w-0">
					{isEditting ? (
						<Input
							placeholder="Cần phải làm gì?"
							className="flex-1 h-12 text-base boder-border/50 focus:border-primary/50 focus:ring-primary/20"
							type="text"
							value={updateTaskTitle}
							onChange={(e) => setUpdateTaskTitle(e.target.value)}
							onKeyPress={handleKeyPress}
							onBlur={() => {
								setIsEditting(false);
								setUpdateTaskTitle(task.title || "");
							}}
						/>
					) : (
						<p
							className={cn(
								"text-base transition-all duration-200",
								task.status === "complete"
									? "line-through text-muted-foreground"
									: "text-foreground"
							)}
						>
							{task.title}
						</p>
					)}

					<div className="flex items-center gap-2 mt-1">
						<Calendar className="size-3 text-muted-foreground" />
						<span className="text-xs text-muted-foreground">
							{new Date(task.createdAt).toLocaleString()}
						</span>
						{task.completedAt && (
							<>
								<span className="text-xs text-muted-foreground">
									-
								</span>

								<Calendar className="size-3 text-muted-foreground" />

								<span className="text-xs text-muted-foreground">
									{new Date(
										task.completedAt
									).toLocaleString()}
								</span>
							</>
						)}
					</div>
				</div>

				<div className="hidden gap-2 group-hover:inline-flex animate-slide-up">
					<Button
						variant="ghost"
						size="icon"
						className="shrink-0 size-8 text-muted-foreground transition-colors hover:text-info "
						onClick={() => {
							setIsEditting(true);
							setUpdateTaskTitle(task.title || "");
						}}
					>
						<SquarePen className="size-4"></SquarePen>
					</Button>

					<Button
						variant="ghost"
						size="icon"
						className="shrink-0 size-8 text-muted-foreground transition-colors hover:text-destructive"
						onClick={() => deleteTask(task._id)}
					>
						<Trash2 className="size-4"></Trash2>
					</Button>
				</div>
			</div>
		</Card>
	);
};

export default TaskCard;
