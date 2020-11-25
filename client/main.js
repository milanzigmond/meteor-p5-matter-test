import Vue from "vue"
import VueCompositionAPI from "@vue/composition-api"
import App from "./App.vue"
import "./main.html"

Vue.use(VueCompositionAPI)

Meteor.startup(() => {
	new Vue({
		el: "#app",
		...App
	})
})
