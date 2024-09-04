import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUsers } from './store/usersSlice'
import { RootState, AppDispatch } from './store/store'
import Table from './components/Table'
import Loading from './components/Loading'

function App() {
	const dispatch: AppDispatch = useDispatch()
	const { status, items } = useSelector((state: RootState) => state.users)

	useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchUsers())
		}
	}, [status, dispatch])

	return (
		<div className='flex items-center h-screen'>{status === 'loading' ? <Loading /> : <Table users={items} />}</div>
	)
}

export default App
