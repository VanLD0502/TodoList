import AddTask from "@/components/AddTask";
import DateTimeFilter from "@/components/DateTimeFilter";
import Header from "@/components/Header";
import TaskListPagination from "@/components/TaskListPagination";
import StatsAndFilters from "@/components/StatsAndFilters";
import TaskList from "@/components/TaskList";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Toaster } from "sonner";
import api from "@/lib/axios";
import { visibleTaskLimit } from "@/lib/data";
export default function HomePage() {
	const [taskBuffer, setTaskBuffer] = useState([]);
	const [activeTaskCount, setActiveTaskCount] = useState(0);
	const [completeTaskCount, setCompleteTaskCount] = useState(0);
	const [filter, setFilter] = useState("all");
	const [dateQuery, setDateQuery] = useState("today");
	const [page, setPage] = useState(1);
	const fetchTasks = async () => {
		// try {
		// 	const res = await fetch("http://localhost:5002/api/tasks");
		// 	const data = await res.json();
		// 	setTaskBuffer(data);
		// 	console.log(data);
		// } catch (error) {
		// 	console.error("Error fetching tasks:", error);
		// 	toast.error("Failed to fetch tasks. Please try again.");
		// }

		try {
			const res = await api.get(`/tasks?filter=${dateQuery}`);
			console.log(res.data);
			setTaskBuffer(res.data.tasks);
			setActiveTaskCount(res.data.activeCount);
			setCompleteTaskCount(res.data.completeCount);
		} catch (error) {
			console.error("Error fetching tasks:", error);
			toast.error("Failed to fetch tasks. Please try again.");
		}
	};
	const handleTaskChanged = () => {
		fetchTasks();
	};

	useEffect(() => {
		fetchTasks();
		console.log("Fetching tasks with dateQuery:", dateQuery);
	}, [dateQuery]);

	const filteredTasks = taskBuffer.filter((task) => {
		switch (filter) {
			case "active":
				return task.status === "active";
			case "completed":
				return task.status === "complete";
			default:
				return true;
		}
	});

	const visibleTasks = filteredTasks.slice(
		(page - 1) * visibleTaskLimit,
		page * visibleTaskLimit
	);

	const totalPages = Math.ceil(filteredTasks.length / visibleTaskLimit);

	const handleNext = () => {
		if (page < totalPages) {
			setPage((page) => page + 1);
		}
	};

	const handlePrev = () => {
		if (page > 1) {
			setPage((page) => page - 1);
		}
	};

	const handlePageChange = (pageNumber) => {
		setPage(pageNumber);
	};
	return (
		<div className="min-h-screen w-full bg-[#f9fafb] relative">
			<Toaster position="bottom-right" />
			{/* Diagonal Fade Center Grid Background */}
			<div
				className="absolute inset-0 z-0"
				style={{
					backgroundImage: `
        linear-gradient(to right, #d1d5db 1px, transparent 1px),
        linear-gradient(to bottom, #d1d5db 1px, transparent 1px)
      `,
					backgroundSize: "32px 32px",
					WebkitMaskImage:
						"radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)",
					maskImage:
						"radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)",
				}}
			/>
			<div className="container pt-8 mx-auto relative z-10">
				<div className="w-full max-w-2xl p-6 mx-auto space-y-6">
					<Header></Header>

					<AddTask handleNewTaskAdded={handleTaskChanged} />

					<StatsAndFilters
						filter={filter}
						setFilter={setFilter}
						activeTaskCount={activeTaskCount}
						completeTaskCount={completeTaskCount}
					/>
					<TaskList
						filteredTasks={visibleTasks}
						filter={filter}
						handleTaskChanged={handleTaskChanged}
					/>

					<div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
						<TaskListPagination
							handleNext={handleNext}
							handlePrev={handlePrev}
							handlePageChange={handlePageChange}
							page={page}
							totalPages={totalPages}
						/>
						<DateTimeFilter
							dateQuery={dateQuery}
							setDateQuery={setDateQuery}
						></DateTimeFilter>
					</div>

					<Footer
						activeTaskCount={activeTaskCount}
						completeTaskCount={completeTaskCount}
					></Footer>
				</div>
			</div>
		</div>
	);
}
