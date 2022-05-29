package main

import "fmt"

func main() {
	type Sample struct {
		field string
		a, b  int
	}

	data := Sample{"word", 1, 2}
	data1 := Sample{
		field: "word",
		a:     1,
		b:     2,
	}
	data2 := Sample{}     // default values will populate
	data3 := Sample{a: 5} // default values will populate

	var abc Sample
	abc.field = "hello"

	// Anonymous Structures
	var sample struct { // this will have default values
		field string
		a, b  int
	}
	sample.field = "hello"
	sample.a = 9

	// We have to assign the value
	sample2 := struct {
		field string
		a, b  int
	}{
		"hello",
		1, 2,
	}

	fmt.Println(data, data1, data2, data3, data.field, sample, sample2, abc)
}
