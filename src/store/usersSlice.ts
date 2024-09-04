import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { UsersState, User } from '../interfaces/interfaces'

const url = 'https://my-json-server.typicode.com/MarcinFeli/database/users'

const initialState: UsersState = {
	items: [],
	status: 'idle',
	error: null,
	filter: '',
}

export const fetchUsers = createAsyncThunk<User[]>('users/fetchUsers', async () => {
	const response = await fetch(url)
	const data = await response.json()
	return data
})

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		setFilter(state, action: PayloadAction<string>) {
			state.filter = action.payload
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchUsers.pending, state => {
				state.status = 'loading'
			})
			.addCase(fetchUsers.fulfilled, (state, action:PayloadAction<User[]>) => {
				state.status = 'succeeded'
				state.items = action.payload
			})
			.addCase(fetchUsers.rejected, (state, action) => {
				state.status = 'failed'
       			state.error = action.error.message || 'Something went wrong'
			})
	},
})

export const { setFilter } = usersSlice.actions

export default usersSlice.reducer
