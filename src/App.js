import React, { Component } from 'react';
import './App.css';

class App extends Component {
	constructor(props){
		super(props);
		const fifteens = Array.apply(null, {length: 16}).map((item, i) => i);
		this.fifteens = this.shuffle(fifteens);
		this.state = {
			fifteens: this.isWinner(fifteens),	
		}
	}

	isWinner(arr){// если комбинация не выигрышная, перемешивает масссив до тех пор, пока не станет выигрышной
		function controlRandom (arr){//проверяет выигрышность комбинации
			let sum = 0;

			function sumCompare (arr){//перебирает каждый элемент и сравнивает его со всеми последующими, суммируем сколько раз item> itemsNext
					for(let i = 0; i <= arr.length; i++){
						let item =	arr[i];
						for(let j  = i+1; j <= arr.length; j++){
							let itemNext=arr[j];
							if(item > itemNext) { sum +=1 };
						}
					}
				return sum;
			}

			function findCellZero(arr, sumCompare) {//ищем номер строки, в которой пустая клетка
				arr.forEach((item, i) => {
						if(!item) {
							sum += Math.ceil(i / 3);
						}
					});
				return sum;
			}

			sumCompare(arr);
			findCellZero(arr, sumCompare);
//комбинация выигрышная, если sum - положительное число
			return (!(sum % 2)) ? true : false;
		}
		console.log(controlRandom(arr));
		
		while( !(controlRandom(arr)) ) {//перемешиваем, пока не станет true
			this.shuffle(arr);
			console.log(controlRandom(arr));
		} console.log(controlRandom(arr));
		return arr;
		
	}
	
	shuffle(arr){
		for(let i = arr.length - 1; i > 0; i--){
			const j = Math.round(Math.random() * i);
			let temp = arr[i];
			arr[i] = arr[j];
			arr[j] = temp;
		}
		return arr;
	}

	handleClick = (e) => {
		const fifteens = this.state.fifteens;
		const current = +e.target.textContent;
		const i = fifteens.findIndex(item => item === current);
		
		this.checkNeibours(1, i, current, fifteens);
		this.checkNeibours(-1, i, current, fifteens);
		this.checkNeibours(4, i, current, fifteens);
		this.checkNeibours(-4, i, current, fifteens);
	}
	
	checkNeibours = (n, i, current, fifteens) => {
		if(fifteens[i+n] === 0){
			this.setState((prevState) => {
				const [...fifteens] = prevState.fifteens;
				let temp = fifteens[i];
				fifteens[i] = fifteens[i+n];
				fifteens[i+n] = temp;
				return {
					fifteens,
				}
			});
		}
	}
	
	render(){
		return(
		<div className='wrapper'>
			{
				this.state.fifteens.map (item => <div key={item} onClick={this.handleClick}> {item  ? item : ''} </div>)
			}
		
		</div>
		)
		
	}
}

export default App;

