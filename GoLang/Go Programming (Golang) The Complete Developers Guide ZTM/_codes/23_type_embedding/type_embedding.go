package main

import "fmt"

// Type embedding is a way to easily provide existing functionality to a new type and require a type to implement multiple interfaces

type Whisperer interface {
	Whisper() string
}

type Yeller interface {
	Yell() string
}

// Embede Interface
type Talker interface {
	Whisperer
	Yeller
}

func talk(t Talker) {
	fmt.Println(t.Yell())
	fmt.Println(t.Whisper())
}
