---
layout: code
source: Lorem ipsum
---
## Folientyp code: C++

```cpp
#include <iostream>
#include <vector>

// Summe aller geraden Zahlen
int main() {
    std::vector<int> zahlen{1, 2, 3, 4, 5, 6};
    int summe = 0;
    for (int z : zahlen) {
        if (z % 2 == 0) summe += z;
    }
    std::cout << "Summe: " << summe << '\n';
    return 0;
}
```

Note:
Musterfolie **code** mit ` ```cpp `.
