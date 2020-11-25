import Matter from "matter-js"

export default function Die(x, y, w, h, image, p, world) {
	const options = {
		friction: 0.3,
		restitution: 0.6
	}
	this.body = Matter.Bodies.rectangle(x, y, w, h, options)
	Matter.Body.setVelocity(this.body, {
		x: p.random(-5, 5),
		y: p.random(1, 3)
	})
	Matter.Body.setAngularVelocity(this.body, (p.PI / 20) * p.random(-0.5, 0.5))
	this.w = w
	this.h = h
	Matter.World.add(world, this.body)

	this.removeBody = function () {
		Matter.World.remove(world, this.body)
	}

	this.show = function () {
		const pos = this.body.position
		const angle = this.body.angle

		p.push()
		p.translate(pos.x, pos.y)
		p.rotate(angle)
		p.rectMode(p.CENTER)
		// p.rect(0, 0, this.w, this.h)
		p.tint(153, 33, 36)
		p.image(image, -this.w / 2, -this.h / 2, this.w, this.h)
		p.pop()
	}
}
