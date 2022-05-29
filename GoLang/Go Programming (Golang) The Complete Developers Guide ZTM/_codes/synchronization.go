package main

import (
	"fmt"
	"sync"
)

// Managing data across multiple goroutines can become problematic and hard to debug
// Multiple goroutines can change the same data leading to unpredictable results and using channles is not always ideal
// Synchronization solves this issue and enables goroutine to finish
// Prevent multiple goroutines from modifying the data simultaneously

type SyncedData struct {
	inner map[string]int
	mutex sync.Mutex
}

func (d *SyncedData) Insert(k string, v int) {
	d.mutex.Lock()
	d.inner[k] = v
	d.mutex.Unlock()
}

func (d *SyncedData) Get(k string) int {
	d.mutex.Lock()
	data := d.inner[k]
	d.mutex.Unlock()
	return data
}

func main() {
	data := SyncedData{inner: make(map[string]int)}
	data.Insert("Sample", 5)
	data.Insert("test", 2)
	fmt.Println(data.Get("Sample"))
	fmt.Println(data.Get("test"))
}
