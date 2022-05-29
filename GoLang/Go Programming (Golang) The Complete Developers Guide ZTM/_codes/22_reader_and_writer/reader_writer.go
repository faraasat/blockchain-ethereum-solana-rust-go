package main

import (
	"fmt"
	"io"
	"strings"
)

// Reader & writer are interfaces that allow reading from and writing to I/O sources (Network sockets, files, arbitrary arrays)
// Reader is a low-level implementation so we usually want to work with bufio package instead of reader directly

// type Reader interface {
// 	// Each call to Read() will fill the provided p buffer
// 	// the number of bytes read will be returned as n
// 	// when all bytes are read, err will be io.EOF
// 	Read(p []byte) (n int, err error)
// }

// type Writer interface {
// 	Write(p []byte) (n int, err error)
// }

func main() {
	reader := strings.NewReader("SAMPLE")

	var newString strings.Builder
	buffer := make([]byte, 4)
	for {
		numBytes, err := reader.Read(buffer)
		chunk := buffer[:numBytes]
		newString.Write(chunk)
		fmt.Printf("Read %v bytes: %c\n", numBytes, chunk)
		if err != io.EOF {
			break
		}
	}
	fmt.Printf("%v\n", newString.String())
}
