<template>
<div class="w-full grid grid-cols-2 gap-5">
	<Table :data="data" :show-type="false"></Table>
	<div class="w-full space-y-2">
		<div>
			<label for="customType">Select measurement type:</label>
			<select id="customType" name="customType" class="w-full p-2 mt-1 rounded border-2 border-gray-300 bg-gray-100" v-model="type">
				<option value="">Choose type</option>
				<option v-for="mType in measurementTypes" :value="mType">{{ mType }}</option>
			</select>
		</div>

		<div>
			<label for="time">Select interval:</label>
			<select name="time" id="time" class="w-full p-2 mt-1 rounded border-2 border-gray-300 bg-gray-100" v-model="time">
				<option :value="''">now</option>
				<option :value="24">24 hours</option>
				<option :value="48">48 hours</option>
				<option :value="72">72 hours</option>
				<option :value="24 * 7">1 week</option>
			</select>
		</div>

		<Line v-if="data.length" :data="chartData"></Line>
	</div>
</div>
</template>

<script>
import {Line} from "vue-chartjs";
import Table from "@/components/Table.vue";

export default {
	name: "Custom",
	data() {
		return {
			data: [],
			time: '',
			type: '',
			measurementTypes: []
		}
	},
	components: {
		Table,
		Line
	},
	async created() {
		await fetch("http://webapi19sa-1.course.tamk.cloud/v1/weather/names")
			.then(response => response.json())
			.then(data => this.measurementTypes = data.map(d => d['name']));
	},
	methods: {
		getData: async function() {
			if (this.type === '')
				return;
			let url = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/';
			if (this.time !== '')
				url += this.type + '/' + this.time;
			let ddata = await fetch(url).then(response => response.json())
			ddata = this.formatData(ddata);
			ddata = ddata.filter(v => v.type === this.type);
			ddata.sort((a, b) => new Date(b.date_time) - new Date(a.date_time));
			ddata = ddata.slice(0, this.time === '' ? 25 : 1000);
			ddata.sort((a, b) => new Date(a.date_time) - new Date(b.date_time));
			this.data = ddata
		},
		getNowData: async function() {
			if (this.type && this.time) {
				await fetch('http://webapi19sa-1.course.tamk.cloud/v1/weather/')
					.then(response => response.json())
					.then(data => {
						this.data = data
					});
			}
		},
		getHourlyData: async function() {
			if (this.type && this.time) {
				await fetch(`http://webapi19sa-1.course.tamk.cloud/v1/weather/${this.type}/${this.time}`)
					.then(response => response.json())
					.then(data => this.data = data);
			}
		},
	},
	watch: {
		time: function() {
			this.getData();
		},
		type: function() {
			this.getData();
		}
	},
	computed: {
		labels() {
			let lbs = this.data.map(w => w['type'] === 'predicted' ? 'predicted' : w['date'].substring(5) + ' ' + w['time'].substring(0, 5))
			if (this.time !== '') {
				lbs[lbs.length - 1] = 'predicted'
			}
			return lbs
		},
		chartData() {
			let colors = new Array(this.data.length).fill('#6b7280')
			if (this.time !== '') {
				colors[this.data.length - 1] = 'blue'
			}
			return {
				labels: this.labels,
				datasets: [
					{
						borderWidth: 1,
						backgroundColor: '#f3f4f6',
						borderColor: colors,
						data: this.data.map(w => w['value']),
						label: this.data[0]['type'],
					}
				]
			}
		}
	}

}
</script>

<style scoped>

</style>