package main

import "fmt"

// Some Buitin constraints are:
// any -> Any Type
// comparable -> anything that can be compared for equality
// Unsigned -> All Unsigned Integers
// Signed -> All Signed Integers
// Ordered -> Sortable Types (numbers, strings)
// Integer -> All Integers
// Float -> All Floats
// Complex -> All Complex Numbers

type Integers32 interface {
	// ~ is approximization symbol
	~int32 | ~uint32
}

type MyInt int32

func SumNumbers[T Integers32](arr []T) T {
	var sum T
	for i := 0; i < len(arr); i++ {
		sum += arr[i]
	}
	return sum
}

func main() {
	nums := []int32{1, 2, 3}
	nums2 := []uint32{1, 2, 3}
	total := SumNumbers(nums)
	total2 := SumNumbers(nums2)

	// If we pass it it will not work because MyInt is not mentioned in interface and for this we use approximization ~
	nums3 := []MyInt{MyInt(1), MyInt(2), MyInt(3)}
	total3 := SumNumbers(nums3)

	fmt.Println(total, total2, total3)
}
