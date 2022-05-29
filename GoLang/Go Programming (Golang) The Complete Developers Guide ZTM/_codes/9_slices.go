package main

import "fmt"

func main() {
	// Slices are companion type that works with array an they enable "view" into an array
	// Views are dynamic and not fixed size
	// functions can accept slice as a parameter
	// Any size array can be operated upon via slice

	// slices and array can be created at same time
	mySlice := []int{1, 2, 3}

	numbers := [...]int{1, 2, 3, 4, 5, 6, 7, 8, 9}
	slice1 := numbers[:]   // start inclusive, wnd exclusive [1, 2, 3, 4]
	slice2 := numbers[1:]  // [2, 3, 4]
	slice3 := numbers[:1]  // [2]
	slice4 := numbers[:2]  // [1, 2]
	slice5 := numbers[1:3] // [2, 3]

	// we can use slices to create dynamic arrays
	numbers1 := []int{1, 2, 3}
	numbers1 = append(numbers1, 4, 5, 6)

	// to extend a slice with another slice
	part1 := []int{1, 2, 3}
	part2 := []int{4, 5, 6}
	combined := append(part1, part2...)

	// Preallocation (Useful when number of elements is known but their values are still unknown)
	sSlice := make([]int, 10)

	// Multidimensional slices
	board := [][]string{
		[]string{"_", "_", "_"},
		{"_", "_", "_"},
		{"_", "_", "_"},
	}
	board[0][0] = "X"
	board[2][2] = "0"
	board[1][1] = "X"

	fmt.Println(mySlice, slice1, slice2, slice3, slice4, slice5, numbers1, combined, sSlice, board)
	iterate(combined)
}

func iterate(slice []int) {
	for i := 0; i < len(slice); i++ {
		fmt.Print(i, " ")
	}
}
