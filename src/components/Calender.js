import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'

const Calender = () => {
	const [england, setEngland] = useState([])
	const [scotland, setScotland] = useState([])
	const [ireland, setIreland] = useState([])

	useEffect(() => {
		axios('https://www.gov.uk/bank-holidays.json')
			.then((response) => {
				setEngland(response.data['england-and-wales'].events)
				setScotland(response.data.scotland.events)
				setIreland(response.data['northern-ireland'].events)
			})
			.catch((error) => console.error(error))
	}, [])

	const arr = [...england, ...scotland, ...ireland]
	// console.log(arr)
	const date = new Date()

	//handling yesterday filter
	const handleYesterday = () => {
		const yesterday = moment(date).subtract(1, 'days').format('YYYY-MM-DD')
		// console.log(yesterday)

		arr.forEach((item) => {
			if (moment(item.date).format('YYYY-MM-DD') === yesterday)
				console.log(`Results for yesterday : ${item.date}`)
		})
	}

	//handling lastweek filter
	const handleLastWeek = () => {
		const today = moment(date).format('YYYY-MM-DD')
		// console.log(today)
		const week = moment(date).subtract(7, 'days').format('YYYY-MM-DD')
		// console.log(week)
    console.log('Last Week dates :')
		arr.forEach((item) => {
			if (
				moment(item.date).format('YYYY-MM-DD') <= today &&
				moment(item.date).format('YYYY-MM-DD') >= week
			)
				console.log(`${item.title} ${item.date}`)
		})
	}

	//handling lastmonth filter
	const handleLastMonth = () => {
		const today = moment(date).format('YYYY-MM-DD')
		// console.log(today)
		const month = moment(date).subtract(30, 'days').format('YYYY-MM-DD')
		// console.log(month)
    console.log('Last Month dates are :')
		arr.forEach((item) => {
			if (
				moment(item.date).format('YYYY-MM-DD') <= today &&
				moment(item.date).format('YYYY-MM-DD') >= month
			)
				console.log(`${item.title} ${item.date}`)
		})
	}

	return (
		<div className='flex justify-center items-center'>
			{/* <table className='text-white'>
				<tbody>
					{arr.map((item, index) => (
						<tr key={item.index} className='flex flex-row '>
							<td className='p-2'>{item.title}</td>
							<td className='p-2'>{item.date}</td>
						</tr>
					))}
				</tbody>
			</table> */}
			<button className='border p-2 m-2' onClick={handleYesterday}>
				Yesterday
			</button>
			<button className='border p-2 m-2' onClick={handleLastWeek}>
				Last Week
			</button>
			<button className='border p-2 m-2' onClick={handleLastMonth}>
				Last Month
			</button>
		</div>
	)
}

export default Calender
