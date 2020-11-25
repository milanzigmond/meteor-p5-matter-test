<template>
	<main></main>
</template>

<script>
import { onMounted } from "@vue/composition-api"
import P5 from "p5"
import Matter from "matter-js"
import Box from "./box"
import Die from "./die"
import Boundary from "./boundary"
export default {
	setup() {
		const Engine = Matter.Engine
		const World = Matter.World
		const Bodies = Matter.Bodies
		const Body = Matter.Body
		const Mouse = Matter.Mouse
		const MouseConstraint = Matter.MouseConstraint

		let engine
		let world
		let dice = []
		let boxes = []
		let boundaries = []
		let ground
		let dieImage
		let mConstraint
		let pMouseX
		let pMouseY

		const s = (p) => {
			let x = 100
			let y = 100

			p.preload = function () {
				// dieImage = p.loadImage("favicon.png")
				dieImage = p.loadImage("die5white.png")
			}

			p.setup = function () {
				const canvas = p.createCanvas(800, 500)
				engine = Engine.create()
				world = engine.world
				// Engine.run(engine)
				boundaries.push(
					new Boundary(
						p.width / 2,
						p.height,
						p.width,
						50,
						0,
						p,
						world
					)
				)
				boundaries.push(
					new Boundary(p.width / 2, 0, p.width, 50, 0, p, world)
				)
				boundaries.push(
					new Boundary(0, p.height / 2, 50, p.height, 0, p, world)
				)
				boundaries.push(
					new Boundary(
						p.width,
						p.height / 2,
						50,
						p.height,
						0,
						p,
						world
					)
				)

				let canvasMouse = Mouse.create(canvas.elt)
				canvasMouse.pixelRatio = p.pixelDensity()
				let options = { mouse: canvasMouse }
				mConstraint = MouseConstraint.create(engine, options)
				World.add(world, mConstraint)
			}

			p.mouseDragged = () => {
				if (mConstraint.body) return
				// boxes.push(new Box(p.mouseX, p.mouseY + 40, 20, 20, p, world))
				if (p.mouseX % 10 === 0) {
					dice.push(
						new Die(
							p.mouseX,
							p.mouseY + 60,
							30,
							30,
							dieImage,
							p,
							world
						)
					)
				}

				pMouseX = p.mouseX
				pMouseY = p.mouseY
			}

			p.draw = function () {
				Engine.update(engine)
				p.clear()
				// p.background(155, 111, 23)

				// p.image(dieImage, 100, 100)

				for (let i = 0; i < dice.length; i++) {
					dice[i].show()
				}

				if (dice.length > 50) {
					dice[0].removeBody()
					dice.splice(0, 1)
				}

				for (let i = 0; i < boundaries.length; i++) {
					boundaries[i].show()
				}

				if (mConstraint.body) {
					let pos = mConstraint.body.position
					let angle = mConstraint.body.angle
					p.push()
					p.translate(pos.x, pos.y)
					p.rotate(angle)
					p.rectMode(p.CENTER)
					p.tint(255)
					p.image(dieImage, -30 / 2, -30 / 2, 30, 30)
					p.pop()
				}
			}
		}

		onMounted(() => {
			const instance = new P5(s)
		})
		return {}
	}
}
</script>
