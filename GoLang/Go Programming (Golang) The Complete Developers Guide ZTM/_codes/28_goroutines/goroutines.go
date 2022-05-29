package main

import (
	"fmt"
	"time"
)

// Goroutines allow functions to run concurrently
// Go will automatically select parallel or asynchronous executions

func count(amount int) {
	for i := 0; i < amount; i++ {
		time.Sleep(100 * time.Microsecond)
		fmt.Println(i)
	}
}

func main() {
	go count(5)
	fmt.Println("wait for goroutine")
	time.Sleep(1000 * time.Millisecond)
	fmt.Println("end program")
}
