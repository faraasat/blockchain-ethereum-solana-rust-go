package main

import "fmt"

func main() {
	result := sum(2, 2)
	a, b, _ := multiReturn()

	greet()
	println(sum(double(6), 1)) // function nesting
	println(result, a, b)
}

// if both the parameters are same use , and write type at the end
func sum(lhs, rhs int) int {
	return lhs + rhs
}

// Multiple return values
func multiReturn() (int, int, int) {
	return 1, 2, 3
}

func double(x int) int {
	return x + x
}

func greet() {
	fmt.Println("Hello from greet function!")
}
