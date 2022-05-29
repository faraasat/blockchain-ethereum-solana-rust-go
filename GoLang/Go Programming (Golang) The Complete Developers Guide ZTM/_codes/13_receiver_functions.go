package main

import "fmt"

type Coordinate struct {
	X, Y int
}

func shiftBy(x, y int, coord *Coordinate) {
	coord.X += x
	coord.Y += y
}

func (coord *Coordinate) shiftBy(x, y int) {
	coord.X += x
	coord.Y += y
}

func (c Coordinate) Dist(other Coordinate) Coordinate {
	return Coordinate{c.X - other.X, c.Y - other.Y}
}

func main() {
	// Modified function signature which allows dot notation
	// Makes writing some types of functionality more convinient
	// Allows simple mutation of exisiting structures
	// Similar to modifying a class variable in other languages

	// Pointer Reciever Function
	coord := Coordinate{5, 5}
	shiftBy(1, 1, &coord)
	coord.shiftBy(1, 1) // receiver function

	// Value Receiver Function
	first := Coordinate{2, 2}
	second := Coordinate{1, 5}
	distance := first.Dist(second)

	fmt.Println(coord, distance)
}
