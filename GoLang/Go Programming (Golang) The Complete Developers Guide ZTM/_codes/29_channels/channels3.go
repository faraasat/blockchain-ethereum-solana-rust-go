package main

import (
	"fmt"
	"time"
)

func main() {
	one := make(chan int)
	two := make(chan int)

	// select keyword lets you work with multiple, potentially blocking channels
	// Send/Receive attempts are made, regardless of blocking status

	for {
		select {
		case o := <-one:
			fmt.Println("One: ", o)
		case t := <-two:
			fmt.Println("Two: ", t)
		default:
			fmt.Println("No Data to receive")
			time.Sleep(50 * time.Millisecond)
		}
	}
}
