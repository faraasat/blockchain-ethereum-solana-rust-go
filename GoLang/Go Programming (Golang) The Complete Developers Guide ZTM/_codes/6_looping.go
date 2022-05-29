package main

func main() {
	// There is only one keyeord for looping in go which is for

	// Basic for
	for i := 0; i < 10; i++ {
		print(i, " ")
	}

	// While for
	println("")
	i := 5
	for i < 10 {
		if i%2 == 0 {
			i++
			continue
		}
		print(i, " ")
		i++
	}

	// infinite loop
	for {
		if i == 9 {
			break
		}
	}

}
