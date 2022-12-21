import React from 'react';
import { useState, useEffect } from 'react';
import moment from 'moment';
import Countdown from 'react-countdown';
import Link from 'next/link';

const TableScreen = ({ cancleSession }) => {
	const headerRow = ['S.No.', 'name', 'matric', 'time', 'file'];

	const [studentData, setStudentData] = useState([]);

	return (
		<div className="w-full bg-white flex">
			<div className="sidebar bg-blue-700 w-[288px] h-screen p-4">
				<div className="w-full h-auto mt-16">
					<ul className="nav-list  space-y-3">
						<li className="nav-itemn p-2 text-left px-6 bg-blue-500 rounded-lg text-white">
							Submissions
						</li>
						<li className="nav-itemn p-2 text-left  px-6 rounded-lg text-white">Dealines</li>
						<li className="nav-itemn p-2 text-left  px-6 rounded-lg text-white">Students</li>
						<Link href={'/'}>
							<li className="nav-itemn p-2 text-left  px-6 rounded-lg text-white">Home</li>
						</Link>
					</ul>
				</div>
			</div>

			<section className="dashboard w-full h-screen p-20">
				<main className="student_list border shadow-sm overflow-x-scroll md:overflow-x-hidden overflow-y-scroll h-[300px]">
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

				<button
					// onClick={cancleSession}
					className="submit_btn shadow-md hover:shadow-none capitalize mt-6 p-2 px-4 bg-blue-700 rounded-lg text-white"
				>
					Export as excel
				</button>
			</section>
		</div>
	);
};

export default TableScreen;
