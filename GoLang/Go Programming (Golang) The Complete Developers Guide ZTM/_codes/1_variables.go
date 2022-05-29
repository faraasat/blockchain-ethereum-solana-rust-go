package main

import "fmt"

func main() {
	// Single Creation
	var example1 = 3

	var example2 int = 3

	var example3 int
	example3 = 4

	// Compound Creation
	var a, b, c = 1, 2, "sample"

	// Block Creation
	var (
		a1 int = 1
		b1 int = 2
		c1     = "sample"
	)

	// Create and Assign
	my_example := 3
	e, f := 1, "sample"

	// Default Values
	// String default: ""
	// Number default: 0
	// Other default: nil

	// Comma Ok Idiom
	// a := 1
	// var a = 5 // will result in error because 1 declaration per scope is allowed

	a2, b2 := 1, 2
	c2, b2 := 3, 4 // Ok

	// This feature of comma ok makes it easier to use same variable for multiple errors.
	x, err := 1, 2 //...
	y, err := 1, 3 //...
	z, err := 1, 4 //...

	// Constants
	const MaxSpeed = 30
	const MinPurchasePrice = 7.50
	const AppAuthor = "Bob"

	println(example1, example2, example3, my_example, a, b, c, a1, b1, c1, e, f, a2, b2, c2, x, y, z, err)

	// Exercise
	var myName string = "Jayson"
	fmt.Println("My Name is: ", myName)

	word1, word2, _ := "hello", "world", "!" // _ is to ignore or throw away the value
	fmt.Println(word1, word2)
}
