package main

import "fmt"

// Channels offer one-way communication
// Conceptually the same as a two-ended pipe i.e. write dat in one and read data out the other end. This is also called sending and receiving
// Utilizing channels enables goroutines to communicate - can send/receive messages or computational results
// Channels end can be duplicated accross goroutines

// Channels can be buffered or unbuffered
// unbuffered channels will block when sending until a reader is available
// Buffered channels has a specified capacity
// Can send message up to the capacity even without a reader
// Messages on channel are FIFO ordering

func main() {
	channel := make(chan int)

	// send to channel
	go func() { channel <- 1 }()
	go func() { channel <- 2 }()
	go func() { channel <- 3 }()

	// receive from channel
	first := <-channel
	second := <-channel
	third := <-channel

	fmt.Println(first, second, third)
}
