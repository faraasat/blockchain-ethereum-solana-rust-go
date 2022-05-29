package main

import "fmt"

type Counter struct {
	hits int
}

func incrementCounter(counter *Counter) {
	counter.hits += 1 // we donot have to use * to destructure the struct . do it automatically
	fmt.Println("Counter", counter)
}

func replaceCounter(old *string, new string, counter *Counter) {
	*old = new
	incrementCounter(counter)
}

func main() {
	// function calls in go are pass by value and a copy of each function argument is made regrdless of the size which makes slow for large data structures and more difficult to manage program state
	// This can be changed by using pointers

	value := 10

	var valuePtr *int
	valuePtr = &value

	value1 := 11
	valuePtr1 := &value1

	increment(&value1)

	fmt.Println(valuePtr, valuePtr1, value1)

	counter := Counter{}

	hello := "hello"
	world := "world"

	replaceCounter(&hello, "Hi", &counter)
	fmt.Println(hello, world)

	phrase := []string{hello, world}
	fmt.Println(phrase)

	replaceCounter(&phrase[1], "Go!", &counter)
	fmt.Println(phrase)
}

func increment(x *int) {
	*x += 1
}
