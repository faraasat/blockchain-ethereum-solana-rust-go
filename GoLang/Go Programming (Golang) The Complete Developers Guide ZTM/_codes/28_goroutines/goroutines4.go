package main

import (
	"bufio"
	"fmt"
	"io"
	"os"
	"strconv"
	"time"
)

//* Sum the numbers in each file noted in the main() function
func sumFile(rd bufio.Reader) int {
	sum := 0
	for {
		line, err := rd.ReadString('\n')
		if err == io.EOF {
			return sum
		}
		if err != nil {
			//* Report any errors to the terminal
			fmt.Println("Error:", err)
		}
		// ReadString returns the delimiter as well (newline).
		// We need to get the string without the newline,
		// so we just slice the string up until the last byte.
		num, err := strconv.Atoi(line[:len(line)-1])
		if err != nil {
			//* Report any errors to the terminal
			fmt.Println("Error:", err)
		}
		sum += num
	}
}

func main() {
	files := []string{"num1.txt", "num2.txt", "num3.txt", "num4.txt", "num5.txt"}
	sum := 0

	for i := 0; i < len(files); i++ {
		file, err := os.Open(files[i])
		if err != nil {
			//* Report any errors to the terminal
			fmt.Println("Error:", err)
			return
		}

		rd := bufio.NewReader(file)

		calculate := func() {
			fileSum := sumFile(*rd)
			//* Add each sum together to get a grand total for all files
			sum += fileSum
		}
		//* Launch a goroutine for each file
		go calculate()
	}

	// Need to wait for goroutines to finish. Increase if needed.
	time.Sleep(100 * time.Millisecond)

	//  - Print the grand total to the terminal
	fmt.Println(sum)
}
