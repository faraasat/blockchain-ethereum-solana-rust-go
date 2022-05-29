package main

import (
	"bufio"
	"fmt"
	"io"
	"strings"
)

// bufio provides Reader and Writer Buffering
// No Need to manually manage buffers or construct data

func main() {
	source := strings.NewReader("SAMPLE")
	buffered := bufio.NewReader(source)

	// Can also use buffered.ReadBytes() here
	newString, err := buffered.ReadString('\n')
	if err == io.EOF {
		fmt.Println(newString)
	} else {
		fmt.Println("Something went wrong")
	}
}
