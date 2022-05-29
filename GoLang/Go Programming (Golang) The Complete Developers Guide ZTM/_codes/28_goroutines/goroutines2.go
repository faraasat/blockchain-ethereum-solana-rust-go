package main

import (
	"fmt"
	"time"
)

// goroutine with closure

func main() {
	counter := 0

	wait := func(ms time.Duration) {
		time.Sleep(ms * time.Millisecond)
		counter += 1
	}

	fmt.Println("Launching goroutines")
	go wait(100)
	go wait(900)
	go wait(1000)

	fmt.Println("Launched     counter = ", counter)
	time.Sleep(1100 * time.Millisecond)
	fmt.Println("waited 1100ms. counter = ", counter)
}
