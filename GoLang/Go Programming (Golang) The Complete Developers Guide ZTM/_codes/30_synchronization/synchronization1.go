package main

import (
	"fmt"
	"sync"
)

type SyncedData struct {
	inner map[string]int
	mutex sync.Mutex
}

// Deferred Unlock
func (d *SyncedData) Insert(k string, v int) {
	d.mutex.Lock()
	defer d.mutex.Unlock()
	d.inner[k] = v
}

func (d *SyncedData) Get(k string) int {
	d.mutex.Lock()
	defer d.mutex.Unlock()
	return d.inner[k]
}

func main() {
	data := SyncedData{inner: make(map[string]int)}
	data.Insert("Sample", 5)
	data.Insert("test", 2)
	fmt.Println(data.Get("Sample"))
	fmt.Println(data.Get("test"))
}
