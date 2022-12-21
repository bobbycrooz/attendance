import React from 'react';
import { useState, useEffect } from 'react';
import moment from 'moment';
import Countdown from 'react-countdown';
import Link from 'next/link';

const SubmissionScreen = ({ cancleSession }) => {
	const [newData, seetNewData] = useState({});
	const [activeForm, setActveForm] = useState(false);
	const [countdown, showCountDown] = useState(false);
	const [deadlineHour, setHour] = useState();
	const [deadlineMinues, setMinues] = useState();
	const [formatedDateString, setString] = useState('');
	const [studentData, setStudentData] = useState([]);

	let currentDate = new Date();
	let cDay = currentDate.getDate();
	let cMonth = currentDate.getMonth() + 1;
	let cYear = currentDate.getFullYear();
	let cHour = currentDate.getHours();
	let cMinutes = currentDate.getMinutes();
	const fullDay = cDay + '-' + cMonth + '-' + cYear;

	// handlers
	function getActiveSessionTime() {
		const dl = JSON.parse(localStorage.getItem('deadlineTime'));
		if (dl) {
			setHour(dl.hr);
			setMinues(dl.min);
		} else {
			setActveForm(false);
		}

		setString(
			`${cYear}-${cMonth}-${cDay}T${deadlineHour?.length == 1 ? `0${deadlineHour}` : deadlineHour}:${
				deadlineMinues?.length == 1 ? `0${deadlineMinues}` : deadlineMinues
			}:00`
		);

		showCountDown(true);
	}

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

			// let tab = document.getElementsByTagName('table');
			// console.log(tab);
			// tab[0].scrollIntoView();

			setStudentData([...studentData, newStudenInfo]);
		} else {
			cancleSession();
			// localStorage.removeItem('deadlineTime');
			window.alert('not accepting submission');

			// setActveForm(false);
		}
	}

	//useEffects
	useEffect(() => {
		if (activeForm) {
			getActiveSessionTime();
		}
	});

	useEffect(() => {
		const dl = localStorage.getItem('deadlineTime');
		if (dl) {
			setActveForm(true);
		} else {
			setActveForm(false);
		}
	}, [deadlineHour, setDeadlineTime]);

	const renderer = ({ hours, minutes, seconds, completed }) => {
		if (completed) {
			// Render a completed state
			return <h1>form closed</h1>;
		} else {
			// Render a countdown
			return (
				<h1 className="italic text-xl font-bold">
					{hours}:{minutes}:{seconds}
				</h1>
			);
		}
	};

	return (
		<div className="w-full bg-white">
			<nav className=" w-full h-14 bg-blue-700 text-white flex justify-between items-center px-4 md:px-[100px] ">
				<div className="logo">
					<h1 className="logo-text text-xl"> REPORT SUBMISSON PORTAL</h1>
				</div>
				<div className="hidden md:flex md:middle time  space-x-2">
					{countdown && (
						<Countdown date={new Date(String(formatedDateString))} renderer={renderer} />
					)}
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
						<h1>total submited report: </h1>
						<h1 className="text-right">{studentData.length}</h1>
					</h1>
				</div>

				<div className="middle space-x-3">
					<button
						onClick={cancleSession}
						className="submit_btn shadow-md hover:shadow-none capitalize p-2 px-4 bg-blue-700 rounded-lg text-white"
					>
						cancle deadline
					</button>

					{countdown && (
						<Countdown date={new Date(String(formatedDateString))} renderer={renderer} />
					)}
				</div>

				<div className="my-4">
					<Link href={'/table'}>
						<button
							// onClick={cancleSession}
							className="submit_btn shadow-md hover:shadow-none capitalize p-2 px-4 border-blue-700 rounded-lg text-blue-700 border"
						>
							view Submissions
						</button>
					</Link>
				</div>

				<div className=" md:empty-list my-11  text-yellow-600 p-6 rounded-lg text-center border border-yellow-500 shadow-sm ">
					<h1>No submission has been made</h1>
					<h1>Submit your assignment with the form below</h1>
				</div>

				<div className="action_center border bg-blue-50 rounded-md shadow   w-full p-8">
					<form onSubmit={(e) => submitHandler(e)} className=" w-full stack">
						{/* <div className="md:hidden middle time  space-x-2">
									{countdown && (
										<Countdown
											date={new Date(String(formatedDateString))}
											renderer={renderer}
										/>
									)}
								</div> */}

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
	);
};

export default SubmissionScreen;
