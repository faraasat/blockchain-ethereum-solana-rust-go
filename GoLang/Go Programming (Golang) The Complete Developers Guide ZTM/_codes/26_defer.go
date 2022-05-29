package main

import (
	"fmt"
	"os"
)

// defer is used to execute code after a function runs
// Cleanup resources, reset data

func one()   { fmt.Println("1") }
func two()   { fmt.Println("2") }
func three() { fmt.Println("3") }

func sample() {
	fmt.Println("Begin")

	defer one()
	defer two()
	defer three()

	fmt.Println("End")
}

func readFile() {
	file, err := os.Open("sample.txt")
	if err != nil {
		fmt.Println(err)
		return
	}
	defer file.Close()

	buffer := make([]byte, 0, 30)
	bytes, err := file.Read(buffer)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println("%c", bytes)
}
