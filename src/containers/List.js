import React, { Fragment } from 'react';
import Card from '../components/Card/Card'
const API = 'http://www.omdbapi.com/?i=tt3896198&apikey=8d9a4414'

class List extends React.Component {
	constructor() {
		super()
		this.state = {
			data: [],
			searchT: '',
			error: ''
		}
	}
		
	async componentDidMount() {
		const url = await fetch(`${API}&s=Batman`)
		const restJSON = await url.json()
		this.setState({data: restJSON.Search})
	}

	async handleSubmit(e) {
		e.preventDefault()

		const url2 = await fetch(`${API}&s=${this.state.searchT}`)
		const data = await url2.json()

		if(!data.Search) {
			return this.setState({
				error: 'Not found'
			})
		}

		this.setState({ data: data.Search, error: '', searchT: '' })
	}

	render() {
		const error = this.state.error
		const etiquet = <div className="col-md-4 offset-md-4 p-4"><h1 style={{'marginLeft': '60px'}}>{error}</h1></div>
		return (
			<>
				<div className="row">
					<div className="col-md-4 offset-md-4 p-4">
						<form onSubmit={e => this.handleSubmit(e)}>
							<input 
								type="text" 
								className="form-control"
								placeholder="Search"
								onChange={e => this.setState({searchT: e.target.value})}
								value={this.state.searchT}
								autoFocus
							/>
						</form>
					</div>
				</div>
				<div className="row">
					{
						this.state.error ? etiquet :
						this.state.data.map((movies, i) => {
							return <Card movies={movies} key={i}/>
						})
					}
				</div>
			</>
		)
	}
}

export default List;