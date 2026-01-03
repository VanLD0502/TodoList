import React from "react";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
const TaskListPagination = ({
	handleNext,
	handlePrev,
	handlePageChange,
	page,
	totalPages,
}) => {
	const generatePages = () => {
		const pages = [];

		if (totalPages < 4) {
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i);
			}
		} else {
			if (pages < 2) {
				pages.push(1, 2, 3, "...", totalPages);
			} else if (page >= totalPages - 1) {
				pages.push(
					1,
					"...",
					totalPages - 2,
					totalPages - 1,
					totalPages
				);
			} else {
				pages.push(1, "...", page, "...", totalPages);
			}
		}

		return pages;
	};

	const pagesToShow = generatePages();
	return (
		<Pagination>
			{/* Truoc */}
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						onClick={page == 1 ? undefined : handlePrev}
						className={cn(
							"cursor-pointer",
							page == 1 && "pointer-events-none opacity-50"
						)}
					/>
				</PaginationItem>

				{pagesToShow.map((pageNum, index) =>
					pageNum === "..." ? (
						<PaginationItem key={index}>
							<PaginationEllipsis />
						</PaginationItem>
					) : (
						<PaginationItem key={index}>
							<PaginationLink
								isActive={pageNum === page}
								onClick={() => {
									if (pageNum !== page)
										handlePageChange(pageNum);
								}}
								className={cn("cursor-pointer")}
							>
								{pageNum}
							</PaginationLink>
						</PaginationItem>
					)
				)}
				{/* Sau */}
				<PaginationItem>
					<PaginationNext
						onClick={page == totalPages ? undefined : handleNext}
						className={cn(
							"cursor-pointer",
							page == totalPages &&
								"pointer-events-none opacity-50"
						)}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};

export default TaskListPagination;
