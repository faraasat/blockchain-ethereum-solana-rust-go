package main

import "fmt"

// Function literal provides a way to define a function within a function
// It is possible to assign function literals to variable
// They can be passed to a function as parameters
// Also known as closures or anonymous functions

func helloWorld() {
	fmt.Println("Hello, ")
	world := func() {
		fmt.Println("World! ")
	}
	world()
	world()
	world()
}
