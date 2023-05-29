<template>
	<table class="w-full table-fixed h-fit border">
		<thead class="bg-gray-100 h-fit">
		<tr class="text-gray-700 uppercase text-sm leading-normal text-left h-fit">
			<th class="py-2 px-4 font-semibold">#</th>
			<th class="py-2 px-4 font-semibold">date</th>
			<th class="py-2 px-4 font-semibold">time</th>
			<th v-if="showType" class="py-2 px-4 font-semibold">type</th>
			<th class="py-2 px-4 font-semibold">value</th>
		</tr>
		</thead>
		<tbody class="text-gray-600 text-sm font-light">
		<tr v-for="(w, i) of data" :key="i"
			class="border-b border-gray-200 hover:bg-gray-100">
			<td class="py-2 px-4 whitespace-no-wrap">{{ i + 1 }}</td>
			<td class="py-2 px-4 whitespace-no-wrap">{{ w['date'] }}</td>
			<td class="py-2 px-4 whitespace-no-wrap">{{ w['time'] }}</td>
			<td v-if="showType" class="py-2 px-4 whitespace-no-wrap">{{ w['type'] }}</td>
			<td class="py-2 px-4 whitespace-no-wrap">{{ w['value'] ?? 'NULL' }}</td>
		</tr>
		</tbody>
	</table>
</template>

<script>
export default {
	name: "Table",
	props: {
		data: {
			type: Array,
		},
		showType: {
			type: Boolean,
			default: true
		},
	},
}
</script>
