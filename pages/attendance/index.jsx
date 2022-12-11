import { useState, useEffect } from 'react';
import moment from 'moment';

const Home = () => {
	const headerRow = ['S.No.', 'name', 'matric', 'time', 'file'];

	const [newData, seetNewData] = useState({});
	const [activeForm, setActveForm] = useState(false);
	const [deadlineHour, setHour] = useState();
	const [deadlineMinues, setMinues] = useState();
	const [studentData, setStudentData] = useState([
		// {
		// 	name: 'bobby',
		// 	matric: '170211020',
		// 	time: '3:54 pm',
		// 	total: '56%'
		// }
	]);

	function getActiveSessionTime() {
		const dl = JSON.parse(localStorage.getItem('deadlineTime'));
		if (dl) {
			setHour(dl.hr);
			setMinues(dl.min);
		} else {
			setActveForm(false);
		}
	}

	let currentDate = new Date();
	let cDay = currentDate.getDate();
	let cMonth = currentDate.getMonth() + 1;
	let cYear = currentDate.getFullYear();
	let cHour = currentDate.getHours();
	let cMinutes = currentDate.getMinutes();
	const fullDay = cDay + '-' + cMonth + '-' + cYear;

	function setDeadlineTime() {
		if (deadlineHour && deadlineMinues) {
			const dealineTime = {
				hr: deadlineHour,
				min: deadlineMinues
			};

			localStorage.setItem('deadlineTime', JSON.stringify(dealineTime));
			setActveForm(true);
		} else {
			return;
		}
	}

	function onChangeHander(e, fieldName) {
		e.preventDefault();

		seetNewData({
			...newData,
			[fieldName]: e.target.value
		});
	}

	useEffect(() => {
		const dl = localStorage.getItem('deadlineTime');
		if (dl) {
			setActveForm(true);
		}
	}, [deadlineHour, setDeadlineTime]);

	useEffect(() => {
		if (activeForm) {
			getActiveSessionTime();
		}
	}, [activeForm]);

	function submitHandler(e) {
		e.preventDefault();

		console.log(cHour, cMinutes);

		if (cHour < deadlineHour || (cHour = deadlineHour && cMinutes < deadlineMinues)) {
			let currentDate = new Date();
			let time = currentDate.getHours() + ':' + currentDate.getMinutes() + ':' + currentDate.getSeconds();

			const newStudenInfo = {
				...newData,
				time: time,
				total: '79%'
			};

			setStudentData([...studentData, newStudenInfo]);
		} else {
			localStorage.removeItem('deadlineTime');
			window.alert('not accepting submission');
			setActveForm(false);
		}
	}

	return (
		<>
			{activeForm ? (
				<div className="w-full bg-white">
					<nav className=" w-full h-14 bg-blue-700 text-white flex justify-between items-center px-4 md:px-[100px] ">
						<div className="logo">
							<h1 className="logo-text text-xl"> REPORT SUBMISSON PORTAL</h1>
						</div>
						<div className="hidden md:flex md:middle time  space-x-2">
							<h1 className="deadline capitalize text-sm">accepting report till :</h1>

							<h1 className="italic text-xl font-bold">
								{deadlineHour} : {deadlineMinues}
							</h1>
						</div>
					</nav>

					<section className="list_body px-4 md:px-[100px] space-y-5 mt-8 pb-11">
						<div className="section_header middle justify-between font-semibold">
							<h1 className="title text-lg md:text-2xl text-gray-600 capitalize md:middle stack">
								<h1>Course code:</h1>
								<h1 className="text-xs"> ECE 504</h1>
							</h1>

							<div className="date_time text-sm md:text-2xl text-gray-600 md:middle stack">
								<h1 className="text-right">Date: </h1>
								<h1 className="text-xs"> {fullDay}</h1>
							</div>
						</div>

						<div className="subhead flex justify-between">
							<div className="level_details">
								<h1 className="body text-gray-500">500l</h1>
								<h1 className="body text-gray-500">Raining season</h1>
							</div>

							<h1 className="counts capitalize text-xs md:middle stack">
								<h1>total present students: </h1>
								<h1 className="text-right">{studentData.length}</h1>
							</h1>
						</div>

						<button
							onClick={() => localStorage.removeItem('deadline')}
							className="submit_btn shadow-md hover:shadow-none capitalize p-2 px-4 bg-blue-700 rounded-lg text-white"
						>
							cancle deadline
						</button>

						<main className="student_list border shadow-sm overflow-x-scroll md:overflow-x-hidden overflow-y-scroll h-[250px]">
							<table className=" w-[800px] md:w-full relative">
								<thead className="sticky top-0 w-full">
									<tr className="capitalize h-11 bg-blue-700 text-white">
										{headerRow.map((data, index) => (
											<th key={index}>{data}</th>
										))}
									</tr>
								</thead>

								{!!studentData.length ? (
									<tbody>
										{studentData.map((row, index) => (
											<tr
												key={index}
												className="tabel_row h-11 hover:bg-gray-200 cursor-pointer text-sm text-gray-500 text-center"
											>
												<td>{index + 1}</td>
												<td>{row.name}</td>
												<td>{row.matric}</td>
												<td>{row.time}</td>
												<td>{row.total}</td>
											</tr>
										))}
									</tbody>
								) : (
									<></>
								)}
							</table>
						</main>

						<div className="action_center border bg-blue-50 rounded-md shadow   w-full p-8">
							<form onSubmit={(e) => submitHandler(e)} className=" w-full stack">
								<div className="md:hidden middle time  space-x-2">
									<h1 className="deadline capitalize ">accepting report till :</h1>

									<h1 className="italic text-xl font-bold">
										{deadlineHour} : {deadlineMinues}
									</h1>
								</div>

								<h1 className="time capitalize">
									current time: {cHour}:{cMinutes}
								</h1>

								<div className="inputs stack  md:space-x-4  md:middle">
									<div className="input_field_component">
										<label htmlFor="name">upload Report:</label>
										<input
											type="file"
											placeholder="e.g: bobby"
											name="name"
											id="name"
											className="input_field bg-white"
											onChange={(e) => onChangeHander(e, 'name')}
										/>
									</div>

									<div className="input_field_component">
										<label htmlFor="name">student name:</label>
										<input
											type="text"
											placeholder="e.g: bobby"
											name="name"
											id="name"
											className="input_field"
											onChange={(e) => onChangeHander(e, 'name')}
										/>
									</div>

									<div className="input_field_component">
										<label htmlFor="matric">matric:</label>
										<input
											type="text"
											name="matric"
											placeholder="e.g: 170211020"
											id="matric"
											className="input_field"
											onChange={(e) => onChangeHander(e, 'matric')}
										/>
									</div>
								</div>

								<div className="btn_box flex justify-start p-2">
									<button className="submit_btn shadow-md hover:shadow-none capitalize p-2 px-4 bg-blue-700 rounded-lg text-white">
										submit
									</button>
								</div>
							</form>
						</div>
					</section>
				</div>
			) : (
				<div className="group h-screen w-screen centered p-4">
					<div className="card bg-blue-50 shadow-xl w-auto border p-4 h-auto rounded-lg stack">
						<h1 className="title text-lg md:text-2xl font-semibold m-2 text-gray-600 capitalize md:middle stack">
							set deadline for report submisson
						</h1>
						<hr />

						<div className="w-full stack p-1 space-y-2">
							<label htmlFor="matric">Hours:</label>
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
				</div>
			)}
		</>
	);
};

export default Home;
