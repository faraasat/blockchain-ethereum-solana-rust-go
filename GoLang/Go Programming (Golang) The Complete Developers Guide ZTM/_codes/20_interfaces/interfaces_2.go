package main

import "fmt"

type Resetter interface {
	Reset()
}

type Coordinate struct {
	x, y int
}

type Player struct {
	health   int
	position Coordinate
}

func (p *Player) Reset() {
	p.health = 100
	p.position = Coordinate{0, 0}
}

func Reset(r Resetter) {
	r.Reset()
}

func ResetWithPenalty(r Resetter) {
	if Player, ok := r.(*Player); ok { // r.(Player) is checking that is r a type of player or npt
		Player.health = 50
	} else {
		r.Reset()
	}
}

func main() {
	player := Player{50, Coordinate{5, 5}}
	fmt.Println(player)
	Reset(&player)
	// player.Reset()
	fmt.Println(player)
}
