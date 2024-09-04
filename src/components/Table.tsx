import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from '../store/usersSlice'
import { RootState } from '../store/store'

interface User {
	id: number
	name: string
	username: string
	email: string
	number: string
}

interface TableProps {
	users: User[]
}

export default function Table({ users }: TableProps) {
	const dispatch = useDispatch()
	const filter = useSelector((state: RootState) => state.users.filter)

	const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setFilter(e.target.value))
	}

	const filteredUsers = users.filter(user =>
		[user.name, user.username, user.email, user.number].some(field =>
			field.toLowerCase().includes(filter.toLowerCase())
		)
	)

	return (
		<div className='w-full px-4 sm:px-6 lg:px-16'>
			<div className='sm:flex sm:items-center'>
				<div className='sm:flex-auto'>
					<h1 className='text-base font-semibold leading-6 text-gray-900'>Users</h1>
					<p className='mt-2 text-sm text-gray-700'>
						A list of all the users including their name, username, email and phone.
					</p>
				</div>
				<input
					className='border border-gray-500 rounded-md focus:outline-gray-500 px-2 py-1'
					type='text'
					placeholder='Search user'
					name='search'
					value={filter}
					onChange={handleFilterChange}
				/>
			</div>
			<div className='-mx-4 mt-8 sm:-mx-0'>
				<table className='min-w-full divide-y divide-gray-300'>
					<thead>
						<tr>
							<th scope='col' className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0'>
								Name
							</th>
							<th
								scope='col'
								className='hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell'>
								Username
							</th>
							<th
								scope='col'
								className='hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell'>
								Email
							</th>
							<th scope='col' className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
								Phone
							</th>
						</tr>
					</thead>
					<tbody className='divide-y divide-gray-200 bg-white'>
						{filteredUsers.map(user => (
							<tr key={user.email}>
								<td className='w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0'>
									{user.name}
									<dl className='font-normal lg:hidden'>
										<dd className='mt-1 truncate text-gray-700'>{user.username}</dd>
										<dt className='sr-only sm:hidden'>Email</dt>
										<dd className='mt-1 truncate text-gray-500 sm:hidden'>{user.email}</dd>
									</dl>
								</td>
								<td className='hidden px-3 py-4 text-sm text-gray-500 lg:table-cell'>{user.username}</td>
								<td className='hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'>{user.email}</td>
								<td className='px-3 py-4 text-sm text-gray-500'>{user.number}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}
