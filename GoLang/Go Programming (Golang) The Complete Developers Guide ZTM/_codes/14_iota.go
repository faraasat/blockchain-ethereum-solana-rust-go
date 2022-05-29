package main

import "fmt"

type Direction byte

func main() {
	// it is common to make groups of constants, iota keyword can be used to automatically assign values
	// short form
	const (
		Online  = iota // 0
		Offline        // 1 ans so on
		Maintenance
		Retired
	)

	// Long form
	// const (
	// 	Online      = iota // 0
	// 	Offline     = iota // 1 ans so on
	// 	Maintenance = iota
	// 	Retired     = iota
	// )

	// Skip Iota
	const (
		s0 = iota // 0
		_         // 1
		_         //2
		s3        //3
	)

	// Start at 3
	const (
		i3 = iota + 3 // 3
		i4            //4
		i5            //5
	)

	// Iota Enum Pattern (We can use these as enum)
	const (
		North Direction = iota
		South
		East
		West
	)

	fmt.Println(Offline, Online, Maintenance, Retired, s0, s3, i3, i4, i5)

	north := North
	fmt.Println(north)
}

func (d Direction) String() string {
	return []string{"North", "South", "East", "West"}[d]
}
