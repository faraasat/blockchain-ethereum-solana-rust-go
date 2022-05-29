package main

import "fmt"

// Unbuffered channel
func main() {
	channel := make(chan int, 2) // 2 is the number of messages we can place before it starts blocking

	channel <- 1
	channel <- 2

	go func() { channel <- 3 }()

	first := <-channel
	second := <-channel
	third := <-channel
	fmt.Println(first, second, third)
}
