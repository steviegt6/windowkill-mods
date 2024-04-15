extends "res://src/enemy/enemy.gd"

var greatestHealthAndBuff = 0

func _process(delta):
	super._process(delta)
	
	greatestHealthAndBuff = max(greatestHealthAndBuff, health + buff, 1)
	var colorScaledByMaxHealth = (health + buff) / greatestHealthAndBuff
	
	# parent.modulate = Color.from_hsv(parent.modulate.h, 0, parent.modulate.v)
	parent.modulate.a = colorScaledByMaxHealth
	pass
