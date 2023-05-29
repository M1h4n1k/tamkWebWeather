import './assets/main.css'
import { createRouter, createWebHistory } from 'vue-router'

import { createApp } from 'vue'
import App from './App.vue'
import Info from "@/routes/Info.vue";
import Main from "@/routes/Main.vue";
import Value from "@/routes/Value.vue";
import Custom from "@/routes/Custom.vue";

import * as math from 'mathjs'


import {
	Chart as ChartJS,
	Title,
	Tooltip,
	Legend,
	BarElement,
	CategoryScale,
	LinearScale,
	ArcElement,
	PointElement,
	LineElement
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement, PointElement, LineElement)



const routes = [
	{
		path: '/',
		name: 'Weather info',
		component: Main,
	},
	{
		path: '/info',
		name: 'Info about project',
		component: Info,
	},
	{
		path: '/temperature',
		name: 'Temperature',
		component: Value,
		meta: {
			type: 'temperature',
		}
	},
	{
		path: '/wind_speed',
		name: 'Wind speed',
		component: Value,
		meta: {
			type: 'wind_speed',
		}
	},
	{
		path: '/custom',
		name: 'Custom',
		component: Custom,
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})


const myMixin = {
	data() {
		return {
			time: '',
		}
	},
	methods: {
		predictNextValue(data) {
			// https://en.wikipedia.org/wiki/Polynomial_regression
			let lastVals = data.slice(-6);
			let xMatrix = [];
			let yMatrix = [];
			for (let i = 0; i < lastVals.length; i++) {
				xMatrix.push([])
				for (let p = 0; p < 3; p++)
					xMatrix[i].push(i ** p);
				yMatrix.push([lastVals[i]]);
			}
			let xT = math.transpose(xMatrix)
			let xTx = math.multiply(xT, xMatrix)
			let xTxInv = math.inv(xTx)
			let xTy = math.multiply(xT, yMatrix);
			let coef = math.multiply(xTxInv, xTy)
			let result = 0
			for (const [key, value] of Object.entries(coef)){
				result += value * lastVals.length ** key;
			}
			return result;
		},
		fillMissingHours(data){
			const endDate = new Date();
			endDate.setTime(endDate.getTime() - endDate.getTime() % (60 * 60 * 1000));
			const startDate = new Date(endDate.getTime() - (this.time - 1) * 60 * 60 * 1000);

			let currentDate = new Date(startDate);
			const filledData = [];
			while (currentDate <= endDate) {
				const currentDateTime = currentDate.toISOString();
				const matchingData = data.find(item => item.date_time === currentDateTime);
				if (matchingData) {
					filledData.push(matchingData);
				} else {
					filledData.push({date_time: currentDateTime, [this.type]: null});
				}
				currentDate.setHours(currentDate.getHours() + 1);
			}
			return filledData;
		},
		formatData(data) {
			for(let [i, v] of data.entries()){
				data[i] = {
					date: new Date(new Date(v.date_time).getTime() + 3 * 60 * 60 * 1000).toISOString().split('T')[0],
					time: new Date(new Date(v.date_time).getTime() + 3 * 60 * 60 * 1000).toISOString().split('T')[1].split('.')[0],
					type: this.$route['path'] === '/custom' && this.time === '' ? Object.keys(v['data'])[0] : this.type || Object.keys(v['data'])[0],
					value: v[this.type] === undefined ?  Object.values(v['data'])[0] : v[this.type]
				}
				if (typeof(data[i].value) !== 'number')
					data[i].value = parseFloat(data[i].value);
				data[i].value = data[i].value.toFixed(2);
			}
			return data;
		},
	}
}


createApp(App).mixin(myMixin).use(router).mount('#app')
