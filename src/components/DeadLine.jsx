import React from 'react';
import Pattern from './Pattern';

const DeadLine = ({ setDeadlineTime, setHour, setMinues }) => {
	let currentDate = new Date();
	let cDay = currentDate.getDate();
	let cMonth = currentDate.getMonth() + 1;
	let cYear = currentDate.getFullYear();
	let cHour = currentDate.getHours();
	let cMinutes = currentDate.getMinutes();
	const fullDay = cDay + '-' + cMonth + '-' + cYear;

	return (
		<div className="group h-screen bg-blue-200 w-screen centered p-4 setDeadLine relative">
			<div className="card z-20 bg-white shadow-xl w-auto border p-4 h-auto rounded-lg stack">
				<h1 className="title text-lg md:text-2xl font-semibold m-2 text-gray-600 capitalize md:middle text-center stack">
					set deadline for assignment submisson
					<br />
					using 24hr format
				</h1>

				<hr />

				<h1 className="current capitalize text-gray-600 font-normal">
					current time is:{cHour}hr :{cMinutes} min{' '}
				</h1>

				<div className="w-full stack p-1 space-y-2">
					<label htmlFor="matric">Hour:</label>
					<input
						type="number"
						name="matric"
						placeholder="max: 24"
						id="hour"
						className="p-2"
						max={24}
						min={new Date().getHours()}
						onChange={(e) => setHour(e.target.value)}
					/>
				</div>

				<div className="w-full stack p-1 space-y-2">
					<label htmlFor="matric">Minutes:</label>
					<input
						type="number"
						name="matric"
						placeholder="max: 30"
						id="min"
						className="p-2"
						max={30}
						onChange={(e) => setMinues(e.target.value)}
					/>
				</div>

				<div className="btn_box flex justify-center p-2 w-full ">
					<button
						onClick={setDeadlineTime}
						className="submit_btn shadow-md hover:shadow-none capitalize p-2 px-4 bg-blue-700 rounded-lg text-white"
					>
						start accepting submisson
					</button>
				</div>
			</div>

			{/* background images */}
			<Pattern />
		</div>
	);
};

export default DeadLine;
