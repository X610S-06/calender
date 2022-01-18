import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'

const Calender = () => {
	//initialisation
	const [england, setEngland] = useState([])
	const [scotland, setScotland] = useState([])
	const [ireland, setIreland] = useState([])
	const [customDate, setCustomDate] = useState({
		from: '',
		to: '',
	})
	const arr = [...england, ...scotland, ...ireland]
	const [results, setResults] = useState([])

	//fetching data
	useEffect(() => {
		axios('https://www.gov.uk/bank-holidays.json')
			.then((response) => {
				setEngland(response.data['england-and-wales'].events)
				setScotland(response.data.scotland.events)
				setIreland(response.data['northern-ireland'].events)
			})
			.catch((error) => console.error(error))
	}, [])

	const date = new Date()
	//handling yesterday filter
	const handleYesterday = () => {
		let array = []
		const yesterday = moment(date).subtract(1, 'days').format('YYYY-MM-DD')
		// console.log(yesterday)
		console.log('Results for yesterday :')
		arr.forEach((item) => {
			if (moment(item.date).format('YYYY-MM-DD') === yesterday) {
				array.push(item)
			}
			setResults([...array])
		})
	}

	//handling lastweek filter
	const handleLastWeek = () => {
		let array = []
		const today = moment(date).format('YYYY-MM-DD')
		const week = moment(date).subtract(7, 'days').format('YYYY-MM-DD')

		console.log('Results for last week :')
		arr.forEach((item) => {
			if (
				moment(item.date).format('YYYY-MM-DD') <= today &&
				moment(item.date).format('YYYY-MM-DD') >= week
			) {
				array.push(item)
			}
			setResults([...array])
		})
	}

	//handling lastmonth filter
	const handleLastMonth = () => {
		let array = []
		const today = moment(date).format('YYYY-MM-DD')
		const month = moment(date).subtract(30, 'days').format('YYYY-MM-DD')

		console.log('Results for last month :')
		arr.map((item) => {
			if (
				moment(item.date).format('YYYY-MM-DD') <= today &&
				moment(item.date).format('YYYY-MM-DD') >= month
			) {
				array.push(item)
			}
			setResults([...array])
		})
	}

	//handling custom date range
	const handleChange = (e) => {
		e.preventDefault()
		const { name, value } = e.target
		console.log(name, value)
		setCustomDate({
			...customDate,
			[name]: value,
		})
	}
	console.log(customDate)

	const handleSubmit = (e) => {
		e.preventDefault()
		let array = []
		console.log('Dates in the range are :')
		arr.forEach((item) => {
			if (
				moment(item.date).format('YYYY-MM-DD') <= customDate.to &&
				moment(item.date).format('YYYY-MM-DD') >= customDate.from
			) {
				array.push(item)
			}
			setResults([...array])
		})
	}

	return (
		<div className='flex flex-col justify-center md:flex-row lg:flex-row xl:flex-row '>
			<div className='p-7 md:p-20'>
				<button className='border p-2 m-2 rounded' onClick={handleYesterday}>
					Yesterday
				</button>
				<button className='border p-2 m-2 rounded' onClick={handleLastWeek}>
					Last Week
				</button>
				<button className='border p-2 m-2 rounded' onClick={handleLastMonth}>
					Last Month
				</button>

				<form onSubmit={handleSubmit} className='flex flex-col p-4 m-4'>
					<label>From Date : </label>
					<input
						className='p-2 m-4 border-2 rounded'
						type='date'
						name='from'
						placeholder='YYYY-MM-DD'
						value={customDate.from}
						onChange={handleChange}
					/>
					<label>To Date : </label>
					<input
						className='p-2 m-4 border-2 rounded'
						type='date'
						name='to'
						placeholder='YYYY-MM-DD'
						value={customDate.to}
						onChange={handleChange}
					/>
					<button className='border w-24 p-2 mx-20 my-5 rounded'>SUBMIT</button>
				</form>
			</div>

			<table className='text-white my-20'>
				{/* <thead>
					<tr className='flex flex-row justify-center'>
						<th className='p-2 m-2'>Results :</th>
					</tr>
				</thead> */}
				<tbody>
					{results.map((item, index) => (
						<tr key={item.index} className='flex flex-row justify-center'>
							<td className='p-2'>{item.title}</td>
							<td className='p-2'>{item.date}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default Calender
