import React from "react";

const Footer = ({ completeTaskCount = 0, activeTaskCount = 0 }) => {
	return (
		<>
			{completeTaskCount + activeTaskCount > 0 && (
				<div className="text-center">
					<p className="text-sm text-muted-foreground">
						{completeTaskCount > 0 && (
							<>
								Tuyệt vời! Bạn đã hoàn thành {completeTaskCount}{" "}
								việc
								{activeTaskCount > 0 && (
									<> và còn {activeTaskCount} việc đang chờ</>
								)}
							</>
						)}
						{completeTaskCount === 0 && activeTaskCount > 0 && (
							<>Cố lên! Bạn còn {activeTaskCount} việc đang chờ</>
						)}
					</p>
				</div>
			)}
		</>
	);
};

export default Footer;
