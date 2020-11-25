import Matter from "matter-js"

export default function Boundary(x, y, w, h, a, p, world) {
	const options = {
		friction: 0.3,
		restitution: 0.6,
		angle: a,
		isStatic: true
	}
	this.body = Matter.Bodies.rectangle(x, y, w, h, options)
	this.w = w
	this.h = h
	Matter.World.add(world, this.body)

	this.show = function () {
		const pos = this.body.position
		const angle = this.body.angle

		p.push()
		p.translate(pos.x, pos.y)
		p.rotate(angle)
		p.rectMode(p.CENTER)
		p.noStroke()
		p.fill(24)
		p.rect(0, 0, this.w, this.h)
		p.pop()
	}
}
