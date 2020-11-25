<template>
	<p-5></p-5>
</template>

<script>
import P5 from "./P5"
export default {
	components: {
		P5
	},
	data() {
		return {
			date: new Date()
		}
	}
}
</script>

<style scoped>
p {
	font-size: 2em;
	text-align: center;
}
</style>
