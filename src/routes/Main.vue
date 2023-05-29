<template>
	<Table :data="data"></Table>
</template>

<script>
import { nextTick } from "vue";
import Table from "@/components/Table.vue";
export default {
	name: "Main",
	components: {Table},
	data() {
		return {
			data: [],
		}
	},
	async created() {
		await nextTick();
		let baseRoute = 'http://webapi19sa-1.course.tamk.cloud/v1/weather';
		let data = await fetch(baseRoute).then(response => response.json())

		data = this.formatData(data);

		data.sort((a, b) => new Date(b.date_time) - new Date(a.date_time));
		this.data = data.slice(0, 30);
		this.data.sort((a, b) => new Date(a.date_time) - new Date(b.date_time));
	},
}
</script>

<style scoped>

</style>