<template>
<div class="w-full grid grid-cols-2 gap-5">
	<Table :data="data" :show-type="false"></Table>

	<div class="w-full space-y-2">
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

		<Bar v-if="data.length" :data="chartData"></Bar>
	</div>
</div>
</template>

<script>
import { Bar } from "vue-chartjs";
import Table from "@/components/Table.vue";

export default {
	name: "Value",
	data() {
		return {
			data: [],
			time: '',
			type: this.$route['meta']['type'],
		}
	},
	components: {
		Bar, Table
	},
	watch: {
		time: {
			async handler(new_value, old_value) {
				let baseRoute = `http://webapi19sa-1.course.tamk.cloud/v1/weather/${this.$route['meta'].type}/${this.time}`;
				let ddata = await fetch(baseRoute).then(response => response.json())
				ddata = this.formatData(ddata);
				ddata.sort((a, b) => new Date(b.date_time) - new Date(a.date_time));
				ddata = ddata.slice(0, this.time === '' ? 25 : 1000);
				ddata.sort((a, b) => new Date(a.date_time) - new Date(b.date_time));
				if (this.time !== '')
					ddata.push({
						type: 'predicted',
						value: this.predictNextValue(ddata.map(w => w['value'])),
					})
				this.data = ddata
			},
			immediate: true
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
			let colors = new Array(this.data.length).fill('#f3f4f6')
			if (this.time !== '') {
				colors[this.data.length - 1] = '#fff'
			}
			return {
				labels: this.labels,
				datasets: [
					{
						borderWidth: 1,
						borderColor: '#6b7280',
						backgroundColor: colors,
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