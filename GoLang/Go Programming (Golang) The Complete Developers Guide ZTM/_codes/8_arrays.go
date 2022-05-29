package main

import "fmt"

func main() {
	// Arrays are fixed size and cannot be resized
	// If we are using loops and it goes out of bounds of array then it will be run time error
	// If we are assigning out of bound index then it will be compile time error

	var myArray [3]int // unassigned

	myArray1 := [3]int{1, 2, 3} // create and assign

	myArray2 := [...]int{7, 8, 9} // ... will see how many items assigned and substitute in []

	myArray3 := [4]int{1, 2, 3} // create and assign

	fmt.Println(myArray, myArray1, myArray2, myArray3, myArray2[1])

	for i := 0; i < len(myArray1); i++ {
		fmt.Println(myArray1[i])
	}
}
