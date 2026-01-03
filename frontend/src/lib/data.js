import { all } from "axios";

export const FilterType = {
	all: "tất cả",
	completed: "hoàn thành",
	active: "đang làm",
};

export const options = [
	{
		value: "today",
		label: "Hôm nay",
	},
	{
		value: "week",
		label: "Tuần này",
	},
	{
		value: "month",
		label: "Tháng này",
	},
	{
		value: "all",
		label: "Tất cả",
	},
];

export const visibleTaskLimit = 5;
