package main

import "fmt"

func main() {
	// Maps are a commonly used data structure that stores data in key value pairs
	// extremely high performance when key is known
	// Data is stored in random order

	myMap := make(map[string]int)

	myMap2 := map[string]int{
		"item 1": 1,
		"item 2": 2,
		"item 3": 3,
	}

	myMap2["my fav"] = 5

	fav := myMap2["my fav"]
	missing := myMap2["age"]

	delete(myMap, "my fav")

	_, found := myMap2["price"]

	fmt.Println(myMap, myMap2, fav, missing, found)

	for key, value := range myMap2 {
		fmt.Println(key, value)
	}
}
