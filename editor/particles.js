var Line, Point

Line = (function() 
{
	Line.name = 'Line'
	function Line(p1, p2, color) 
	{
		this.first = p1
		this.second = p2
	}
	return Line
})
()

Point = (function() 
{
	Point.name = 'Point'

	function Point(x, y, color, velocity, radius, mass) 
	{
		if (mass == null) {mass = 1.0}
		this.x = x
		this.y = y
		this.mass = mass
		this.acceleration = {x: 0, y: -10}
		this.velocity = velocity
		this.color = color
		this.radius = radius
	}

	Point.prototype.applyForce = function(x, y) 
	{
		this.velocity.x += x
		return this.velocity.y += y
	}

	Point.prototype.tick = function() 
	{
		if (this.y + this.velocity.y * .1 < 0 && this.velocity.y <= 0.1) 
		{
			this.velocity.y = -this.velocity.y * .7
		}
		if ((this.x + this.velocity.x * .1 < 0) || (this.x + this.velocity.x * .1 > 512)) 
		{
			this.velocity.x = -this.velocity.x * .7
		}
		this.y += this.velocity.y * .1
		this.x += this.velocity.x * .1
		this.velocity.x += this.acceleration.x
		return this.velocity.y += this.acceleration.y
	}

	Point.prototype.display = function(ctx) 
	{
		ctx.save()
		ctx.beginPath()
		ctx.fillStyle = "rgba(" + this.color.red + ", " + this.color.green + ", " + this.color.blue + ", .8)"
		ctx.arc(this.x, 512 - this.y, this.radius, 0, 20, true)
		ctx.fill()
		return ctx.restore()
	}

	return Point

})
()
