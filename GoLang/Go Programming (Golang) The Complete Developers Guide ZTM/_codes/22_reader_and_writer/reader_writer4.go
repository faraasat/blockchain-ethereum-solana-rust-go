package main

import (
	"bytes"
	"fmt"
)

func main() {
	buffer := bytes.NewBufferString("")
	numBytes, err := buffer.WriteString("SAMPLE")
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println("Wrote %v bytes: %c\n", numBytes, buffer)
	}
}
