package main

import (
	"fmt"
	"os"
)

func main() {
	fmt.Println("os.Args", os.Args)

	i := 0
loop:
	if i < 5 {
		fmt.Println(i)
		i++
		goto loop
	}
}
