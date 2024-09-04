export interface User {
	id: number
	name: string
	email: string
	username: string
	number: string
}

export interface TableProps {
	users: User[]
}

export interface UsersState {
	items: User[]
	status: 'idle' | 'loading' | 'succeeded' | 'failed'
	error: string | null
	filter: string
}