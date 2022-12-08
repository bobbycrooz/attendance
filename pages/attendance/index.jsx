import { useState } from 'react';

const Home = () => {
	const headerRow = ['S.No.', 'name', 'matric', 'time', 'total attendace (%)'];

	const [newData, seetNewData] = useState({});
	const [studentData, setStudentData] = useState([
		// {
		// 	name: 'bobby',
		// 	matric: '170211020',
		// 	time: '3:54 pm',
		// 	total: '56%'
		// }
	]);

	let currentDate = new Date();
	let cDay = currentDate.getDate();
	let cMonth = currentDate.getMonth() + 1;
	let cYear = currentDate.getFullYear();
	const fullDay = cDay + '-' + cMonth + '-' + cYear;

	function onChangeHander(e, fieldName) {
		e.preventDefault();

		seetNewData({
			...newData,
			[fieldName]: e.target.value
		});
	}

	function submitHandler(e) {
		e.preventDefault();

		let currentDate = new Date();
		let time = currentDate.getHours() + ':' + currentDate.getMinutes() + ':' + currentDate.getSeconds();

		const newStudenInfo = {
			...newData,
			time: time,
			total: '79%'
		};

		setStudentData([...studentData, newStudenInfo]);
	}

	return (
		<div className="w-full bg-white">
			<nav className=" w-full h-14 bg-gray-500 text-white flex justify-between items-center px-4 md:px-[100px] ">
				<div className="logo">
					<h1 className="logo-text text-xl"> ATTENDANCE Scheme</h1>
				</div>
				{/* <div className="navlist">
					<ul className="navs flex space-x-3">
						<li className="home">home</li>
						<li className="home">home</li>
						<li className="home">home</li>
					</ul>
				</div> */}
			</nav>

			<section className="list_body px-4 md:px-[100px] space-y-5 mt-8 pb-11">
				<div className="section_header middle justify-between font-semibold">
					<h1 className="title text-lg md:text-2xl text-gray-600 capitalize md:middle stack">
						<h1>present students for course:</h1>
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

					<hi className="counts capitalize text-xs md:middle stack">
						<h1>total present students: </h1>
						<h1 className="text-right">{studentData.length}</h1>
					</hi>
				</div>

				<main className="student_list border shadow-sm overflow-x-scroll md:overflow-x-hidden overflow-y-scroll h-[250px]">
					<table className=" w-[800px] md:w-full relative">
						<thead className="sticky top-0 w-full">
							<tr className="capitalize h-11 bg-gray-300">
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

				<div className="action_center border bg-gray-50 rounded-md shadow   w-full p-8">
					<form onSubmit={(e) => submitHandler(e)} className=" w-full stack">
						<div className="inputs stack  md:space-x-4  md:middle">
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
							<button className="submit_btn shadow-md hover:shadow-none capitalize p-2 px-4 bg-gray-500 rounded-lg text-white">
								mark present
							</button>
						</div>
					</form>
				</div>
			</section>
		</div>
	);
};

export default Home;
