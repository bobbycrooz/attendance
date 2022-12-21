import { useState, useEffect } from 'react';
import DeadLine from '../src/components/DeadLine';
// import moment from 'moment';
// import Countdown from 'react-countdown';
import SubmissionScreen from '../src/components/SubmissonScreen';

const Home = () => {
	const headerRow = ['S.No.', 'name', 'matric', 'time', 'file'];

	const [newData, seetNewData] = useState({});
	const [activeForm, setActveForm] = useState(false);
	const [countdown, showCountDown] = useState(false);
	const [deadlineHour, setHour] = useState();
	const [deadlineMinues, setMinues] = useState();
	const [formatedDateString, setString] = useState('');
	// const [studentData, setStudentData] = useState([
	// 	// {
	// 	// 	name: 'bobby',
	// 	// 	matric: '170211020',
	// 	// 	time: '3:54 pm',
	// 	// 	total: '56%'
	// 	// }
	// ]);

	// if (typeof window !== undefined && !activeForm) {
	// 	console.log(typeof window);
	// 	// typeof window !== undefined && localStorage.clear();
	// 	// typeof window !== undefined && localStorage.removeItem('deadlineTime');
	// }

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

	useEffect(() => {
		if (activeForm) {
			getActiveSessionTime();
		}
	});

	function cancleSession() {
		localStorage.removeItem('deadlineTime');
		setHour();
		setMinues();
		setActveForm(false);
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

	// function onChangeHander(e, fieldName) {
	// 	e.preventDefault();

	// 	seetNewData({
	// 		...newData,
	// 		[fieldName]: e.target.value
	// 	});
	// }

	useEffect(() => {
		const dl = localStorage.getItem('deadlineTime');
		if (dl) {
			setActveForm(true);
		} else {
			setActveForm(false);
		}
	}, [deadlineHour, setDeadlineTime]);

	// function submitHandler(e) {
	// 	e.preventDefault();

	// 	console.log(cHour, cMinutes);

	// 	if (cHour < deadlineHour || (cHour = deadlineHour && cMinutes < deadlineMinues)) {
	// 		let currentDate = new Date();
	// 		let time = currentDate.getHours() + ':' + currentDate.getMinutes() + ':' + currentDate.getSeconds();

	// 		const newStudenInfo = {
	// 			...newData,
	// 			time: time,
	// 			total: '79%'
	// 		};

	// 		let tab = document.getElementsByTagName('table');
	// 		console.log(tab);
	// 		tab[0].scrollIntoView();

	// 		setStudentData([...studentData, newStudenInfo]);
	// 	} else {
	// 		cancleSession();
	// 		// localStorage.removeItem('deadlineTime');
	// 		window.alert('not accepting submission');

	// 		// setActveForm(false);
	// 	}
	// }

	// const renderer = ({ hours, minutes, seconds, completed }) => {
	// 	if (completed) {
	// 		// Render a completed state
	// 		return <h1>form closed</h1>;
	// 	} else {
	// 		// Render a countdown
	// 		return (
	// 			<h1 className="italic text-xl font-bold">
	// 				{hours}:{minutes}:{seconds}
	// 			</h1>
	// 		);
	// 	}
	// };

	return (
		<>
			{activeForm ? (
				<SubmissionScreen cancleSession={cancleSession} />
			) : (
				<DeadLine setDeadlineTime={setDeadlineTime} setHour={setHour} setMinues={setMinues} />
			)}
		</>
	);
};

export default Home;
// 2022-
