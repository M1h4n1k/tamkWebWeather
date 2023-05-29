<template>
	<div class="text-lg w-full h-full flex flex-col items-center justify-center">
		<div class="w-full flex items-center justify-center space-x-10">
			<div class="h-auto w-1/4 my-7 space-y-2">
				<p class="text-2xl">Time spent on project:</p>
				<Pie
					id="timeChart"
					:data="chartData"
				>
				</Pie>
			</div>
			<div class="text-left h-full">
				Used resources:
				<ul class="list-disc list-inside text-gray-400">
					<li class="space-x-2">
						<a class="underline text-cyan-400 hover:text-cyan-500"  href="https://tailwindcss.com/">Tailwind CSS</a>
						<a class="underline text-blue-600 hover:text-blue-800" href="https://en.wikipedia.org/wiki/MIT_License" >MIT License</a>
						<p class="text-black">Utility-first CSS framework for rapidly building custom designs</p>
					</li>
					<li class="space-x-2">
						<a class="underline text-emerald-500 hover:text-emerald-600" href="https://vuejs.org">Vue.js</a>
						<a class="underline text-blue-600 hover:text-blue-800" href="https://en.wikipedia.org/wiki/MIT_License" >MIT License</a>
						<p class="text-black">Progressive framework for building user interfaces</p>
					</li>
					<li class="space-x-2">
						<a class="text-red-400 underline hover:text-red-500" href="https://www.chartjs.org/">Chart.js</a>
						<a class="underline text-blue-600 hover:text-blue-800" href="https://en.wikipedia.org/wiki/MIT_License" >MIT License</a>
						<p class="text-black">Simple yet flexible JavaScript charting for designers & developers</p>
					</li>
					<li class="space-x-2">
						<a class="underline text-[#4d4d4d] hover:text-[#1f1f1f]" href="https://mathjs.org/"><span class="text-[#DC3912] hover:text-[#B91C1C]">math</span>js</a>
						<a class="underline text-blue-600 hover:text-blue-800" href="https://www.apache.org/licenses/LICENSE-2.0" >Apache 2.0</a>
						<p class="text-black">An extensive math library for JavaScript and Node.js </p>
					</li>
				</ul>
			</div>
		</div>
		<p>
			Made by Mikhail Karpov
		</p>
		<p>mail: mikhail.karpov@tuni.fi</p>
	</div>
</template>

<script>
import { nextTick } from "vue";
import { Pie } from 'vue-chartjs'

export default {
	name: "Info",
	components: {
		Pie
	},
	async created() {
		await nextTick();
	},

	computed: {
		chartData(){
			return {
				labels: ['Design', 'Development', 'Testing'],
				datasets: [{
					label: "Percentage",
					data: [45, 45, 10],
					borderWidth: 1,

					borderColor: '#6b7280',
					backgroundColor: '#f3f4f6',
				}]
			}
		}
	}
}
</script>

<style scoped>

</style>