package main

import (
	"farasat.com/m/17_packages/pkg/display"
	"farasat.com/m/17_packages/pkg/msg"
)

func main() {
	msg.Hi()
	display.Display("hello from display")
	msg.Exciting("an exciting message")
}
