package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
	"sync"
	"unicode"
)

type Count struct {
	count int
	sync.Mutex
}

func getWords(line string) []string {
	return strings.Split(line, " ")
}

//* Count the total number of letters in any chosen input
func countLetters(word string) int {
	letters := 0
	for _, ch := range word {
		if unicode.IsLetter(ch) {
			letters += 1
		}
	}
	return letters
}

func main() {
	//* The input must be supplied from standard input
	scanner := bufio.NewScanner(os.Stdin)

	totalLetters := Count{}

	var wg sync.WaitGroup

	for {
		if scanner.Scan() {
			line := scanner.Text()
			words := getWords(line)
			for _, word := range words {
				wordCopy := word
				wg.Add(1)
				//* Input analysis must occur per-word, and each word must be analyzed
				//  within a goroutine
				go func() {
					totalLetters.Lock()
					defer totalLetters.Unlock()
					defer wg.Done()
					sum := countLetters(wordCopy)
					totalLetters.count += sum
				}()
			}
		} else {
			if scanner.Err() == nil {
				break
			}
		}
	}
	wg.Wait()

	//* When the program finishes, display the total number of letters counted
	totalLetters.Lock()
	sum := totalLetters.count
	totalLetters.Unlock()

	fmt.Println("total letters =", sum)
}
