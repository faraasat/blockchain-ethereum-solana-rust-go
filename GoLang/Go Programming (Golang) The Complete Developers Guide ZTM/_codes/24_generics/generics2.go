package main

import (
	"constraints"
	"fmt"
)

type MyArray[T constraints.Ordered] struct {
	inner []T
}

func (m *MyArray[T]) Max() T {
	max := m.inner[0]
	for i := 0; i < len(m.inner); i++ {
		if m.inner[i] > max {
			max = m.inner[i]
		}
	}
	return max
}

func main() {
	arr := MyArray[int]{inner: []int{6, 4, 8, 9, 4, 0}}
	fmt.Println(arr.Max())
}
