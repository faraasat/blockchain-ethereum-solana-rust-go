package main

import "fmt"

// Allow one function to handle multiple type of data and reduces code duplications
// Generics are defined using interfaces (called constraints)
// Function Parameters / return types are constrained to a specific set of interfaces

func IsEqual[T comparable](a, b T) bool {
	return a == b
}

func main() {
	fmt.Println(IsEqual(2, 2))
	fmt.Println(IsEqual("foo", "bar"))
	fmt.Println(IsEqual('a', 'b'))
	fmt.Println(IsEqual[uint8](4, 4))
}
