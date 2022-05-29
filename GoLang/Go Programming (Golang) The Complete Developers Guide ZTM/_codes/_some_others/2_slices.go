package main

import "fmt"

func main() {
	var n []int
	fmt.Println(n == nil)

	a, b := []int{1, 2, 3}, []int{1, 2, 3}
	// fmt.Println(a == b) // cannot compare like that. to campare use loop

}
