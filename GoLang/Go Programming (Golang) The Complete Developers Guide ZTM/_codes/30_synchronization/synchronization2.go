package main

import (
	"fmt"
	"sync"
)

// Wait group enable an application to wait for goroutines to finish
// Operates by incrementing a counter whenever a goroutine is added, and decrementing when its finishes
// waiting on the group will block the execution until the counter is 0

func main() {
	var wg sync.WaitGroup
	sum := 0
	for i := 0; i < 20; i++ {
		wg.Add(1)
		value := i
		go func() {
			defer wg.Done()
			sum += value
		}()
	}
	wg.Wait()
	fmt.Println("Sum = ", sum)
}
